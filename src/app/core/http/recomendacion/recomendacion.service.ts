import { Injectable } from '@angular/core';
import {ApiFunction, HttpResponseModel, RecomendacionModel} from '../../models';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {routes} from '../../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService implements ApiFunction {
  constructor(
    private apiService: ApiService
  ) { }

  create(data: RecomendacionModel): Observable<HttpResponseModel> {
    return this.apiService
      .post(routes.recomendacion, data);
  }

  getAll(): Observable<RecomendacionModel[]> {
    return this.apiService
      .get(routes.recomendacion).pipe(map(e => e.Data));
  }

  get(id: string): Observable<RecomendacionModel> {
    return this.apiService
      .get(`${routes.recomendacion}/${id}`)
      .pipe(map(e => e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.recomendacion}/${id}`);
  }

  update(id: string, data: RecomendacionModel): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.recomendacion}/${id}`, data);
  }

  getLastRecomendacionDependencia():Observable<any>{
    return this.apiService.
      get(`/last${routes.recomendacion}`).
      pipe(map (e=> e.Data));
  }
}
