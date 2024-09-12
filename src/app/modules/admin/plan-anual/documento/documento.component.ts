import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Packer } from 'docx';
import { ComiteModel, ComiteService, HttpResponseModel, NotificationService } from 'src/app/core';
import { ActividadPlanModel, PlanAnualModel } from 'src/app/core/models/plan-anual.model';
import { DocumentCreator } from './cv-generator';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.scss'],
  providers:[ DatePipe ]
})
export class DocumentoComponent implements OnInit {
  @Input() plan={} as PlanAnualModel;
  @Input() data:ActividadPlanModel[]=[]
  private nombre='planAnual'
  private comites:ComiteModel[]=[];
  private presidente="";
  private sEjecutivo="";
  constructor(
    private notify:NotificationService,
    private pip: DatePipe,
    private cservice: ComiteService,
  ) { }

  ngOnInit(): void {
    this.getComitesData();
  }
  
 
  public download(): void {
     this.nombre=this.nombre+this.plan.Dependencia?.Siglas+this.plan.Anio;
      const documentCreator = new DocumentCreator(this.pip,this.data, this.plan.Anio ,this.presidente,this.sEjecutivo,this.plan.Dependencia?.Nombre );
      const doc = documentCreator.create();
      Packer.toBlob(doc).then(blob => {
        let file_saver = require('file-saver');
        file_saver.saveAs(blob, this.nombre+".docx");
        this.notify.successNotification('Archivo creado correctamente');
      });
  }

  public getComitesData(){
    this.cservice.getAll().subscribe(data=>{
      this.comites= data;
      this.buscarDataComites();
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
    })
  }

  buscarDataComites(){
    this.comites.forEach(element => {
      if (element.Cargo.Basic.Nombre.toUpperCase() == "PRESIDENTE"){
        this.presidente = element.Nombre +" "+ element.PrimerApellido +" "+ element.SegundoApellido
      }
      if (element.Cargo.Basic.Nombre.toUpperCase() == "SECRETARÍA EJECUTIVA"){
        this.sEjecutivo = element.Nombre +" "+ element.PrimerApellido +" "+ element.SegundoApellido
      }
    });
  }
  
}
