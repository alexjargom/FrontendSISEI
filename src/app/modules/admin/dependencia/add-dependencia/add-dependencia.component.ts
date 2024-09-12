import { DependenciaModel } from '../../../../core/models/dependencia.model';
import { DependenciaService } from '../../../../core/http/dependencia/dependencia.service';
import { FormCheckService } from '../../../../core/services/form-check.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponseModel, NotificationService, UserService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-dependencia',
  templateUrl: './add-dependencia.component.html',
  styleUrls: ['./add-dependencia.component.scss']
})
export class AddDependenciaComponent implements OnInit {
  public form!: FormGroup;
  public tipoUsuario: any[] = [];
  public loading = true;

  public isUpdate = false;
  private id: string;
  isAdmin= false;
  constructor(private fb: FormBuilder, private formCheck: FormCheckService, private service: DependenciaService,
              private router: Router,
              private route: ActivatedRoute,
              private notify: NotificationService,
              private uService:UserService) {
                this.id = this.route.snapshot.params.id;
                if (this.id) {
                  this.isUpdate = true;
                }
              }

  ngOnInit(): void {
    this.isAdmin = this.uService.checkIsAdmin();
    if (this.isUpdate) {
      this.get();
      return;
    }
    this.createForm();
  }

  createForm(data?: DependenciaModel): void {
    this.form = this.fb.group({
      Nombre: [{value: data?.Nombre, disabled: this.isUpdate }, [Validators.required]],
      Siglas: [{value: data?.Siglas, disabled: this.isUpdate }, [Validators.required]],
      Direccion: [data?.Direccion, [Validators.required]]
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
    const d = this.form.value as DependenciaModel;
    d.Siglas = d.Siglas.toUpperCase();
    this.service.create(d).subscribe(
      data => {
        this.router.navigate(['dependencia']); 
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  update(): void {
    this.service.update(this.id, this.form.getRawValue()).subscribe(
      data => {
        if(this.isAdmin){
          this.router.navigate(['dependencia']);          
        }
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }
}
