import { Component, OnInit } from '@angular/core';
import {
  DocumentacionModel,Documento,FileController,
  DocumentacionService,
  HttpResponseModel,
  NotificationService,
  TypeFileDetail,
  UserService,
  DependenciaService,
  DependenciaModel
} from '../../../../core';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import { ArchivosAnuales, ArchivosPermanentes } from 'src/app/core/var/variables';

@Component({
  selector: 'app-list-documentacion',
  templateUrl: './list-documentacion.component.html',
  styleUrls: ['./list-documentacion.component.scss']
})
export class ListDocumentacionComponent implements OnInit {

  public data: DocumentacionModel[] = [];
  loading = true;
  typeDetailFile = TypeFileDetail.CHECK_DOCUMENTACION;
  isAdmin = false;
  controlPermanente:FileController[]=[];
  controlAnual:FileController[]=[];

  anio:number= 0;
  private fechaInicio = 2019;
  public anios:number[]=[];
  public idDep:string ='';
  dependencias:DependenciaModel[]=[];

  constructor(
    private service: DocumentacionService,
    private notify: NotificationService,
    private router: Router,
    private uservice: UserService,
    private deService:DependenciaService,
  ) { }

  ngOnInit(): void {
    this.listaAnios();
    this.isAdmin = this.uservice.checkIsAdmin();
    if(this.isAdmin){
      this.getListDependencia();
    }
    this.getListData();
  }

  getListData(): void{
    this.loading = true;
    this.service.getAll(this.anio,this.idDep).subscribe(
      data => {
        data.map(e => {
          e.Archivo = `${environment.serverUrl}/${e.Archivo}`;
        });
        this.data = data;
        this.controlPermanente= this.asingTiposDocumentacion(ArchivosPermanentes);//asiganado permanentes
        this.controlAnual= this.asingTiposDocumentacion(ArchivosAnuales);
        this.loading = false;
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    );
  }

  delete(id: string): void {
    this.loading = true;
    this.service.delete(id).subscribe(
      data => {
        this.notify.successNotification('Documentación eliminada correctamente');
        this.loading = false;
        this.getListData();
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    );
  }

  update(id: string): void {
    this.router.navigate(['documentacion/editar/' + id]);
  }
  nuevaDocumentacion(tipo:string):void{
    this.router.navigate(['documentacion/crear/',tipo,this.anio]);
  }

  updateEdit(id:string,estado:boolean):void{
    this.loading = true;
    this.service.updateDocumentacionEdit(id,estado).subscribe(d=>{
      this.loading = false;
      this.getListData();
    },(err: HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

  tipos=['A','B','C','D','E','F','G','H','I'];


  asingTiposDocumentacion(tip:Documento[]):FileController[]{
    let dt: FileController[]=[];
    tip.forEach(element => {
      var as = this.getDocumentacionModel(element.tipo);
      if(element.tipo == 'B'|| element.tipo =='E'){
        let fc:FileController={name: element.name,tipo:element.tipo,permitidos:1,files:as }
        dt.push(fc)
      }else{
        let fc:FileController={name: element.name,tipo:element.tipo,permitidos:10,files:as }
        dt.push(fc)
      }
    });
    return dt;
  }

  getDocumentacionModel(tipo:string): DocumentacionModel[]{
    let dat: DocumentacionModel[]=[];
    this.data.forEach(element => {
      if(element.Tipo == tipo){
        dat.push(element);
      }
    });
    return dat;
  }

  listaAnios(){
    var now = new Date();
    var anio = now.getFullYear();
    for (var i = anio ; i>= this.fechaInicio;i--){
      this.anios.push(i)
    }
    this.anio = this.anios[0];
  }

  changeAnio(e:any){
    this.getListData();
  }

  changeDep(e:any){
    this.getListData()
  }

  getListDependencia():void{
    this.loading = true;
    this.deService.getAll().subscribe(data=>{
      this.dependencias = data;
      this.loading = false;
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

}
