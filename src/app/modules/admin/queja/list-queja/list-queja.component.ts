import { Component, OnInit } from '@angular/core';
import {
  HttpResponseModel,
  NotificationService,
  QuejaModel,
  QuejaService,
  TableService,
  UserService
} from '../../../../core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-queja',
  templateUrl: './list-queja.component.html',
  styleUrls: ['./list-queja.component.scss']
})
export class ListQuejaComponent implements OnInit {

  innerWidth: any = {};
  public data: QuejaModel[] = [];
  loading = true;

  searchValue = '';
  visible = false;
  dataDisplay: QuejaModel[]=[];
  isAdmin= false;
  constructor(private service: QuejaService,
              private notify: NotificationService,
              private tableService: TableService,
              private router: Router,
              private uService: UserService) { }

  ngOnInit(): void {
    this.isAdmin = this.uService.checkIsAdmin();
    this.innerWidth = this.tableService.configHeightTable();
    this.getListData();
  }

  getListData(): void {
    this.loading = true;
    this.service.getAll().subscribe(
      data => {
        this.data = data;
        this.loading = false;
        this.dataDisplay=[...this.data];
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
    this.router.navigate(['queja/editar/' + id]);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.dataDisplay = this.data.filter((item: QuejaModel) => item.Dependencia.Nombre.indexOf(this.searchValue) !== -1);
  }

  nuevaQueja():void{
    this.router.navigate(['queja/crear']);
  }

}
