import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, combineLatest, Observable, ReplaySubject, throwError, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { LogoutService } from './logout.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  private isDoneLoadingSubject = new ReplaySubject<boolean>();
  public isDoneLoading = this.isDoneLoadingSubject.asObservable();

  private hasValidSessionSubject = new BehaviorSubject<boolean>(false);
  public hasValidSession = this.hasValidSessionSubject.asObservable();

  private appTimeout: any;
  private appRefresh: any;

  private fxUserSubscription!: Subscription;

  /**
   * Publishes `true` if and only if (a) all the asynchronous initial
   * login calls have completed or errorred, and (b) the user ended up
   * being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  public canActivateProtectedRoutes$: Observable<boolean> = combineLatest(
    [ this.isAuthenticated, this.isDoneLoading ]
  ).pipe(map(values => values.every(b => b)));

  constructor (
    private oauthService: OAuthService,
    private configService: ConfigService,
    private http: HttpClient,
    private router: Router,
    private logoutService: LogoutService
  ) {

    // Useful for debugging:
    this.oauthService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        console.warn(event);
      }
    });

    if(this.appTimeout !== undefined){
      console.log("Clear appTimeout");
      clearTimeout(this.appTimeout);
    }
    if(this.appRefresh !== undefined){
      console.log("Clear appRefresh");
      clearTimeout(this.appRefresh);
    }

    // This is tricky, as it might cause race conditions (where access_token is set in another
    // tab before everything is said and done there.
    // TODO: Improve this setup.
    window.addEventListener('storage', (event) => {
      // The `key` is `null` if the event was caused by `.clear()`
      if (event.key !== 'access_token' && event.key !== null) {
        return;
      }

      // console.warn('Noticed changes to access_token (most likely from another tab), updating isAuthenticated');
      this.isAuthenticatedSubject.next(this.oauthService.hasValidAccessToken());

      if (!this.oauthService.hasValidAccessToken()) {
        this.logout();
      }
    });

    this.oauthService.events
      .subscribe(_ => {
        this.isAuthenticatedSubject.next(this.oauthService.hasValidAccessToken());
        this.hasValidSessionSubject.next(this.oauthService.hasValidAccessToken());
      });

    this.oauthService.events
      .pipe(filter(e => ['token_received'].includes(e.type)))
      .subscribe(e => {
        try {
          this.sessionRefresh();
          this.sessionTimeout();
          // this.invalidateToken();

        } catch (error) {
          console.log("Error al configurar manejo de sesión. " + error);
        }
        this.oauthService.loadUserProfile();
      });

    this.oauthService.events
      .pipe(filter(e => ['session_terminated', 'session_error'].includes(e.type)))
      .subscribe(e => this.logout());

    this.oauthService.setupAutomaticSilentRefresh();
  }

  public runInitialLoginSequence(): Promise<void> {
    // console.log('Initial login sequence');
    if (location.hash) {
      // console.log('Encountered hash fragment, plotting as table...');
      // console.table(location.hash.substr(1).split('&').map(kvp => kvp.split('=')));
    }

    // 0. LOAD CONFIG:
    // First we have to check to see how the IdServer is
    // currently configured.
    //
    // IMPORTANT: To make the OIDC discovery work on WSO2 IS
    // you have to unsecure the oidc dicovery endpoint (a spa must never know admin credentials).
    // - Open the file <IS_HOME>/repository/conf/identity/identity.xml
    // - Find this line
    //      <Resource context="(.*)/.well-known(.*)" secured="true" http-method="all"/>
    // - Set secure attribute to false
    return this.oauthService.loadDiscoveryDocument()

      // For demo purposes, we pretend the previous call was very slow
      // .then(() => new Promise(resolve => setTimeout(() => resolve(), 4000)))

      // 1. HASH LOGIN:
      // Try to log in after redirect back
      // from IdServer from initLoginFlow:
      .then(() => this.oauthService.tryLoginCodeFlow())

      .then(() => {
        if (this.oauthService.hasValidAccessToken()) {
          this.hasValidSessionSubject.next(true);
          return Promise.resolve();
        }

        // 2. SILENT LOGIN:
        // Try to log in via silent refresh because the IdServer
        // might have a cookie to remember the user, so we can
        // prevent doing a redirect:
        return this.refresh()
          .then(() => {
            console.log('Resolve Refresh.');
            Promise.resolve()
          })
          .catch(result => {
            if (this.checkUserInteractionRequiredOnRefreshFailure(result)) {

              // 3. ASK FOR LOGIN:
              // At this point we know for sure that we have to ask the
              // user to log in, so we redirect them to the IdServer to
              // enter credentials.
              if (this.configService.autoLogin) {
                // Force user to login
                // console.log('Forcing user to log in');
                this.login();
              } else {
                console.warn('User interaction is needed to log in, we will wait for the user to manually log in.');
              }
              return Promise.resolve();
            }

            // We can't handle the truth, just pass on the problem to the
            // next handler.
            return Promise.reject(result);
          });
      })

      .then(() => {
        this.isDoneLoadingSubject.next(true);

        // Check for the strings 'undefined' and 'null' just to be sure. Our current
        // login(...) should never have this, but in case someone ever calls
        // initImplicitFlow(undefined | null) this could happen.
        if (this.oauthService.state && this.oauthService.state !== 'undefined' && this.oauthService.state !== 'null') {
          // console.log('There was state, so we are sending you to: ' + this.oauthService.state);
          this.router.navigateByUrl(decodeURIComponent(this.oauthService.state));
        }
      })
      .catch(() =>
        this.isDoneLoadingSubject.next(true)
      );
  }

  private checkUserInteractionRequiredOnRefreshFailure(result: any): boolean {
    // Only consider situations where it's reasonably sure that sending the
    // user to the IdServer will help.
    const errorCodes = [
      // OAuth2 error codes
      // See RFC https://tools.ietf.org/html/rfc6749#section-5.2
      'invalid_grant',

      // OIDC error codes
      // See https://openid.net/specs/openid-connect-core-1_0.html#AuthError
      'interaction_required',
      'login_required',
      'account_selection_required',
      'consent_required'
    ];

    // Notice that implicit and code flows return errors in different ways
    const k = this.oauthService.responseType === 'code' ? 'error' : 'reason';

    return result
        && result[k]
        && errorCodes.indexOf(result[k].error) >= 0;
  }

  public login(targetUrl?: string) {
    this.oauthService.initCodeFlow(encodeURIComponent(targetUrl || this.router.url));
  }

  private sessionRefresh(){
    if(this.appRefresh !== undefined){
      clearTimeout(this.appRefresh);
    }
    console.log("Init Forced Request.");
    this.appRefresh = setTimeout(
      () => {
        console.log("--> FR at: "+ new Date());
        this.oauthService.refreshToken();
      },
      (1800 * 1000)
    );
  }

  private sessionTimeout(){
    if(this.appTimeout === undefined){
      console.log("Init Session Timeout at: " + new Date());
      this.appTimeout = setTimeout(
        () => {
          console.log("--> Logging Out at: "+ new Date());
          this.logout();
          clearTimeout(this.appTimeout);
        },
        (36000 * 1000)
      );
    }
  }

  private invalidateToken(){
    console.log("--> Token at: "+ new Date());
    let invTokenTimer = setTimeout(
        () => {
          console.log("--> Invalidating Token at: "+ new Date());
          const token = this.oauthService.getAccessToken(); // Get token before logging out which clears the token
          // this.revokeToken(token);
          this.oauthService.logOut();
          // clearTimeout(invTokenTimer);
        },
        (30000)
      );
  }

  public logout() {
    this.oauthService.logOut();

    if (this.configService.revokeTokenOnLogout) {
      const token = this.oauthService.getAccessToken(); // Get token before logging out which clears the token
      this.revokeToken(token);
      this.hasValidSessionSubject.next(false);
    }

    this.logoutService.logout();

    this.router.navigateByUrl("/");
  }

  public refresh(): Promise<object> {
    return this.oauthService.responseType === 'code'
      ? this.oauthService.refreshToken()
      : this.oauthService.silentRefresh();
  }

  public hasValidToken() { return this.oauthService.hasValidAccessToken(); }

  // These normally won't be exposed from a service like this, but
  // for debugging it makes sense.
  // public get accessToken() { return this.oauthService.getAccessToken(); }
  // public get refreshToken() { return this.oauthService.getRefreshToken(); }
  public get identityClaims() { return this.oauthService.getIdentityClaims(); }
  // public get idToken() { return this.oauthService.getIdToken(); }
  // public get logoutUrl() { return this.oauthService.logoutUrl; }

  // Revoke access token
  // Notice that WSO2 IS 5.8.0 automatically revokes the associated refresh token
  // (check response headers of access token revocation) which looks very reasonable.
  private revokeToken(token: string) {
    // console.log('Revoking token = ' + token);
    const revocationUrl = this.oauthService.tokenEndpoint?.replace(/\/token$/, '/revoke');
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('token', token);
    urlSearchParams.append('token_type_hint', 'access_token');
    urlSearchParams.append('client_id', this.oauthService.clientId as string);
    this.http.post(revocationUrl as string, urlSearchParams.toString(), { headers })
      .subscribe({
        next: result => {
          console.log('Access token and related refresh token (if any) have been successfully revoked');
        },
        error: (error) => {
          return throwError(() => new Error(error));
        }
      });
  }

  public getUserClaim(){
    let userClaim;

    if(this.oauthService.hasValidAccessToken()){
      let claims = this.oauthService.getIdentityClaims();
      if (claims){
        let jsonClaims = JSON.parse(JSON.stringify(claims));

        if(jsonClaims && jsonClaims.sub){
          userClaim = jsonClaims.sub.toUpperCase();
        }
      }
    } else {
      console.log('No se puede obtener los claims de usuario sin una sesión valida');
    }

    return userClaim;
  }

}
