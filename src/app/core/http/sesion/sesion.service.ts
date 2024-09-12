import {Injectable} from '@angular/core';
import {ApiFunction, HttpResponseModel, SesionModel} from '../../models';
import {ApiService} from '../api.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {routes} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SesionService implements ApiFunction {

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
  ) {
  }

  create(data: SesionModel): Observable<HttpResponseModel> {
    return this.apiService.post(routes.sesion, data);
  }

  getAll(): Observable<SesionModel[]> {
    return this.apiService
      .get(routes.sesion).pipe(map(e => e.Data));
  }

  get(id: string): Observable<SesionModel> {
    return this.apiService
      .get(`${routes.sesion}/${id}`)
      .pipe(map(e => e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.sesion}/${id}`);
  }

  update(id: string, data: SesionModel): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.sesion}/${id}`, data);
  }

  getTodaySesion():Observable<SesionModel[]> {
    return this.apiService
      .get(`/today${routes.sesion}`)
      .pipe(map(e => e.Data));
  }
}
