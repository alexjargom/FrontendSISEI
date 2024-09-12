import { HttpResponseModel } from './../models/http.response.model';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler,
   HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Logger } from '../logger.service';
import { environment } from 'src/environments/environment';

const log = new Logger('ErrorHandlerInterceptor');

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    let resp: HttpResponseModel;

    if (response instanceof HttpErrorResponse ) {
      resp = response.error as HttpResponseModel;

      switch (response.status) {
        case 401:
          break;
        case 403:
          break;
        case 500:
          resp = {
            Mensaje : 'No se pudo conectar con el servidor',
            Data: {}
          };
          break;
        default:
          resp = {
            Mensaje : 'No se pudo conectar con el servidor',
            Data: {}
          };
          break;
      }
    } else {
      resp = {
        Mensaje : 'No se pudo conectar con el servidor',
        Data: {}
      };
    }

    if (!environment.production) {
      // Do something with the error
      log.error('Request error', response);
    }
    throw response;
  }
}
