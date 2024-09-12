import { Injectable } from '@angular/core';
import { routes } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {DocumentacionModel, HttpResponseModel} from '../../models';
import { ApiService } from '../api.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentacionService {

  constructor(
    private apiService: ApiService
  ) { }

  create(file: File, data: DocumentacionModel): Observable<DocumentacionModel> {
    const formData =  new FormData();
    formData.append( 'file' , file );
    formData.append('data',  JSON.stringify(data) );
    return this.apiService.postFile(`${routes.documentacion}`, formData).pipe(map( e => e.Data ));
  }

  getAll(anio:number,id?: string ): Observable<DocumentacionModel[]> {
    let params = new HttpParams();
    if(id){
      params = params.append("dep",id);
    }
    params = params.append('anio',anio.toString())
    return this.apiService
    .get(routes.documentacion, params).pipe(map(e => e.Data ));
  }

  get(id: string): Observable<DocumentacionModel> {
    return this.apiService
      .get(`${routes.documentacion}/${id}`)
      .pipe(map(e => e.Data));
  }

  delete(id: string): Observable<HttpResponseModel> {
    return this.apiService
      .delete(`${routes.documentacion}/${id}`);
  }

  update(id: string, file: File , data: DocumentacionModel): Observable<HttpResponseModel> {
    const formData =  new FormData();
    formData.append( 'file' , file );
    formData.append('data',  JSON.stringify(data) );
    return this.apiService
      .putFile(`${routes.documentacion}/${id}`, formData);
  }


  updateDocumentacionEdit(id:string, estado:boolean):Observable<HttpResponseModel>{
    const params = new HttpParams().set('status',estado.toString())
    return this.apiService
    .put(`${routes.documentacion}/${id}/edit`,{},params);
  }

  getAllPublic(anio:number,id: string ): Observable<DocumentacionModel[]> {
    let params = new HttpParams();
    if(id){
      params = params.append('dep',id);
    }
    params = params.append('anio',anio.toString())
    return this.apiService
    .get(`/public${routes.documentacion}`, params)
      .pipe(map(e => e.Data ));
  }

}
