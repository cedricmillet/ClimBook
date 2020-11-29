import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-modal-admin-voies',
  templateUrl: './modal-admin-voies.component.html',
  styleUrls: ['./modal-admin-voies.component.css']
})
export class ModalAdminVoiesComponent implements OnInit {
  isAddForm: boolean = false;

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();
  
  niveaux: any[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) {
    if (!this.data) {
      this.data = {};
      this.isAddForm = true;
    }
  }

  ngOnInit(): void {
    this.loadNiveauxList();
    console.log(this.data)
  }

  async update() {
    const req_url: string = this.api.get_uri(`/voies`)
    const req_data = { voie: this.data };
    const req_res = <any>(await this.api.http_post(req_url, req_data));
    this.onClose.emit(true);
    console.log(req_res)
  }

  async loadNiveauxList() {
    const url:string = this.api.get_uri('/niveaux')
    this.niveaux = <any>(await this.api.http_get(url));
    console.log(this.niveaux)
  }

  async add() {
    const req_url: string = this.api.get_uri(`/voies`)
    const req_data = { voie: this.data };
    const req_res = <any>(await this.api.http_put(req_url, req_data));
    this.onClose.emit(true);
    console.log(req_res)
  }

}
