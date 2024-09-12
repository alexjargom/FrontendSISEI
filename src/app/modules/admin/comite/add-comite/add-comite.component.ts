import { CargoComiteService } from '../../../../core';
import { HttpResponseModel } from '../../../../core';
import { ComiteService } from '../../../../core';
import { CargoComiteModel, ComiteModel } from '../../../../core';
import { NotificationService } from '../../../../core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DependenciaModel, DependenciaService, FormCheckService } from 'src/app/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-comite',
  templateUrl: './add-comite.component.html',
  styleUrls: ['./add-comite.component.scss']
})
export class AddComiteComponent implements OnInit {

  public form!: FormGroup;
  public loading = true;

  public dependencias: DependenciaModel[] = [];
  public cargos: CargoComiteModel[] = [];

  @Input() isUpdate = false;
  @Input() id = '';
  @Input() data: ComiteModel | null | undefined = null;
  @Output() completeRegister = new EventEmitter<ComiteModel>();

  constructor(private fb: FormBuilder, private formCheck: FormCheckService,
              private serviceC: ComiteService,
              private serviceCC: CargoComiteService,
              private serviceD: DependenciaService,
              private notify: NotificationService) { }

  ngOnInit(): void {
    this.getData();
  }

  createForm(data?: ComiteModel | null | undefined ): void {
    this.form = this.fb.group({
      Nombre: [data?.Nombre, [Validators.required]],
      // Curp: [data?.Curp, [Validators.required]],
      PrimerApellido: [data?.PrimerApellido, [Validators.required]],
      SegundoApellido: [data?.SegundoApellido, []],
      CargoDependencia: [data?.CargoDependencia, [Validators.required]],
      // Departamento: [data?.Departamento, [Validators.required]],
      Correo: [data?.Correo, [Validators.required, Validators.email]],
      Celular: [data?.Celular, [Validators.required]],
      TelOficina: [data?.TelOficina],
      ExtOficina: [data?.ExtOficina],
      CargoId: [data?.CargoId, [Validators.required]],
      DependenciaId: [data?.DependenciaId, [Validators.required]]
    });

    this.formCheck.formInit(this.form);

    // files
    /**
     *       Nombramiento: [null, [Validators.required]],
     *       CartaCompromiso: [null, [Validators.required]],
     */
  }

  submitForm(): void {
    this.formCheck.formCheck();
    if (!this.formCheck.formIsValid()) { return; }
    if (this.isUpdate) {
      this.update();
      return;
    }
    this.create();
  }

  create(): void {
    const d = this.form.value as ComiteModel;
    this.serviceC.create(d).subscribe(
      data => {
        this.notify.successNotification(data.Mensaje);
        this.formCheck.cleanForm();
        this.completeRegister.emit(data.Data as ComiteModel);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  update(): void {
    const d = this.form.value as ComiteModel;
    this.serviceC.update(this.id, this.form.value).subscribe(
      data => {
        this.notify.successNotification(data.Mensaje);
        this.completeRegister.emit(data.Data as ComiteModel);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  getData(): void {
    this.loading = true;
    const $cargos = this.serviceCC.getAll();
    const $dependencias = this.serviceD.getAll();
    forkJoin([$cargos, $dependencias]).subscribe(
      ([cargos, dependencias]) => {
        this.cargos = cargos;
        this.dependencias = dependencias;
        this.createForm(this.data);
        this.loading = false;
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.createForm(this.data);
        this.loading = false;
      }
    );
  }
}
