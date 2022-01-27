import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Menu, User } from './auth.models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'applicaction/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,PUT,OPTIONS'

  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {


  user: User = new User('', '', '', '', '');
  menu: Menu[] = [];

  constructor(private http: HttpClient) { }

  // login(token: string, contrato: string, userName: string) {
  //   let baseUrl: string = 'http://provider-svc:8080/api/tokens/v1/users';
  //   this.user.loggedIn = true;
  //   window.localStorage.setItem('token', token);
  //   // Lineas temporales en lo qye entregan el token
  //   let hoy: any = new Date();
  //   hoy.setSeconds(3600); // AAMC modificar cuando se tenga el token
  //   window.localStorage.setItem('expira', hoy.getTime().toString());
  //   // Terminan las lineas temporales
  //   window.localStorage.setItem('agreement', contrato);
  //   window.localStorage.setItem('userName', userName);
  //   this.user.name = userName;
  //   let url = `${baseUrl}/${this.user.userKey}`;
  //   return this.http.get(url, httpOptions);
  // }

  // refreshLogginIn() {
  //   if (window.localStorage.getItem('token') != null && window.localStorage.getItem('token') !== '') {
  //     this.user.loggedIn = true;
  //   } else {
  //     this.user.loggedIn = false;
  //   }
  // }

  // getAgreement() {
  //   return window.localStorage.getItem('agreement');
  // }
  // getUserName() {
  //   // console.log
  //   this.user.name = window.localStorage.getItem('userName');

  //   return window.localStorage.getItem('userName');
  // }
  // getAccessToken() {
  //   return window.localStorage.getItem('token');
  // }

  // refreshAccessToken() {
  //   return window.localStorage.getItem('token');
  // }

  // logout() {
  //   this.user.loggedIn = false;
  //   this.user = null;
  //   window.localStorage.clear();
  //   return true;
  // }

  // getUser() {
  //   return JSON.parse(window.localStorage.getItem('user'));
  // }
  // setUser() {
  //   window.localStorage.setItem('user', JSON.stringify(this.user));
  // }
  // setMenu(menuTMP: any) {
  //   this.menu = menuTMP;
  // }
  // getMenu() {
  //   return this.menu;
  // }


}
