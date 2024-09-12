import { Observable } from 'rxjs';
import { HttpResponseModel } from '.';

export interface ApiFunction {
  create(data: any): Observable<any>;
  getAll(): Observable<any[]>;
  get(id: string): Observable<any>;
  delete(id: string): Observable<HttpResponseModel>;
  update(id: string, data: any): Observable<HttpResponseModel>;
}
