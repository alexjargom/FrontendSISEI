import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {
  DependenciaModel,
  DependenciaService,
  FormCheckService, HttpResponseModel, NotificationService, RecomendacionModel, RecomendacionService
} from '../../../../core';
import {ActivatedRoute, Router} from '@angular/router';
import {forkJoin, Observable} from 'rxjs';

@Component({
  selector: 'app-add-recomendacion',
  templateUrl: './add-recomendacion.component.html',
  styleUrls: ['./add-recomendacion.component.scss']
})
export class AddRecomendacionComponent implements OnInit {

  public form!: FormGroup;
  public loading = true;

  public isUpdate = false;
  private id: string;
  public dependencias: DependenciaModel[] = [];
  selectData:DependenciaModel[]=[];

  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private formCheck: FormCheckService,
              private service: RecomendacionService,
              private serviceD: DependenciaService,
              private notify: NotificationService) {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.isUpdate = true;
    }
  }

  ngOnInit(): void {
    if (this.isUpdate) {
      this.getDataAll();
      return;
    }
    this.getData();
  }

  createForm(data?: RecomendacionModel): void {
    this.form = this.fb.group({
      Tema: this.fb.group({
        Tema: [data?.Tema.Tema, [Validators.required]],
        Descripcion: [data?.Tema.Descripcion, [Validators.required]],
      }),
      Dependencias: [data?.Dependencias, [Validators.required]]
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

  getDataAll(): void {
    this.loading = true;
    const $dependencias = this.serviceD.getAllMin();
    const $recomendacion = this.service.get(this.id);
    forkJoin([$dependencias, $recomendacion]).subscribe(
      ([dependencia, recomendacion]) => {
        this.dependencias = dependencia;
        this.createForm(recomendacion);
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.createForm();
      }
    );
  }

  getData(): void {
    this.loading = true;
    this.serviceD.getAllMin().subscribe(
      e => {
        this.dependencias = e;
        this.createForm();
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.createForm();
      }
    );
  }

  create(): void {
    this.service.create(this.form.value).subscribe(
      data => {
        this.formCheck.cleanForm();
        this.router.navigate(['recomendacion']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  update(): void {
    this.service.update(this.id, this.form.value).subscribe(
      data => {
        this.router.navigate(['recomendacion']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  Cambiooo(e:any[]){
    if(this.containAll(e)){
      var arr = this.joinAlldepIds();
      this.form.controls.Dependencias.setValue(arr);
    }
  }

  containAll(data: string[]): boolean{
    for (const iterator of data) {
      if (iterator == 'all'){
        return true;
      }
    }
    return false;
  }

  joinAlldepIds():string[]{
    var  ids:string[]=[];
    this.dependencias.forEach(e=>{
      ids.push(e.Id);
    });
    return ids;
  }
}
