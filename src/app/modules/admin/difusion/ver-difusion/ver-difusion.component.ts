import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponseModel, NotificationService } from 'src/app/core';
import { DifusionService } from 'src/app/core/http/difusion/difusion.service';
import { DifusionModel } from 'src/app/core/models/difusion.model';

@Component({
  selector: 'app-ver-difusion',
  templateUrl: './ver-difusion.component.html',
  styleUrls: ['./ver-difusion.component.scss']
})
export class VerDifusionComponent implements OnInit {
  loading = true;
  private id:string;
  difusion={} as DifusionModel;
  constructor(
    private service: DifusionService,
    private notify: NotificationService,
    private route:ActivatedRoute
  ) { 
    this.id =  route.snapshot.params.id;
  }

  ngOnInit(): void {
    if(this.id){
      this.getData();
      return
    }
    this.notify.errorNotification("Error inesperado");
  }

  getData(){
    this.loading = true;
    this.service.get(this.id).subscribe(data=>{
      this.difusion = data;
      this.loading = false;
    },(err:HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

}
