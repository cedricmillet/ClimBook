import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-admin-niveaux',
  templateUrl: './modal-admin-niveaux.component.html',
  styleUrls: ['./modal-admin-niveaux.component.css']
})
export class ModalAdminNiveauxComponent implements OnInit {
  
  colors = [
    {color: "rgb(138, 43, 226)", label: "violet"},
    {color: "rgb(0, 0, 0)", label: "noir"},
    {color: "rgb(221, 0, 0)", label: "rouge"},
    {color: "rgb(30, 136, 229)", label: "bleu"},
    {color: "rgb(0, 128, 0)", label: "vert"},
    {color: "rgb(255, 255, 255)", label: "blanc"},
  ];
  
  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter();
  
  roles: any[] = [];

  isAddForm: boolean = false;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) {
    if (!this.data) {
      this.data = {}
      this.isAddForm = true;
    }
  }
  
  ngOnInit(): void {
    console.log(this.data)
  }
  
  async update() {
    const req_url: string = this.api.get_uri(`/niveaux`)
    const req_data = { niveau: this.data };
    const req_res = <any>(await this.api.http_post(req_url, req_data));
    this.onClose.emit(true);
    console.log(req_res)
  }

  async add() {
    const req_url: string = this.api.get_uri(`/niveaux`)
    const req_data = { niveau: this.data };
    const req_res = <any>(await this.api.http_put(req_url, req_data));
    this.onClose.emit(true);
    console.log(req_res)
  }
  
  
}
