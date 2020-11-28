import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }
  
  private apiBaseURI : string = `${env.API_HOST}/${env.API_PREFIX}`
  
  get_uri(endpoint:string) {
    if(!endpoint.startsWith('/')) endpoint = '/'+endpoint
    return this.apiBaseURI+ endpoint
  }

  snackMsg(msg, dur=3000) {
    this._snackBar.open(msg, "Fermer", {
      duration: dur,
    });
  }
  
  http_get(url) {
    return new Promise(async (res, rej) => {
      const r = await this.http.get(url).subscribe(
        data => {
          res(data)
        },
        error => {
          console.log("api.service : erreur requete : ", error)
          //this.snackMsg("Erreur - HTTP GET - réponse API : " + error.status, 6000)
          rej(error)
        }
        );
      })
  }
  
  http_post(url, data) {
    return new Promise(async (res, rej) => {
      const r = await this.http.post(url, data).subscribe(
        (data: any) => {
          if (!data) rej(data);
          else res(data);
        },
        error => {
          console.log("api.service : erreur requete : ", error)
          //this.snackMsg("Erreur - HTTP POST - réponse API : " + error.status, 6000)
          rej(error)
        }
        );
      })
  }

  http_delete(url, data={}) {
    return new Promise(async (res, rej) => {
      const r = await this.http.delete(url, data).subscribe(
        (data: any) => {
          if (!data) rej(data);
          else res(data);
        },
        error => {
          console.log("api.service : erreur requete : ", error)
          //this.snackMsg("Erreur - HTTP POST - réponse API : " + error.status, 6000)
          rej(error)
        }
        );
      })
  }
  

  }
  