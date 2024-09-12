import { DependenciaService } from '../../../../core/http/dependencia/dependencia.service';
import { DependenciaModel } from '../../../../core/models/dependencia.model';
import { Component, OnInit } from '@angular/core';
import { HttpResponseModel, NotificationService, TableService, UserService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-dependencia',
  templateUrl: './list-dependencia.component.html',
  styleUrls: ['./list-dependencia.component.scss']
})
export class ListDependenciaComponent implements OnInit {

  innerWidth: any = {};
  data: DependenciaModel[] = [];
  loading = true;

  searchValue = '';
  visible = false;
  dataDisplay: DependenciaModel[]=[];
  isAdmin = false;
  constructor(private service: DependenciaService,
              private notify: NotificationService,
              private tableService: TableService,
              private router: Router,
              private uservice: UserService) { }

  ngOnInit(): void {
    this.innerWidth = this.tableService.configHeightTable();
    this.isAdmin = this.uservice.checkIsAdmin();
    this.getListData();
  }

  getListData(): void {
    this.loading = true;
    this.service.getAll().subscribe(
      data => {
        this.data = data;
        this.loading = false;
        this.dataDisplay = [...this.data];
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
        this.notify.successNotification('Dependencia eliminado correctamente');
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
    this.router.navigate(['dependencia/editar/' + id]);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.dataDisplay = this.data.filter((item: DependenciaModel) => item.Siglas.indexOf(this.searchValue)!==-1 || item.Siglas.indexOf(this.searchValue.toUpperCase())!==-1);
  }

  nuevaDependencia():void{
    this.router.navigate(['dependencia/crear']);
  }
}
