import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecomendacionService, SesionService, UserService } from 'src/app/core/http';
import { HttpResponseModel, RecomendacionModel, SesionModel } from 'src/app/core/models';
import { NotificationService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  sesiones:SesionModel[]=[];
  loading = true;
  recomendacion:RecomendacionModel= {} as RecomendacionModel;
  isAdmin = false;
  
  constructor(
    private servsesion: SesionService,
    private notify: NotificationService,
    private uservice:UserService,
    private rservice:RecomendacionService,
    private route:Router
    ) { }

  ngOnInit(): void {
    this.isAdmin = this.uservice.checkIsAdmin();
    if(!this.isAdmin){
      this.getLastRecomendacionDependencia();
    }
    this.getSesionesList();
  }

  getSesionesList(){
    this.servsesion.getAll().subscribe(
      data=>{
        this.sesiones = data;
        this.loading = false;
      },(err: HttpResponseModel)=>{
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    )
  }

  getLastRecomendacionDependencia(){
    this.rservice.getLastRecomendacionDependencia().subscribe(d=>{
      this.recomendacion = d;
      if(this.recomendacion){
      }
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje)
    })
  }
  verRecomendacion(){
    this.route.navigate(['recomendacion']);
  }

}
