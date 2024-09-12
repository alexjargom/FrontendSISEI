import {Component, OnInit} from '@angular/core';
import {FormatoModel, FormatoService, HttpResponseModel, NotificationService, TypeFileDetail, UserService} from '../../../../core';
import {Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-list-formato',
  templateUrl: './list-formato.component.html',
  styleUrls: ['./list-formato.component.scss']
})
export class ListFormatoComponent implements OnInit {

  public data: FormatoModel[] = [];
  loading = true;
  typeDetailFile = TypeFileDetail.CHECK_FORMATO;
  public isAdmin = false;
  constructor(
    private service: FormatoService,
    private notify: NotificationService,
    private router: Router,
    private uService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.isAdmin = this.uService.checkIsAdmin();
    if(this.isAdmin){
      this.typeDetailFile = TypeFileDetail.CHECK_FORMATO;
    }else{
      this.typeDetailFile= TypeFileDetail.ONLY_VIEW;
    }
    this.getListData();
  }

  getListData(): void {
    this.loading = true;
    this.service.getAll().subscribe(
      data => {
        data.map(e => {
          e.Archivo = `${environment.serverUrl}/${e.Archivo}`;
        });
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
        this.notify.successNotification('Formato eliminado correctamente');
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
    this.router.navigate(['formato/editar/' + id]);
  }

  nuevoFormato():void{
    this.router.navigate(['formato/crear']);
  }
}
