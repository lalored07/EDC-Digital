import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FxUser, UserData, UserDataResponse } from './auth.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private fxUser : FxUser = {};

  private userDataUpdated = new Subject<boolean>();
  private fxUserUpdated = new Subject<FxUser>();

  private lookingForUserData = new BehaviorSubject<boolean>(false);

  constructor(  private http: HttpClient,
                private router: Router) {}

  getUserDataUpdatedListener() {
    return this.userDataUpdated.asObservable();
  }

  getFxUserUpdatedListener(){
    return this.fxUserUpdated.asObservable();
  }

  isLookingForUserDataListener(){
    return this.lookingForUserData.asObservable();
  }

  getFxUser(): FxUser {
    if(!this.fxUser){
      this.fxUser = {};
    }
    return this.fxUser;
  }

  clear(){
    this.fxUser = {};
    this.fxUserUpdated.next(this.fxUser);
    this.userDataUpdated.next(false);
  }

  loadFxUser( cveUsuario: string) : FxUser {

    if(cveUsuario){
      this.lookingForUserData.next(true);

      this.getUserData(cveUsuario).subscribe({
        next: (response: UserDataResponse) => {
          if(response.result && response.result.code) {

            if(response.result.code === "200"){
              console.log('UserData Ok-Response');
              if(response.data && response.data.data && response.data.data.length > 0) {
                let userData: UserData = response.data.data[0];

                if(userData.REF_NUM_CONTRATO){
                  this.router.navigateByUrl('/fxinventario');
                  this.fxUser.userKey = userData.CVE_USUARIO;
                  this.fxUser.name  = userData.TX_NOM_EMPLEADO;
                  this.fxUser.refContrato = userData.REF_NUM_CONTRATO;
                  this.fxUser.exist = 'S';
                  this.fxUser.error ='';
                  this.fxUser.withAccess = true;
                  this.userDataUpdated.next(true);
                  this.fxUserUpdated.next(this.fxUser);
                } else {
                  this.router.navigateByUrl('/sinpermisos');
                  this.fxUser.error = 'El usuario ' + userData.CVE_USUARIO + ' no cuenta con un contrato configurado para operar en FX. Favor de contactar a mesa de ayuda.';
                  this.fxUser.withAccess = false;
                  this.userDataUpdated.next(true);
                  this.fxUserUpdated.next(this.fxUser);
                }
              } else {
                this.router.navigateByUrl('/sinpermisos');
                this.fxUser.error = 'No se recibio información del usuario en la respuesta de datos. Favor de contactar a mesa de ayuda.';
                this.fxUser.withAccess = false;
                this.userDataUpdated.next(false);
                this.fxUserUpdated.next(this.fxUser);
              }
            } else {
              this.router.navigateByUrl('/sinpermisos');
              let mensaje: string = '';
              if(response.errores){
                response.errores.forEach((msg) => {
                  mensaje = mensaje + msg + ' ';
                });
              }

              mensaje += ' Favor de contactar a mesa de ayuda.';

              this.fxUser.error = mensaje;
              this.fxUser.withAccess = false;
              this.userDataUpdated.next(true);
              this.fxUserUpdated.next(this.fxUser);
            }
          } else {
            this.router.navigateByUrl('/sinpermisos');
            this.fxUser.error = 'No se obtuvo respuesta del servidor. Favor de contactar a mesa de ayuda.';
            this.fxUser.withAccess = false;
            this.userDataUpdated.next(false);
            this.fxUserUpdated.next(this.fxUser);
          }

          this.lookingForUserData.next(false);

        },
        error: (error: HttpErrorResponse) => {
          this.router.navigateByUrl('/sinpermisos');
          console.error('Falla de comunicación con el servidor: '+ error.message);
          this.fxUser.error = 'Falla de comunicación con el servidor'+ (error.statusText !== undefined  ? ': ' + error.statusText : '') +' . Favor de contactar a mesa de ayuda.';
          this.userDataUpdated.next(false);
          this.fxUserUpdated.next(this.fxUser);
          this.lookingForUserData.next(false);
        }
      });
    } else if(this.fxUser && this.fxUser.withAccess === true){
      // Sin clave de usuario pero con usuario en memoria
      this.fxUserUpdated.next(this.fxUser);
      this.lookingForUserData.next(false);

    } else {
      //No hay clave de usuario definida
      this.router.navigateByUrl('/sinpermisos');
      this.fxUser.error = 'No se cuenta con clave de usuario para consultar información. Favor de contactar a mesa de ayuda.';
      this.fxUserUpdated.next(this.fxUser);
      this.lookingForUserData.next(false);
    }

    return this.fxUser;
  }

  private getUserData(cveUsuario: string): Observable<UserDataResponse> {
    return this.http.get<UserDataResponse>(environment.WSO2.APIS.FX_URL + '/usuarios/' + cveUsuario);
  }

}
