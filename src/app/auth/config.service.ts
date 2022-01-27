import { Injectable, Inject } from '@angular/core';
import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(@Inject('BASE_URL') public readonly originUrl: string) {}

  // public readonly authUrl = 'https://www.monex.com.mx/api/iam';
  // public readonly apiUrl = 'https://www.monex.com.mx/api/iam/api';

  // public readonly authUrl = 'https://localhost:9444';
  public readonly authUrl = environment.WSO2.ISSUER;
  // public readonly apiUrl = 'https://localhost:8243/fx/v1.0';
  public readonly allowedAPIs = [ `${environment.WSO2.APIS.FX_URL}`];

  // Set this to true to enable the auto-login feature
  public readonly autoLogin = false;

  // Set this to true to revoke access and refresh tokens on logout
  public readonly revokeTokenOnLogout = false;

  // Auth config
  public authConfig: AuthConfig = {
    // ID de cliente del Service Provider generado por aplicación en STORE
    clientId: environment.WSO2.CONSUMER.KEY,

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    dummyClientSecret: environment.WSO2.CONSUMER.SECRET,

    // URL de proveedor de identidad IS WSO2
    // por default apunta a /oauth2/oidcdiscovery en donde se encuentra el documento
    // de descrubrimiento igualmente
    // issuer: `${environment.WSO2.AUTH_URL}/oauth2/oidcdiscovery`,
    issuer: `${environment.WSO2.ISSUER}`,

    // Parametros de configuración cuando no esta publico el documento de descubrimiento oidcdiscovery
    // loginUrl: `${environment.WSO2.AUTH_URL}/oauth2/authorize`,
    // logoutUrl:`${this.originUrl}/oidc/logout`,
    tokenEndpoint:  `${environment.WSO2.AUTH_URL}/oauth2/token`,
    // userinfoEndpoint: `${environment.WSO2.AUTH_URL}/oauth2/userinfo`,
    // oidc: true,

    // URL para redirección para inicio de flujo de Autenticación y Autorización
    redirectUri: `${this.originUrl}${environment.WSO2.LOGIN_REDIRECT}`,

    // URL intermedia para redirección
    silentRefreshRedirectUri: `${this.originUrl}/silent-refresh.html`,

    // URL de redirección después de haber realizado el logout
    postLogoutRedirectUri: `${this.originUrl}${environment.WSO2.LOGOUT_REDIRECT}`,

    // Indica si se debe omitir la validacion del issuer en el documento de descubrimiento.
    // Normalment el documento de descubrimiento comienza con la URL del issuer
    skipIssuerCheck: true,

    // Indica si cada endpoint en el documento de descubrimiento debe
    // comenzar con la URL de issuer configurada previamente
    strictDiscoveryDocumentValidation: false,

    // Especifica el tipo de respuesta esperada al recibir el token
    // en este caso 'code' indica que se llevara a cabo el flujo code, el cual es
    // mas recomendado, si este parametro se deja en '' el flujo de autenticación
    // realizado sera de tipo implicit.
    responseType: 'code',

    // NO ES RECOMENDADO establecer este valor a true, ya que de esta forma
    // se llevara a cabo el flujo code sin encriptación PKCE
    disablePKCE: false,

    // Establece el SCOPE de PERMISOS que el cliente debe solicitar
    // El scope openid es definido por OIDC
    // El scope inventarios es especifico para el api consumida de inventarios.
    scope: environment.WSO2.APIS.SCOPES,

    // silentRefreshTimeout: 5000,
    timeoutFactor: 0.65,

    sessionChecksEnabled: false,

    // Specify whether additional debug information should
    // be shown at the console.
    // Also requires enabling "Verbose" level in devtools
    showDebugInformation: false,

    // Specify whether to clear the hash fragment after logging in.
    // See https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040
    clearHashAfterLogin: true,
  };
}

