import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../services/api.service';
import { ModalAdminResetpasswdComponent } from './modal-admin-resetpasswd/modal-admin-resetpasswd.component';
import { ModalAdminUtilisateursComponent } from './modal-admin-utilisateurs/modal-admin-utilisateurs.component';


export interface Utilisateur {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-admin-utilisateurs',
  templateUrl: './admin-utilisateurs.component.html',
  styleUrls: ['./admin-utilisateurs.component.css']
})
export class AdminUtilisateursComponent implements OnInit {
  columns_head: string[] = ['ID', 'Pseudo', 'Email', 'Reset Password', 'Actions'];
  
  users: Utilisateur[] = [];
  
  constructor(private api : ApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadList();
  }

  /** refresh */
  async loadList() {
    const url:string = this.api.get_uri('/utilisateurs')
    this.users = <any>(await this.api.http_get(url));
    console.log(this.users)
  }

  /** update */
  async updateOne(user:Utilisateur) {
    const dialogRef = this.dialog.open(ModalAdminUtilisateursComponent, {
      data: user
    });
    dialogRef.componentInstance.onClose.subscribe(d => {
      dialogRef.close();
      this.loadList();
    })
    /*
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });*/
  }

  /** delete */
  async deleteOne(id: number) {
    const url: string = this.api.get_uri(`/utilisateurs/${id}`);
    const deleted = await this.api.http_delete(url);
    console.log(deleted)
    this.loadList();
  }

  async resetPassword(user: Utilisateur) {
    const dialogRef = this.dialog.open(ModalAdminResetpasswdComponent, {
      data: user
    });
    dialogRef.componentInstance.onClose.subscribe(d => {
      dialogRef.close();
    })
  }

}
