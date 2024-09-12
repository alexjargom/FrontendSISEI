import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DisabledTimeFn} from 'ng-zorro-antd/date-picker';
import {FormCheckService, HttpResponseModel, NotificationService, SesionModel, SesionService} from '../../../../core';
import {ActivatedRoute, Router} from '@angular/router';
import setHours from 'date-fns/setHours';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';

@Component({
  selector: 'app-add-sesion',
  templateUrl: './add-sesion.component.html',
  styleUrls: ['./add-sesion.component.scss']
})
export class AddSesionComponent implements OnInit {

  public form!: FormGroup;
  public loading = true;

  timeDefaultValue = setHours(new Date(), 0);
  today = new Date().setHours(24);

  public isUpdate = false;
  private id: string;
  private reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
  constructor(private fb: FormBuilder, private formCheck: FormCheckService,
              private notify: NotificationService,
              private service: SesionService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
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

  createForm(data?: SesionModel): void {
    this.form = this.fb.group({
      Tema: [data?.Tema, [Validators.required]],
      Descripcion: [data?.Descripcion, [Validators.required]],
      Fecha: [data?.Fecha, [Validators.required]],
      Lugar: [data?.Lugar, [Validators.required]],
      Enlace: [data?.Enlace, []],
      Tipo : [data?.Tipo,[Validators.required]],
    });
    this.formCheck.formInit(this.form);
    this.loading = false;
  }

  submitForm(): void {
    this.formCheck.formCheck();
    if (!this.formCheck.formIsValid()) {
      return;
    }
    if (this.isUpdate) {
      this.update();
      return;
    }
    this.create();
  }

  create(): void {
    const timeZone = 'Europe/Berlin'
    const d = this.form.value as SesionModel;
    this.service.create(d).subscribe(
      data => {
        this.formCheck.cleanForm();
        this.router.navigate(['sesion']);
      }, (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );

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

  update(): void {
    this.service.update(this.id, this.form.value).subscribe(
      data => {
        this.router.navigate(['sesion']);
      }, (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
      }
    );
  }

  // controlador de gecha
  range(start: number, end: number): number[] {
    const result: number[] = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(this.today, current) > 0;
  }

  disabledDateTime: DisabledTimeFn = () => {
    const tempra = this.range(0, 24).splice(0, 7);
    const tarde = this.range(0, 24).splice(23, 10);
    const todas = tempra.concat(tarde);
    return {
      nzDisabledHours: () => todas,
      nzDisabledMinutes: () => this.range(0, 0),
      nzDisabledSeconds: () => this.range(0, 0)
    };
  }

}
