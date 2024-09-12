import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from 'src/environments/environment';
import { ApiFunction, HttpResponseModel } from '../../models';
import { VerificacionActividadModel } from '../../models/plan-anual.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class VerificacionActividadService implements ApiFunction {

  constructor(
    private apiService: ApiService
  ) { }

  createFile(file:File,data: VerificacionActividadModel ): Observable<any> {
    const formData = new FormData();
    formData.append('file',file);
    formData.append('data',JSON.stringify(data));
    return this.apiService
      .postFile(routes.verificarActividad,formData);
  }

  create(data: any): Observable<HttpResponseModel> {
    return this.apiService
      .post(data);
  }

  getAll(): Observable<VerificacionActividadModel[]> {
    return this.apiService
      .get(routes.verificarActividad)
      .pipe( map (e=>e.Data));
  }

  get(id: string): Observable<VerificacionActividadModel> {
    return this.apiService
      .get(`${routes.verificarActividad}/${id}`)
      .pipe(map (e=>e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.verificarActividad}/${id}`);
  }

  update(id: string, data: VerificacionActividadModel): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.verificarActividad}/${id}`,data);
  }

  
}
