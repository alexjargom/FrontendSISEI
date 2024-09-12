import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DependenciaModel, DependenciaService, HttpResponseModel, NotificationService, TableService, UserService } from 'src/app/core';
import { DifusionService } from 'src/app/core/http/difusion/difusion.service';
import { DifusionModel } from 'src/app/core/models/difusion.model';

@Component({
  selector: 'app-list-difusion',
  templateUrl: './list-difusion.component.html',
  styleUrls: ['./list-difusion.component.scss']
})
export class ListDifusionComponent implements OnInit {
  innerWidth: any = {};
  data: DifusionModel[]=[];
  loading = true;
  
  isAdmin= false;
  dependencia:string='';
  anio:number=0;
  dependencias:DependenciaModel[]=[];
  private fechaInicio = 2019;
  public anios:number[]=[];

  constructor(
    private service: DifusionService ,
    private notify: NotificationService,
    private tableService: TableService,
    private router:Router,
    private authService: UserService,
    private deService:DependenciaService,
  ) { }

  ngOnInit(): void {
    this.isAdmin = this.authService.checkIsAdmin();

    this.innerWidth = this.tableService.configHeightTable();
    if(!this.isAdmin){
      this.getListData();
    }else{
      this.getListDependencia();
      this.listaAnios();
    }
  }

  getListData(): void{
    this.loading = true;
    this.service.getAll().subscribe(
      data=>{
        this.data = data
        this.loading = false;
      },(err: HttpResponseModel)=>{
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    )
  }

  delete(id:string):void{
    this.loading = true;
    this.service.delete(id).subscribe(data=>{
      this.notify.successNotification('Difusión eliminado correctamente');
      this.loading = false;
      this.getListData();
    },(err: HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

  ver(id:string):void{
    this.router.navigate(['difusion/ver/'+id]);
  }

  nuevaDifusion():void{
    this.router.navigate(['difusion/crear']);
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

  buscarPorDependenciaAnio(){
    if(this.dependencia==='' || this.anio===0){
      this.notify.errorNotification("seleccione dependencia y un año");
      return
    }
    this.loading = true
    this.service.getAllDifusionDependencia(this.dependencia, this.anio.toString()).subscribe(dt =>{
      this.data = dt;
      this.loading = false;
    }, (err: HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;

    });

  }

}
