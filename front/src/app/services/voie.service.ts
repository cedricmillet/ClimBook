import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoieService {

  private apiBaseURI : string = `${env.API_HOST}/${env.API_PREFIX}`
  constructor(private http: HttpClient) { }

  async getAll() {
    return new Promise(async (res, rej) => {
      const a = await this.http.get(this.apiBaseURI+ `/voies/`).subscribe(data => {
        res(data);
      });
      
    })
    
  }
}
