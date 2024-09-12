import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { routes } from "src/environments/environment";
import { ApiFunction, ConformacionComiteModel, HttpResponseModel } from "../../models";
import { ApiService } from "../api.service";

@Injectable({
    providedIn: 'root'
})
export class ConformacionComiteService implements ApiFunction{
    constructor(
        private apiService: ApiService,
    ){}

    create(data: ConformacionComiteModel): Observable<HttpResponseModel> {
        return this.apiService
            .post(routes.conformacion,data)
    }

    getAll(): Observable<any[]> {
        throw new Error("Method not implemented.");
    }

    get(id: string): Observable<any> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Observable<HttpResponseModel> {
        return this.apiService
            .delete(`${routes.conformacion}/${id}`);
    }

    update(id: string, data: ConformacionComiteModel): Observable<HttpResponseModel> {
        return this.apiService
            .put(`${routes.conformacion}/${id}`,data);
    }

    getXDependencia(id:string):Observable<ConformacionComiteModel>{
        return this.apiService
            .get(`${routes.conformacion}/${id}`)
            .pipe(map(e=>e.Data));
    }

    //files
    UploadFile(id:string,file :File, tipo = 2): Observable<ConformacionComiteModel>{
        //
        var ruta =""
        if (tipo==2){
            ruta ='autorizacion';
        }else{
            ruta ='solicitud' 
        }
        const formData = new FormData();
        formData.append('file',file)
        return this.apiService
            .putFile(`${routes.conformacion}/${id}/${ruta}`,formData)
            .pipe(map(e => e.Data));
    }

    createWithFile(data: ConformacionComiteModel,file:File):Observable<HttpResponseModel>{
        const formData = new FormData();
        formData.append('data',JSON.stringify(data))
        formData.append('file',file);
        return this.apiService
            .postFile(routes.conformacion,formData);
    }
}