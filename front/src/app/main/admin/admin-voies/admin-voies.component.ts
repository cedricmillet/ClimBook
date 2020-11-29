import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { ModalAdminVoiesComponent } from './modal-admin-voies/modal-admin-voies.component';




export interface Voie {
  id: string;
  id_niveau: number;
  datev: string;
  nom: string;
}

@Component({
  selector: 'app-admin-voies',
  templateUrl: './admin-voies.component.html',
  styleUrls: ['./admin-voies.component.css']
})
export class AdminVoiesComponent implements OnInit {
  columns_head: string[] = ['ID', 'Niveau', 'Nom', 'Date d\'ajout', 'Actions'];
  
  voies: Voie[] = [];
  
  constructor(private api : ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadList();
  }

  /** refresh */
  async loadList() {
    const url:string = this.api.get_uri('/voies?niveaux=1')
    this.voies = <any>(await this.api.http_get(url));
    console.log(this.voies)
  }
/*
  async loadNiveauxList() {
    const url:string = this.api.get_uri('/niveaux')
    this.niveaux = <any>(await this.api.http_get(url));
  }*/

  async addOne() {
    const dialogRef = this.dialog.open(ModalAdminVoiesComponent, {
      data: null
    });
    dialogRef.componentInstance.onClose.subscribe(d => {
      dialogRef.close();
      this.loadList();
    })
  }

  /** update */
  async updateOne(voie:Voie) {
    const dialogRef = this.dialog.open(ModalAdminVoiesComponent, {
      data: voie
    });
    dialogRef.componentInstance.onClose.subscribe(d => {
      dialogRef.close();
      this.loadList();
    })
  }

  /** delete */
  async deleteOne(id: number) {
    const url: string = this.api.get_uri(`/voies/${id}`);
    const deleted = await this.api.http_delete(url);
    console.log(deleted)
    this.loadList();
  }


}
