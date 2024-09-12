import { ApiFunction } from './../../models/api.model';
import { CargoComiteModel } from './../../models/comite.model';
import { map } from 'rxjs/operators';
import { routes } from './../../../../environments/environment';
import { ApiService } from './../api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../../authentication/jwt.service';
import {  Router } from '@angular/router';
import { HttpResponseModel } from '../..';

@Injectable({
  providedIn: 'root',
})
export class CargoComiteService implements ApiFunction {
  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router,
  ) { }
  create(data: CargoComiteModel): Observable<HttpResponseModel> {
    return this.apiService
    .post(routes.cargo ,  data );
  }

  getAll(): Observable<CargoComiteModel[]> {
    return this.apiService
    .get(routes.cargo).pipe(map(e => e.Data ));
  }

  get(id: string): Observable<CargoComiteModel> {
    return this.apiService
      .get(`${routes.cargo}/${id}`)
      .pipe(map(e => e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.cargo}/${id}`);
  }

  update(id: string, data: CargoComiteModel): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.cargo}/${id}`, data);
  }
}

