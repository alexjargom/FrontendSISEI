import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from 'src/environments/environment';
import { HttpResponseModel, statusModel } from '../../models';
import { DataPlanAnulaModel, PlanAnualModel } from '../../models/plan-anual.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PlanAnualService {

  constructor(
    private apiService: ApiService
  ) { }

  create(file: File ,data: PlanAnualModel): Observable<HttpResponseModel> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('data',JSON.stringify(data));
    return this.apiService
      .postFile(routes.plan,formData);
  }

  getAll(): Observable<PlanAnualModel[]> {
    return this.apiService
      .get(routes.plan).pipe(map (e =>e.Data));
  }

  get(id: string): Observable<PlanAnualModel> {
    return this.apiService
    .get(`${routes.plan}/${id}`)
    .pipe(map (e=>e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.plan}/${id}`);
  }

  update(id: string, data: PlanAnualModel, file:File): Observable<HttpResponseModel> {
    const formData = new FormData();
    formData.append('file',file);
    formData.append('data',JSON.stringify(data));
    return this.apiService
      .putFile(`${routes.plan}/${id}`,formData);
  }

  updateStatus(id:string, data:statusModel): Observable<HttpResponseModel>{
    return this.apiService
      .put(`${routes.plan}/${id}/status`,data);
  }

  loadFile(id:string, file:File):Observable<HttpResponseModel>{
    const formData = new FormData();
    formData.append('file',file);
    return this.apiService 
      .postFile(`${routes.plan}/${id}/archivo`,formData);
  }

  getAvancePlan(id:string):Observable<DataPlanAnulaModel>{
    return this.apiService
      .get(`${routes.plan}/${id}/avance`)
      .pipe(map(e => e.Data));
  }

  getStatusPlanActual():Observable<boolean>{
    return this.apiService.get(`/aprovado${routes.plan}`)
      .pipe(map(e=>e.Data));
  }

  updateEditStatusPlan(id:string, status:boolean):Observable<HttpResponseModel>{
    const params:HttpParams= new HttpParams().set('status',status.toString());
    return this.apiService.put(`${routes.plan}/${id}/edit`,{},params);
  }

}
