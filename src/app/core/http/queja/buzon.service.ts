import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from 'src/environments/environment';
import { ApiFunction, BuzonQueja, HttpResponseModel } from '../../models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class BuzonService implements ApiFunction {

  constructor(private apiService: ApiService) { }

  create(data: BuzonQueja): Observable<HttpResponseModel> {
    return this.apiService
      .post(routes.buzon,data);
  }

  getAll(): Observable<BuzonQueja[]> {
    return this.apiService
      .get(routes.buzon)
      .pipe(map(e => e.Data));
  }

  get(id: string): Observable<BuzonQueja> {//obtener por el id de la dep
    return this.apiService
      .get(`${routes.buzon}/${id}`)
      .pipe(map(e=> e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.buzon}/${id}`);
  }

  update(id: string, data: BuzonQueja): Observable<HttpResponseModel> {
    return this.apiService
      .put(`${routes.buzon}/${id}`,data);
  }

  getBuzonPublic(id:string):Observable<BuzonQueja>{
    return this.apiService.get(`/public${routes.buzon}/${id}`)
      .pipe(map(e=> e.Data))
  }

}
