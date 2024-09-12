import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComiteModel, ComitePublic, ComiteService, HttpResponseModel, NotificationService, TableService } from 'src/app/core';

@Component({
  selector: 'app-view-comite',
  templateUrl: './view-comite.component.html',
  styleUrls: ['./view-comite.component.scss']
})
export class ViewComiteComponent implements OnInit {
  private id:string;
  loading = false;
  innerWidth: any = {};

  @Input() info:ComiteModel[]=[];
  @Input() general= false;
  constructor(
    private comService: ComiteService,
    private notify: NotificationService,
    private route: ActivatedRoute,
    private tableService: TableService
  ) { 
    this.id = this.route.snapshot.params.id
  }

  ngOnInit(): void {
    this.innerWidth = this.tableService.configHeightTable();
    if(this.id && !this.general){
      this.getData();
    }
  }

  getData(){
    this.loading = true;
    this.comService.getComitePublic(this.id).subscribe(d=>{
      this.info = d.Comites;
      this.loading = false
    },(err:HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

}
