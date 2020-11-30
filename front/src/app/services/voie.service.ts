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
      const url = this.api.get_uri('/voies?niveaux=true');
      return await this.api.http_get(url).catch(e => {
        console.log("Erreur requete : ", e)
      });
    }
    
    async getById(id) {
      const url = this.api.get_uri(`/voies/${id}`);
      return await this.api.http_get(url).catch(e => {
        console.log("Erreur requete : ", e)
      });
    }
  
  async getBestGrimp(voieId: number) {
    const url = this.api.get_uri(`/voies/${voieId}/bestgrimp`);
    return await <any>this.api.http_get(url).catch(e => {
      console.log("Erreur requete : ", e)
    });
  }

  async getTempsmoyen(voieId: number) {
    const url = this.api.get_uri(`/voies/${voieId}/avg`);
    const res = await <any>this.api.http_get(url).catch(e => {
      console.log("Erreur requete : ", e)
    });
    return res.length > 0 ? res[0].avg : null;
  }

  }
  