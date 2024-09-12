import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from 'src/environments/environment';
import { ApiFunction, EvidenciaModel, HttpResponseModel } from '../../models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class EvidenciaService implements ApiFunction {

  constructor(
    private apiService:ApiService
  ) { }
  get(id: string): Observable<any> {
    throw new Error('Method not implemented.');
  }

  create(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  getAll(): Observable<any[]> {
    throw new Error('Method not implemented.');
  }

  // obtener por el id de origen 
  getOrigen(id: string): Observable<EvidenciaModel[]> {
    return this.apiService
    .get(`${routes.evidencia}/${id}/origen`)
    .pipe(map(e => e.Data));
  }

  getOrigenPublic(id:string):Observable<EvidenciaModel[]>{
    return this.apiService
      .get(`/public${routes.evidencia}/${id}/origen`)
      .pipe(map(e => e.Data));
  }


  delete(id: string): Observable<HttpResponseModel> {
    throw new Error('Method not implemented.');
  }

  update(id: string, data: any): Observable<HttpResponseModel> {
    throw new Error('Method not implemented.');
  }
}
