import { Component, OnInit } from '@angular/core';
import { DependenciaModel, DependenciaService, HttpResponseModel, NotificationService } from 'src/app/core';
import { SeguimientoService } from 'src/app/core/http/notificacion/seguimiento.service';
import { TableService } from 'src/app/core/services/table.service';
import { NotificacionModel } from '../../../core/models/notificacion.model';

@Component({
  selector: 'app-list-notificacion',
  templateUrl: './list-notificacion.component.html',
  styleUrls: ['./list-notificacion.component.scss']
})
export class ListNotificacionComponent implements OnInit {

  loading= true;
  data: NotificacionModel[] = [];
  innerWidth: any = {};
  selectedValue :any= null;
  deps: DependenciaModel[] = [];
  constructor(
    private tableService: TableService,
    private notify: NotificationService,
    private service: SeguimientoService,
    private dservice:DependenciaService,
  ) { }

  ngOnInit(): void {
    this.innerWidth = this.tableService.configHeightTable();
    this.getData();
    this.getDependencias();
  }

  getData():void{
    this.loading = true;
    var val='';
    if(this.selectedValue!= null){
      val = this.selectedValue;
    }
    // var val = this.selectedValue!=null? this.selectedValue:'';
    this.service.getAll(val).subscribe(d=>{
      this.data = d;
      this.notify.successNotification('Consultado correctamente');
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

  getDependencias():void{
    this.loading = true;
    this.dservice.getAll().subscribe(data=>{
      this.deps = data;
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

  cambioSelect(dat:any):void{
    this.getData();
  }

}
