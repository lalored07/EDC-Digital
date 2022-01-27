import { Injectable } from '@angular/core';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private userDataService: UserDataService) {}

  logout(){
    window.localStorage.clear();
    this.userDataService.clear();
  }

}
