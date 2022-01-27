import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserDataService } from 'src/app/auth/user-data.service';
import { UserService } from 'src/app/auth/user.service';

@Component({
  selector: 'app-login-wso2',
  templateUrl: './login-wso2.component.html',
  styleUrls: ['./login-wso2.component.css']
})
export class LoginWso2Component implements OnInit {

  submitted: boolean = false;

  invalidLogin=true;

  private userAuthenticated = false;

  constructor(
    public userService:UserService,
    //EMN
    private router: Router,
    private authSvc: AuthService,
    private userDataService: UserDataService
    ) {
        // this.userService.user = new User('','','','','');
        // localStorage.clear();

        this.authSvc.isAuthenticated.subscribe(i => this.userAuthenticated = i);
  }

  ngOnInit(){
    // if(this.authSvc.hasValidToken()){
    //   console.log('VALID TOKEN');
    //   this.userService.user.loggedIn = true;
    //   this.applyLogin();
    // }
    if(this.userAuthenticated){
      console.log('Getting user data.....');
      this.userDataService.loadFxUser(this.authSvc.getUserClaim());
    }

  }

  // applyLogin(){

  //   console.log("Información de usuario:");
  //   console.log(this.userService.user);

  //   if (this.authSvc.identityClaims){
  //     let sub = JSON.parse(JSON.stringify(this.authSvc.identityClaims)).sub;
  //     if(sub){
  //       this.userService.user.userKey = 'home';
  //       this.userService.user.email= sub.toUpperCase();
  //       this.agreementService.getAgreement(this.userService.user.email, "");
  //     } else {
  //       console.log("There´s no oauth2 claim expected.");
  //       this.authSvc.logout();
  //     }
  //   } else {
  //     console.log("There´s any oauth2 claims");
  //     this.authSvc.logout();
  //   }
  // }


}
