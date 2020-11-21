import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class VoieService {

  
  constructor(private http: HttpClient,
    private api: ApiService,
    
  ) { }

  async getAll() {

      const url = this.api.get_uri('/voies');
      return await this.api.http_get(url).catch(e => {
        console.log("Erreur requete : ", e)
      });

    
  }
}
