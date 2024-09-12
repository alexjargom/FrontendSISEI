import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from 'src/environments/environment';
import { ApiFunction, HttpResponseModel } from '../../models';
import { DifusionModel } from '../../models/difusion.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})

export class DifusionService implements ApiFunction{

  constructor(
    private apiService:ApiService
  ) { }

  create(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  createFile(data: DifusionModel, files: File[] ): Observable<HttpResponseModel> {
    const formData = new FormData();
    formData.append('cont',files.length.toString())
    formData.append('data',JSON.stringify(data))
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      formData.append('file'+index,element)
    }
    return this.apiService
      .postFile(routes.difusion,formData)
  }

  getAll(): Observable<any[]> {
    return this.apiService
      .get(routes.difusion)
      .pipe(map (e=> e.Data));
  }

  get(id: string): Observable<any> {
    return this.apiService
      .get(`${routes.difusion}/${id}`)
      .pipe(map (e=> e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.difusion}/${id}`);
  }

  update(id: string, data: any): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.actividadPlan}/${id}`,data);
  }

  getAllDifusionDependenciaPublic(iddep: string, anio?:string): Observable<DifusionModel[]> { 
    if(anio){
      anio = anio? anio : '';
      const pa = new HttpParams().set('anio',anio);
      return this.apiService
        .get(`/public${routes.difusion}/${iddep}`,pa)
        .pipe(map(e=>e.Data));
    }else{
      return this.apiService
        .get(`/public${routes.difusion}/${iddep}`)
        .pipe(map(e=>e.Data));
    }
  }

  getAllDifusionDependencia(iddep: string, anio?:string): Observable<DifusionModel[]> { 
      anio = anio? anio : '';
      const pa = new HttpParams().set('anio',anio);
      return this.apiService
        .get(`${routes.difusion}/${iddep}/dependencia`,pa)
        .pipe(map(e=>e.Data));
  }
  
}
