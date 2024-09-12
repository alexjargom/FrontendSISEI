import { CargoComiteModel } from '../../../../../core';
import { CargoComiteService } from '../../../../../core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComiteService, FormCheckService, HttpResponseModel, NotificationService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-cargos',
  templateUrl: './add-cargos.component.html',
  styleUrls: ['./add-cargos.component.scss']
})
export class AddCargosComponent implements OnInit {

  public form!: FormGroup;
  public tipoUsuario: any[] = [];

  public loading = true;
  public isUpdate = false;
  private id: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private formCheck: FormCheckService,
              private service: CargoComiteService,
              private notify: NotificationService) {
                this.id = this.route.snapshot.params.id;
                if (this.id) {
                  this.isUpdate = true;
                }
              }

  ngOnInit(): void {
    if (this.isUpdate) {
      this.get();
      return;
    }
    this.createForm();
  }


  createForm(data?: CargoComiteModel): void {
    this.form = this.fb.group({
      Basic: this.fb.group({
        Nombre: [data?.Basic.Nombre, [Validators.required]],
        Descripcion: [data?.Basic.Descripcion, [Validators.required]],
      }),
      GeneraUsuario: [data?.GeneraUsuario, []]
    });
    this.formCheck.formInit(this.form);
    this.loading = false;
  }

  submitForm(): void {
    this.formCheck.formCheck();
    if (!this.formCheck.formIsValid()) { return; }
    if (this.isUpdate){
      this.update();
      return;
    }
    this.create();
  }

  get(): void {
    this.service.get(this.id).subscribe(
      data => {
        this.createForm(data);
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.isUpdate = false;
        this.createForm();
      }
    );
  }

  create(): void {
    this.service.create(this.form.value).subscribe(
      data => {
        this.formCheck.cleanForm();
        this.router.navigate(['comite/cargo']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  update(): void {
    this.service.update(this.id, this.form.value).subscribe(
      data => {
        this.router.navigate(['comite/cargo']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

}
