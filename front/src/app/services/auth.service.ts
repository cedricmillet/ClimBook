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
      const data = await this.api.http_post(url, { login: login, password: pass });
      //console.log("login request response: ", data)
      //update session
      this.setSession((<any>data)?.user, (<any>data)?.role);
      return data;
    } catch (error) {
      this.api.snackMsg("Login / Mot de passe invalide.", 3000);
      return false;
    }
  }

  async request_logout() {
    try {
      const url = this.api.get_uri('/auth/logout');
      const data = await this.api.http_post(url, {});
      console.log("logout request: ", data)
      return data;
    } catch (error) {
      this.api.snackMsg("Erreur deconnexion", 3000);
      return false;
    }
  }

  async request_register(data) {
    try {
      const url = this.api.get_uri('/auth/register');
      const res = await this.api.http_post(url, data);
      console.log("reg request: ", res)
      return res;
    } catch (error) {
      //this.api.snackMsg("Erreur : " + error.message, 3000);
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

  async clearSession() {
    await this.request_logout();
    localStorage.clear();
    console.log("clear user session !")
  }
}
