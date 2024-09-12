import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { routes } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormatoModel, HttpResponseModel} from '../../models';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class FormatoService {

  constructor(
    private apiService: ApiService
  ) { }

  create(file: File, data: FormatoModel): Observable<FormatoModel> {
    const formData =  new FormData();
    formData.append( 'file' , file );
    formData.append('data',  JSON.stringify(data) );
    return this.apiService.postFile(`${routes.formato}`, formData).pipe(map( e => e.Data ));
  }

  getAll(): Observable<FormatoModel[]> {
    return this.apiService
    .get(routes.formato).pipe(map(e => e.Data ));
  }

  get(id: string): Observable<FormatoModel> {
    return this.apiService
      .get(`${routes.formato}/${id}`)
      .pipe(map(e => e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.formato}/${id}`);
  }

  update(id: string, file: File , data: FormatoModel): Observable<HttpResponseModel> {
    const formData =  new FormData();
    formData.append( 'file' , file );
    formData.append('data',  JSON.stringify(data) );
    return this.apiService
      .putFile(`${routes.formato}/${id}`, formData);
  }

}
