import { Logger } from './../logger.service';
import { HttpResponseModel } from './../models/http.response.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../authentication';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  private formatErrors(error: HttpErrorResponse): Observable<HttpResponseModel> {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.apiUrl}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object = {},  params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body), { params }
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(
      `${environment.apiUrl}${path}`
    ).pipe(catchError(this.formatErrors));
  }

  // api files
  postFile(path: string, body: object = {} ): Observable<any> {
    const params = new HttpParams();
    const options = {
      params,
      reportProgress: true,
    };
    return this.http.post(
      `${environment.apiUrl}${path}`,
      body,
      options
    ).pipe(catchError(this.formatErrors));
  }

  putFile(path: string, body: object = {} ): Observable<any> {
    const params = new HttpParams();
    const options = {
      params,
      reportProgress: true,
    };
    return this.http.put(
      `${environment.apiUrl}${path}`,
      body,
      options
    ).pipe(catchError(this.formatErrors));
  }
}
