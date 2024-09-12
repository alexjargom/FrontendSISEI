import { TableService } from '../../../../../core/services/table.service';
import { CargoComiteService } from '../../../../../core/http/comite/cargo_comite.service';
import { CargoComiteModel } from '../../../../../core/models/comite.model';
import { Component, OnInit } from '@angular/core';
import { HttpResponseModel, NotificationService } from 'src/app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cargos',
  templateUrl: './list-cargos.component.html',
  styleUrls: ['./list-cargos.component.scss']
})
export class ListCargosComponent implements OnInit {

  innerWidth: any = {};
  public data: CargoComiteModel[] = [];
  loading = true;
  constructor(private service: CargoComiteService,
              private notify: NotificationService,
              private tableService: TableService,
              private router: Router) { }

  ngOnInit(): void {
    this.innerWidth = this.tableService.configHeightTable();
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
        this.notify.successNotification('Cargo eliminado correctamente');
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
    this.router.navigate(['comite/cargo/editar/' + id]);
  }

  nuevoCargo():void{
    this.router.navigate(['comite/cargo/crear']);
  }

}
