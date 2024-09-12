import { Injectable } from '@angular/core';
import {ApiFunction, DataChart, HttpResponseModel, QuejaModel} from '../../models';
import {ApiService} from '../api.service';
import {Observable} from 'rxjs';
import {routes} from '../../../../environments/environment';
import {map} from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuejaService  implements ApiFunction {
  constructor(
    private apiService: ApiService
  ) { }

  create(data: QuejaModel): Observable<HttpResponseModel> {
    return this.apiService
      .post(routes.queja, data);
  }

  getAll(): Observable<QuejaModel[]> {
    return this.apiService
      .get(routes.queja).pipe(map(e => e.Data));
  }

  get(id: string): Observable<QuejaModel> {
    return this.apiService
      .get(`${routes.queja}/${id}`)
      .pipe(map(e => e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.queja}/${id}`);
  }

  update(id: string, data: QuejaModel): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.queja}/${id}`, data);
  }

  createWithFile(data:QuejaModel, files: File):Observable<HttpResponseModel>{
    const formData = new FormData();
    formData.append('data',JSON.stringify(data));
    formData.append('file',files)
    return this.apiService
      .postFile(routes.queja, formData);
  }

  getDataChartQueja(tipo?: string, filtro?:string):Observable<DataChart>{
    const par = new HttpParams().set('tipo',filtro? filtro:'a')
      .set('estado', tipo? tipo : 'a');
    return this.apiService
      .get(`/chart${routes.queja}`,par)
      .pipe(map (e=>e.Data));
  }
}
