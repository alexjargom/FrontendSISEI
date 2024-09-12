import { ComiteService } from '../../../../core/http/comite/comite.service';
import { ComiteModel, ConformacionComiteModel } from '../../../../core/models/comite.model';
import { Component, OnInit } from '@angular/core';
import { ConformacionComiteService, HttpResponseModel, NotificationService, TableService, UserService } from 'src/app/core';
import { Router } from '@angular/router';
import { TipoUsuario } from 'src/app/core/var/variables';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'src/environments/environment';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-list-comite',
  templateUrl: './list-comite.component.html',
  styleUrls: ['./list-comite.component.scss']
})
export class ListComiteComponent implements OnInit {

  innerWidth: any = {};
  public data: ComiteModel[] = [];
  loading = true;
  searchValue = '';
  visible = false;
  dataDisplay: ComiteModel[]=[];
  isAdmin = false;
  public conformacion={} as ConformacionComiteModel;
  public existConformacion = false;

  public actualiza = -1;
  public nuevoArchivo:any=null;

  constructor(private service: ComiteService,
              private notify: NotificationService,
              private tableService: TableService,
              private router: Router,
              private usSer:UserService,
              private confService:ConformacionComiteService,
              private clipboard: Clipboard) { }

  ngOnInit(): void {
    var us = this.usSer.getCurrentUser();
    if (us.TipoUsuarioId == TipoUsuario.Admin || us.TipoUsuarioId == TipoUsuario.Admin){
      this.isAdmin = true;
    }
    this.innerWidth = this.tableService.configHeightTable();
    if(!this.isAdmin){
      this.getConformacionComite();
    }
    this.getListData();
  }

  getListData(): void {
    this.loading = true;
    this.service.getAll().subscribe(
      data => {
        this.data = data;
        this.loading = false;
        this.dataDisplay=[...this.data];
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
        this.notify.successNotification('Comité eliminado correctamente');
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
    this.router.navigate(['comite/editar/' + id]);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.dataDisplay = this.data.filter((item: ComiteModel) => item.Dependencia.Nombre.indexOf(this.searchValue) !== -1);
  }

  nuevoComite():void {
    this.router.navigate(['comite/crear']);
  }

  updateEdit(id:string,e:boolean):void{
    this.loading = true;
    this.service.updateEdicion(id,e).subscribe(data=>{
      this.notify.successNotification("Estado cambiado correctamente");
      this.loading = false;
      this.getListData();
    },(err : HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

  copiar(){
    let correos="";
    this.dataDisplay.forEach(data=>{
      correos= correos+","+data.Correo;
    });
    const pendind=this.clipboard.beginCopy(correos);
    let remanigAtemmps=3;
    const attemp=()=>{
      const result = pendind.copy();
      if(!result && --remanigAtemmps){
        setTimeout(attemp);
      }else{
        this.notify.succesMessage('copiado correctamente');
        pendind.destroy();
      }
    }
    attemp();
  }

  Updatedata(data:boolean):void{
    if(data){
      this.getConformacionComite();
      this.getListData();
    }
  }

  getConformacionComite():void{
    this.loading= true;
    var us = this.usSer.getCurrentUser();
    const id = us.DependenciaId? us.DependenciaId:'';
    this.confService.getXDependencia(id).subscribe(
      re=>{
        if(re== null){
          this.existConformacion = false;
        }else{
          if(re.Solicitud){
            re.Solicitud = `${environment.serverUrl}/${re.Solicitud}`;
          }
          if(re.Aceptacion){
            re.Aceptacion = `${environment.serverUrl}/${re.Aceptacion}`;
          }
          this.conformacion = re;
          this.existConformacion = true;
        }
        this.loading = false;
    },(err: HttpResponseModel)=>{
      this.loading = false;
      this.existConformacion = false;
      this.notify.errorNotification(err.Mensaje);
    });
  }
//actualizacion de los archivos de conformacion de comite
  ActualizarArchivo(actualiza: number):void {
    this.actualiza = actualiza;
  }
  
  cancelarActualizacio() {
    this.actualiza = -1;
    this.nuevoArchivo = null;
  }

  GuardarArchivo(){
    switch (this.actualiza) {
      case -1:
             this.notify.errorNotification('opcion invalido');  
        break;
      case 1:
        //actualizar el archivo de solicitud
           this.cargarArchivo(); 
      break;
      case 2:
        //actualizar el archivo de aprovacion
              this.cargarArchivo();
        break;
    
      default:
        this.notify.errorNotification('opcion invalido');  
        break;
    }

  }

  beforeUpload2 = (file: NzUploadFile):boolean=>{
    this.nuevoArchivo = file;
    return false;
  }

  cargarArchivo(){
    this.confService.UploadFile(this.conformacion.Id, this.nuevoArchivo, this.actualiza).subscribe(data=>{
      this.notify.successNotification("Archivo actualizado correctamente");
      this.loading = false;
      this.actualiza = -1;
      this.nuevoArchivo = null
      data.Aceptacion = `${environment.serverUrl}/${data.Aceptacion}`
      data.Solicitud = `${environment.serverUrl}/${data.Solicitud}`
      this.conformacion= data;
      // this.actualizar.emit(true);
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }
}
