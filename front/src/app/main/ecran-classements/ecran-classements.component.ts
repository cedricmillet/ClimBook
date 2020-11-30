import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-ecran-classements',
  templateUrl: './ecran-classements.component.html',
  styleUrls: ['./ecran-classements.component.css']
})
export class EcranClassementsComponent implements OnInit {

  classement = [];

  constructor(private api : ApiService) { }

  ngOnInit(): void {
    this.refreshClassement();
  }

  async refreshClassement() {
    const url = this.api.get_uri(`/classement`);
    this.classement = <any>await this.api.http_get(url);
    console.log(this.classement)
  }

}
