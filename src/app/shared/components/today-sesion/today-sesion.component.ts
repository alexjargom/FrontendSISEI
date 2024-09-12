import { Component, OnInit } from '@angular/core';
import { HttpResponseModel, NotificationService, SesionModel, SesionService } from 'src/app/core';

@Component({
  selector: 'app-today-sesion',
  templateUrl: './today-sesion.component.html',
  styleUrls: ['./today-sesion.component.scss']
})
export class TodaySesionComponent implements OnInit {
  
  loading = true;
  data: SesionModel[]=[];
  constructor(private sesionS: SesionService, 
              private notify: NotificationService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.loading = true;
    this.sesionS.getTodaySesion().subscribe(data=>{
      this.data = data;
      this.loading = false;
    },(err: HttpResponseModel )=>{
      this.data = [];
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

}
