import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { BuzonQueja, HttpResponseModel, NotificationService } from 'src/app/core';
import { BuzonService } from 'src/app/core/http/queja/buzon.service';

@Component({
  selector: 'app-list-buzon',
  templateUrl: './list-buzon.component.html',
  styleUrls: ['./list-buzon.component.scss']
})
export class ListBuzonComponent implements OnInit {

  loading = true;
  buzones: BuzonQueja[] = [];
  innerWidth: any = {};
  constructor(
    private notify: NotificationService,
    private bService:BuzonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData():void{
    this.loading = true;
    this.bService.getAll().subscribe(data=>{
      this.buzones = data;
      this.loading = false;
    },(err: HttpResponseModel )=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    });
  }

  update(idDep:string):void{
    this.router.navigate([`buzon/editar/${idDep}`]);
  }

}
