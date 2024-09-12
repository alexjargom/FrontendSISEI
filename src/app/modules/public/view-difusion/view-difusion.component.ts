import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DependenciaModel, DependenciaService, HttpResponseModel, NotificationService } from 'src/app/core';
import { DifusionService } from 'src/app/core/http/difusion/difusion.service';
import { DifusionModel } from 'src/app/core/models/difusion.model';

@Component({
  selector: 'app-view-difusion',
  templateUrl: './view-difusion.component.html',
  styleUrls: ['./view-difusion.component.scss']
})
export class ViewDifusionComponent implements OnInit {
  Dependencia= {} as DependenciaModel
  Difusiones: DifusionModel[]= [];
  private id:string;
  public loading = true;
  private fechaInicio = 2020;
  public anios:number[]=[];
  public anioSel=0;
  constructor(
    private difusionS: DifusionService,
    private dependeniciaS:DependenciaService,
    private router:ActivatedRoute,
    private notify: NotificationService
  ) {
    this.id = router.snapshot.params.id
  }

  ngOnInit(): void {
    if(this.id){
      this.listaAnios();
      this.getDependencia();
        // this.getDifusiones()
    }
  }

  getDifusiones(){
    this.difusionS.getAllDifusionDependenciaPublic(this.id).subscribe(d=>{
      this.Difusiones = d;
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

  getDependencia(){
    this.loading = true;
    this.dependeniciaS.getDependenciaIdPublic(this.id).subscribe(d=>{
      this.Dependencia = d;
      this.getDifusiones();
    },(err: HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

  listaAnios(){
    var now = new Date();
    var anio = now.getFullYear();
    for(var i = this.fechaInicio; i<= anio; i++){
      this.anios.push(i);
    }
  }

  cambioSelect(val:any):void{
    this.anioSel = val;
    this.loading = true;
    this.difusionS.getAllDifusionDependenciaPublic(this.id, val).subscribe(d=>{
      this.Difusiones = d;
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

}
