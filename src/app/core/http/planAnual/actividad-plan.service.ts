import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from 'src/environments/environment';
import { ApiFunction } from '../..';
import { HttpResponseModel } from '../../models';
import { ActividadPlanModel } from '../../models/plan-anual.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadPlanService implements ApiFunction {

  constructor(
    private apiService:ApiService
  ) { }

  create(data: ActividadPlanModel): Observable<HttpResponseModel> {
    return this.apiService
      .post(routes.actividadPlan,data);
  }

  getAll(): Observable<ActividadPlanModel[]> {
    return this.apiService
      .get(routes.actividadPlan)
      .pipe( map(e => e.Data) );
  }

  get(id: string): Observable<ActividadPlanModel> {
    return this.apiService
      .get(`${routes.actividadPlan}/${id}`)
      .pipe( map (e => e.Data ));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.actividadPlan}/${id}`);
  }

  update(id: string, data: any): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.actividadPlan}/${id}`,data);
  }

  getActividadPlan(id:string): Observable<ActividadPlanModel[]>{
    return this.apiService
      .get(`${ routes.actividadPlan}/${id}/plan`)
      .pipe( map(e => e.Data));
  }

}
