import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { BuzonQueja, ComiteModel, ComiteService, DependenciaModel, DocumentacionModel, DocumentacionService, HttpResponseModel, NotificationService } from 'src/app/core';
import { BuzonService } from 'src/app/core/http/queja/buzon.service';
import { DifusionModel } from 'src/app/core/models/difusion.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  public index:number =1;
  private id:string;
  private anio:number=0;
  public loading = true;
//informacion
  public Buzon:BuzonQueja={} as BuzonQueja;
  public Comites:ComiteModel[]=[];
  public Documentacion:DocumentacionModel[]=[];
  public Difusion:DifusionModel[]=[];
  public Dependencia:DependenciaModel={} as DependenciaModel;
  private juridico = '/juridico';
  public pathReglasIntegridad = `${environment.serverUrl}${this.juridico}/Reglas-de-Integridad-para-Servidoras-y-Servidores-Públicos.pdf`;
  public pathLineamientos = `${environment.serverUrl}${this.juridico}/Lineamientos-Generales-del-Código-de-Ética-para-Servidoras-y-Servidores-Públicos.pdf`;
  public pathCodigoEtica = `${environment.serverUrl}${this.juridico}/Código-de-Ética-para-Servidoras-y-Servidores-Públicos.pdf`;

  constructor(
    private route:ActivatedRoute,
    private bservice:BuzonService,
    private cservice:ComiteService,
    private dservice:DocumentacionService,
    private notify:NotificationService,
  ) { 
    this.id = this.route.snapshot.params.id
  }

  ngOnInit(): void {
    this.anio = new Date().getFullYear();
    this.getAllInitData();
    this.getDataBuzon();
    this.loading = false;
  }

  cambioTab(index:number):void{
    this.index = index;
  }

  getDataBuzon():void{
    this.bservice.getBuzonPublic(this.id).subscribe(data=>{
      this.Buzon = data;
      this.loading = false;
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

  getAllInitData(){
    this.loading = true;
    const comit = this.cservice.getComitePublic(this.id);
    const docs = this.dservice.getAllPublic(this.anio,this.id);
    forkJoin([comit,docs]).subscribe(data=>{
      this.Comites = data[0].Comites;
      this.Dependencia = data[0].Dependencia;
      this.Documentacion = data[1];
      this.loading = false;
    },(err)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    });
  }

}
