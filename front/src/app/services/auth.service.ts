import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  
  isLogged(): boolean {
    const usr = localStorage.get('user');
    return usr;
  }

  getSession() {
    return JSON.parse(localStorage.getItem('user'))
  }

  setSession(user) {
    localStorage.setItem('user', JSON.stringify(user));
    console.log("auth: setSession user")
  }

  clearSession() {
    localStorage.clear();
    console.log("clear user session")
  }
}
