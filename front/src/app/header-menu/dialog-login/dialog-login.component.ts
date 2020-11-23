import { Component, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.css']
})
export class DialogLoginComponent implements OnInit {
  public statusMessage: string = "";
  public shuffledNumbers: number[] = [];

  public MAX_CODE_LENGTH = 6;

  @Input() reg = {
    pseudo: '',
    mdp: '',
    email: '',
    isabonne: false
  }

  @Input() log = {
    user: 'admin',
    pass: '000000'
  }

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();
  
  constructor(public authService: AuthService) {
    this.shuffleKeypad()
  }

  shuffleKeypad() {
    this.shuffledNumbers = [1,2,3,4,5,6,7,8,9,0]
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
  }

  ngOnInit(): void {
  }

  sendKey(k) {
    if (this.log.pass.length >= this.MAX_CODE_LENGTH) return;
    this.log.pass += k;
  }


  canConnect() {
    if (this.log.user.length < 3) return false;
    if (this.log.pass.length < this.MAX_CODE_LENGTH) return false;
    return true;
  }

  async connect() {
    this.statusMessage = "Connexion...";
    const data = await this.authService.request_login(this.log.user, this.log.pass);
    if (data) {
      this.statusMessage = "Connexion réussie.";
      this.closeModal();
    } else {
      this.statusMessage = "Echec connexion.";
      this.log.pass = '';
      this.shuffleKeypad()
    }
  }


  closeModal() {
    this.onClose.emit(true);
  }


  /** inscription  */
  canRegister() {
    if (!this.reg.email || !this.reg.mdp || !this.reg.pseudo) return false;
    return true;
  }
  async register() {
    if (!this.canRegister()) return;
    this.statusMessage = "Creation du compte...";
    const data = await this.authService.request_register(this.reg);
    if (data) {
      this.statusMessage = "Création effectuée.";
      this.closeModal();
    } else {
      this.statusMessage = "Echec creation compte, veuillez réessayer";
    }
  }

}
