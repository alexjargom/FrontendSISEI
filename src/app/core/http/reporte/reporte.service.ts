import { HttpParams,HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { routes } from 'src/environments/environment';
import { ApiService } from '..';
import { ApiFunction } from '../..';
import { HttpResponseModel } from '../../models';
import { ReporteGeneral } from '../../models/reporte.model';

@Injectable({
  providedIn: 'root'
})
export class ReporteService implements ApiFunction {

  constructor(private apiService: ApiService,private http: HttpClient) { }

  create(data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<any[]> {
    throw new Error('Method not implemented.');
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

  getResporte(anio:number, tipo:string, dependencia?:string, file?: boolean): Observable<ReporteGeneral[]>{
    // anio = anio? anio : '';
    const pa = new HttpParams(). 
      set('anio',anio.toString()).
      set("dependencia", dependencia || '').
      set("file", file? String(file):"false" )
  return this.apiService.get(`${routes.reporte}/${tipo}`,pa ).
  pipe(map(e=>e.Data));
  }

  getReporteFile(anio: number, tipo:string, dependencia?:string, file?:boolean){
      const pa = new HttpParams(). 
      set('anio',anio.toString()).
      set("dependencia", dependencia || '').
      set("file", file? "true":"false" )
      const headers = new HttpHeaders().append('accept', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return this.http.get(`/api/v1${routes.reporte}/${tipo}`,{responseType: 'blob', headers: headers, params: pa} )
  }

}