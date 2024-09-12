import { showLoader } from 'src/app/shared/settings/utilities';
import { UserModel } from '../../../../core/models/user.model';
import { Component, OnInit } from '@angular/core';
import { HttpResponseModel, NotificationService, UserService, TableService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.scss']
})
export class ListUsuariosComponent implements OnInit {

  innerWidth: any = {};
  data: UserModel[] = [];
  loading = true;
  constructor(private service: UserService,
              private tableService: TableService,
              private notify: NotificationService,
              private router: Router) { }

  ngOnInit(): void {
    this.innerWidth = this.tableService.configHeightTable();
    this.getListData();
  }

  getListData(): void {
    this.loading = true;
    showLoader();
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
        this.notify.successNotification('Usuario eliminado correctamente');
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
    this.router.navigate(['usuarios/editar/' + id]);
  }

  nuevoUsuario():void{
    this.router.navigate(['usuarios/crear']);
  }

}
