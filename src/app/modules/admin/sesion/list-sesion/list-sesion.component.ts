import {Component, OnInit} from '@angular/core';
import {HttpResponseModel, NotificationService, SesionModel, SesionService, TableService, UserService} from '../../../../core';
import {Router} from '@angular/router';
import { PlanAnualService } from 'src/app/core/http/planAnual/plan-anual.service';

@Component({
  selector: 'app-list-sesion',
  templateUrl: './list-sesion.component.html',
  styleUrls: ['./list-sesion.component.scss']
})
export class ListSesionComponent implements OnInit {
  innerWidth: any = {};
  data: SesionModel[] = [];
  loading = true;

  searchValue = '';
  visible = false;
  dataDisplay:SesionModel[]=[];
  estadoPlan= false;
  anio = new Date().getFullYear();
  isAdmin= false;
  constructor(
    private service: SesionService,
    private notify: NotificationService,
    private tableService: TableService,
    private router: Router,
    private sPlan: PlanAnualService,
    private uService:UserService,
  ) {
  }

  ngOnInit(): void {
    this.isAdmin=this.uService.checkIsAdmin();
    this.innerWidth = this.tableService.configHeightTable();
    this.getListdata();
    if(!this.isAdmin){
      this.getEstadoPlan();
    }
  }

  getListdata(): void {
    this.loading = true;
    this.service.getAll().subscribe(
      data => {
        this.data = data;
        this.loading = false;
        this.dataDisplay= [...this.data];
      }, (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    );
  }

  delete(id: string): void {
    this.loading = true;
    this.service.delete(id).subscribe(
      data => {
        this.notify.successNotification(data.Mensaje);
        this.loading = false;
        this.getListdata();
      }, (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    );
  }

  update(id: string): void {
    this.router.navigate(['sesion/editar/' + id]);
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.dataDisplay = this.data.filter((item: SesionModel) => item.Dependencia.Nombre.indexOf(this.searchValue) !== -1);
  }

  nuevaSesion():void{
    this.router.navigate(['sesion/crear']);
  }

  getEstadoPlan():void{
    this.sPlan.getStatusPlanActual().subscribe(data=>{
      this.estadoPlan = data;
    },(err: HttpResponseModel)=>{
      this.estadoPlan = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }
}
