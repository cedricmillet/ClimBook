import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-modal-admin-resetpasswd',
  templateUrl: './modal-admin-resetpasswd.component.html',
  styleUrls: ['./modal-admin-resetpasswd.component.css']
})
export class ModalAdminResetpasswdComponent implements OnInit {
  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();

  pwdChanged: boolean = false;

  newPassword: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) { }

  ngOnInit(): void {
    this.pwdChanged = false;
  }

  async change() {
    try {
      const req_url: string = this.api.get_uri(`/utilisateurs/${this.data.id}/changepwd`)
      const req_data = { pwd: this.newPassword };
      console.log("ok !")
      const req_res = <any>(await this.api.http_post(req_url, req_data));
      if (req_res == true)
        this.pwdChanged = true;
    } catch (error) {
      console.log("erreur : ", error)
    }
    
  }


  async closeModal() {
    this.onClose.emit(true);
  }

}
