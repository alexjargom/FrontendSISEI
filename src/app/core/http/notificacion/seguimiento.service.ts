import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from 'src/environments/environment';
import { ApiFunction, HttpResponseModel, NotificacionModel } from '../../models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService implements ApiFunction {

  constructor(
    private apiService: ApiService
  ) { }
  
  create(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getAll(dep?:string): Observable<NotificacionModel[]> {
    var dependencia= dep? dep:'';
    const pa = new HttpParams().set('id',dependencia);
    return this.apiService.get(routes.Notification,pa)
    .pipe(map (e => e.Data));
  }
  
  get(id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }
  
  delete(id: string): Observable<HttpResponseModel> {
    throw new Error('Method not implemented.');
  }
  
  update(id: string, data: any): Observable<HttpResponseModel> {
    throw new Error('Method not implemented.');
  }
}
