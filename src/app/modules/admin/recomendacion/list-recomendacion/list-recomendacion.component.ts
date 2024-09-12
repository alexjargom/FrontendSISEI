import { Component, OnInit } from '@angular/core';
import {
  HttpResponseModel,
  NotificationService, RecomendacionModel,
  RecomendacionService,
  UserService,
} from '../../../../core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-recomendacion',
  templateUrl: './list-recomendacion.component.html',
  styleUrls: ['./list-recomendacion.component.scss']
})
export class ListRecomendacionComponent implements OnInit {

  public data: RecomendacionModel[] = [];
  loading = true;
  isAdmin = false;
  constructor(private service: RecomendacionService,
              private notify: NotificationService,
              private router: Router,
              private uservice: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.uservice.checkIsAdmin();
    this.getListData();
  }

  getListData(): void {
    this.loading = true;
    this.service.getAll().subscribe(
      data => {
        this.data = data;
        this.loading = false;
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    );
  }

  delete(id: string): void {
    this.loading = true;
    this.service.delete(id).subscribe(
      data => {
        this.notify.successNotification('Recomendación eliminada correctamente');
        this.loading = false;
        this.getListData();
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    );
  }

  update(id: string): void {
    this.router.navigate(['recomendacion/editar/' + id]);
  }

  nuevaRecomendacion():void{
    this.router.navigate(['recomendacion/crear']);
  }
}
