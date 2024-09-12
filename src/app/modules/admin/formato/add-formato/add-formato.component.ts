import {
  FormatoModel,
  FormatoService, HttpResponseModel, Logger,
  NotificationService
} from '../../../../core';
import { Component, OnInit } from '@angular/core';
import { TypeFileDetail } from 'src/app/core';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {showLoader} from '../../../../shared/settings/utilities';
const log = new Logger('AddFormatoComponent');

@Component({
  selector: 'app-add-formato',
  templateUrl: './add-formato.component.html',
  styleUrls: ['./add-formato.component.scss']
})
export class AddFormatoComponent implements OnInit {
  private id: string;

  private file: File | null = null;
  urlFile = '';
  typeDetailFile = TypeFileDetail.UPLOAD_FORMATO;
  loading = true;
  isUpdate = false;
  data: FormatoModel | null = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: FormatoService,
    private notify: NotificationService
  ) {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isUpdate = true;
    }
  }

  ngOnInit(): void{
    if (this.isUpdate) {
      this.get();
      return;
    }
    this.loading = false;
  }

  setFile(file: File): void {
    this.file = file;
  }

  formComplete(data: FormatoModel): void {
    if (this.isUpdate) {
      this.update(data);
      return;
    }
    this.create(data);
  }

  create(data: FormatoModel): void {
    this.service.create(this.file!, data).subscribe(
      e => {
        log.debug(e);
        this.router.navigate(['formato']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  update(data: FormatoModel): void {
    this.service.update(this.id, this.file!, data).subscribe(
      e => {
        log.debug(e);
        this.router.navigate(['formato']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  get(): void {
    this.service.get(this.id).subscribe(
      data => {
        this.data = data;
        this.urlFile = `${environment.serverUrl}/${data.Archivo}`;
        this.loading = false;
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.isUpdate = false;
        this.data = null;
        this.loading = false;
      }
    );
  }

}
