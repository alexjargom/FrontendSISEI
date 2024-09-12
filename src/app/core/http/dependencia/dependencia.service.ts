import { ApiFunction } from './../../models/api.model';
import { map } from 'rxjs/operators';
import { DependenciaModel } from './../../models/dependencia.model';
import { routes } from './../../../../environments/environment';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../../authentication/jwt.service';
import { Router } from '@angular/router';
import { HttpResponseModel } from '../..';

@Injectable()
export class DependenciaService implements ApiFunction {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
  ) { }
  // create
  create(data: DependenciaModel): Observable<HttpResponseModel> {
    return this.apiService
      .post(routes.dependencia, data);
  }

  getAll(): Observable<DependenciaModel[]> {
    return this.apiService
      .get(routes.dependencia).pipe(map(e => e.Data));
  }

  getAllMin(): Observable<DependenciaModel[]> {
    return this.apiService
      .get(routes.dependenciaMin).pipe(map(e => e.Data));
  }

  get(id: string): Observable<DependenciaModel> {
    return this.apiService
      .get(`${routes.dependencia}/${id}`)
      .pipe(map(e => e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.dependencia}/${id}`);
  }

  update(id: string, data: DependenciaModel): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.dependencia}/${id}`, data);
  }

  getDependenciaIdPublic(id:string): Observable<DependenciaModel>{
    return this.apiService
      .get(`/public${routes.dependencia}/${id}`)
      .pipe(map (e=>e.Data));
  }
}
