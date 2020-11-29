import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ModalAdminNiveauxComponent } from './modal-admin-niveaux/modal-admin-niveaux.component';


export interface Niveau {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-admin-niveaux',
  templateUrl: './admin-niveaux.component.html',
  styleUrls: ['./admin-niveaux.component.css']
})
export class AdminNiveauxComponent implements OnInit {
  columns_head: string[] = ['ID', 'Difficulté', 'Nom', 'Couleur', 'Actions'];
  
  niveaux: Niveau[] = [];
  
  constructor(private api : ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadList();
  }

  /** refresh */
  async loadList() {
    const url:string = this.api.get_uri('/niveaux')
    this.niveaux = <any>(await this.api.http_get(url));
    console.log(this.niveaux)
  }

  /** add */
  async addOne() {
    const dialogRef = this.dialog.open(ModalAdminNiveauxComponent, {
      data: null
    });
    dialogRef.componentInstance.onClose.subscribe(d => {
      dialogRef.close();
      this.loadList();
    });
  }

  /** update */
  async updateOne(niv:Niveau) {
    const dialogRef = this.dialog.open(ModalAdminNiveauxComponent, {
      data: niv
    });
    dialogRef.componentInstance.onClose.subscribe(d => {
      dialogRef.close();
      this.loadList();
    });
  }

  /** delete */
  async deleteOne(id: number) {
    const url: string = this.api.get_uri(`/niveaux/${id}`);
    const deleted = await this.api.http_delete(url);
    console.log(deleted)
    this.loadList();
  }

}
