import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { ApiService } from './api.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private api: ApiService) {
      
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error)
          console.log("err2", error.error)
          console.log("msg", error.error.message)
          this.api.snackMsg("Erreur: " + error.error.message, 15000);
          return throwError(error);
        })
      )
    }

}