import { Component, Input, OnInit } from '@angular/core';

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
    email: ''
  }

  @Input() log = {
    user: 'admin',
    pass: '000000'
  }

  constructor() {
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

  connect() {
    this.statusMessage = "Connexion...";
  }

}
