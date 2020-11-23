import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


export interface IUserData {
  id: number;
  pseudo: string;
  email: string;
  isabonne: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  data : IUserData;
  role: string = "client";
  constructor(private authService : AuthService) {
    this.data = authService.getSession();
    this.role = authService.getRole();
  }

  public getSession = () => this.authService.getSession();
  public getRole = () => this.authService.getRole();

  public getPseudo = () => this.getSession().pseudo;
  public getEmail = () => this.getSession().email;


}
