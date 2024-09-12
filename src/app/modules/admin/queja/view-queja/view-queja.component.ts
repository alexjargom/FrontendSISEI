import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponseModel, NotificationService, QuejaService } from 'src/app/core';
import { QuejaModel } from 'src/app/core/models/queja.model';

@Component({
  selector: 'app-view-queja',
  templateUrl: './view-queja.component.html',
  styleUrls: ['./view-queja.component.scss']
})
export class ViewQuejaComponent implements OnInit {

  public actual= {} as QuejaModel;
  public loading = true;
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private quejaS: QuejaService,
    private notify: NotificationService
  ) { 
    this.id=this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if(this.id){
      this.getActualQueja();
      return;
    }
    this.notify.errorNotification("Se require identificador de queja");
  }

  getActualQueja(){
    this.loading = true;
    this.quejaS.get(this.id).subscribe(data=>{
      this.actual = data;
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

}
