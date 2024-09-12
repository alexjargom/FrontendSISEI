import { ApiFunction } from './../../models/api.model';
import { ComiteModel, ComitePublic } from './../../models/comite.model';
import { map } from 'rxjs/operators';
import { routes } from './../../../../environments/environment';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../../authentication/jwt.service';
import {  Router } from '@angular/router';
import { HttpResponseModel } from '../..';
import {Status} from '../../var/variables';

@Injectable()
export class ComiteService implements ApiFunction {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
  ) { }

  create(data: ComiteModel): Observable<HttpResponseModel> {
    return this.apiService
    .post(routes.comite ,  data );
  }

  getAll(): Observable<ComiteModel[]> {
    return this.apiService
    .get(routes.comite).pipe(map( e => e.Data ));
  }

  get(id: string): Observable<ComiteModel> {
    return this.apiService
      .get(`${routes.comite}/${id}`)
      .pipe(map(e => e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.comite}/${id}`);
  }

  update(id: string, data: ComiteModel): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.comite}/${id}`, data);
  }

  updateStatus(id: string, status: Status): Observable<HttpResponseModel> {
    const params: HttpParams = new HttpParams().set('status', status.toString() );
    return this.apiService
      .put(`${routes.comite}/${id}/status`, {} , params );
  }

  getComitesSinUsuario(): Observable<ComiteModel[]>{
    return this.apiService.
      get(`${routes.comite}s/libre`).
      pipe(map (e=>e.Data));
  }

  // files

  uploadFile(url: string, file: File): Observable<ComiteModel> {
    const formData =  new FormData();
    formData.append( 'file' , file );
    return this.apiService.putFile(`${routes.comite}/${url}`, formData).pipe(map( e => e.Data ));
  }

  updateEdicion(id:string,estado:boolean):Observable<HttpResponseModel>{
    const params:HttpParams= new HttpParams().set('status',estado.toString());
    return this.apiService
      .put(`${routes.comite}/${id}/edit`,{},params);
  }

  getComitePublic(id: string):Observable<ComitePublic>{
    return this.apiService
      .get(`/public${routes.comite}/${id}`)
      .pipe(map(e=>e.Data));
  }
}
