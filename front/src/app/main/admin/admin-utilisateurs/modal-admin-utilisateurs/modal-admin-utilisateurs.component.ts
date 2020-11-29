import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-modal-admin-utilisateurs',
  templateUrl: './modal-admin-utilisateurs.component.html',
  styleUrls: ['./modal-admin-utilisateurs.component.css']
})
export class ModalAdminUtilisateursComponent implements OnInit {
  isAddForm: boolean = false;

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();
  
  roles: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) {
    if (!this.data) {
      this.data = {};
      this.isAddForm = true;
    }
  }

  ngOnInit(): void {
    this.loadRoleList();
    console.log(this.data)
  }

  async update() {
    const req_url: string = this.api.get_uri(`/utilisateurs`)
    const req_data = { user: this.data };
    const req_res = <any>(await this.api.http_post(req_url, req_data));
    this.onClose.emit(true);
    console.log(req_res)
  }

  async loadRoleList() {
    const url:string = this.api.get_uri('/roles')
    this.roles = <any>(await this.api.http_get(url));
    console.log(this.roles)
  }


  async add() {
    const req_url: string = this.api.get_uri(`/utilisateurs`)
    const req_data = { user: this.data };
    const req_res = <any>(await this.api.http_put(req_url, req_data));
    this.onClose.emit(true);
    console.log(req_res)
  }

    
}
