import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api:ApiService) { }

  async request_login(login, pass) {
    try {
      const url = this.api.get_uri('/auth/login');
      const data = await this.api.http_post(url, { login: login, password: pass })
      //update session
      this.setSession((<any>data)?.user, (<any>data)?.role);
      return data;
    } catch (error) {
      this.api.snackMsg("Login / Mot de passe invalide.", 3000);
      return false;
    }
    
  }
  
  isLogged(): boolean {
    const usr = localStorage?.user;
    return usr ? true : false;
  }

  getSession() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getRole() {
    return localStorage.role;
  }

  setSession(userData: {}, role:string) {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('role', role);
    console.log("auth: setSession user (", userData, "), role = ", role)
  }

  clearSession() {
    localStorage.clear();
    console.log("clear user session !")
  }
}
