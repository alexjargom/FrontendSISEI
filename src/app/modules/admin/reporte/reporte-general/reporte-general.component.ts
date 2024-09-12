import { Component, OnInit } from '@angular/core';
import { DependenciaModel, DependenciaService, HttpResponseModel, NotificationService, TableService } from 'src/app/core';
import { ReporteService } from 'src/app/core/http/reporte/reporte.service';
import { ReporteGeneral } from 'src/app/core/models/reporte.model';
import { descargarDocumento } from 'src/app/shared/settings/utilities';

@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.scss']
})
export class ReporteGeneralComponent implements OnInit {
  data : ReporteGeneral[] = [];
  dependencia: string = "";
  anio : number= 0;
  loading = true;

  dependencias: DependenciaModel[] = []
  private fechaInicio = 2019;
  public anios:number[]=[];
  innerWidth: any = {};
  
  constructor(private reporteSer: ReporteService, 
    private notify: NotificationService,
    private deService:DependenciaService,
    private tableService: TableService) { }

  ngOnInit(): void {
    this.innerWidth = this.tableService.configHeightTable();
    this.loading = true;
    this.getListDependencia();
    this.listaAnios();
  }

  generarReporte(){
    this.reporteSer.getResporte(this.anio,'general', this.dependencia).subscribe(resp =>{
      this.data = resp
    },(err:HttpResponseModel)=>{
      console.log(err.Mensaje)
      this.notify.errorNotification(err.Mensaje)
    })
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

  listaAnios(){
    var now = new Date();
    var anio = now.getFullYear();
    for (var i = anio ; i>= this.fechaInicio;i--){
      this.anios.push(i)
    }
    this.anio = this.anios[0];
  }

  descargarReporte(){
    this.loading = true;
    this.reporteSer.getReporteFile(this.anio,'general', this.dependencia, true).subscribe(resp =>{
      descargarDocumento(resp,'.xlsx','reportegeneral');
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.loading = false
      this.notify.errorNotification(err.Mensaje)
    })
  }

}
