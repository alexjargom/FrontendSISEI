import { UserModel } from '../../../../core/models/user.model';
import { HttpResponseModel } from '../../../../core/models/http.response.model';
import { TipoUsuario } from '../../../../core/var/variables';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/http/user/user.service';
import { FormCheckService, NotificationService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { ComiteModel, ComiteService } from 'src/app/core';

@Component({
  selector: 'app-add-usuarios',
  templateUrl: './add-usuarios.component.html',
  styleUrls: ['./add-usuarios.component.scss']
})
export class AddUsuariosComponent implements OnInit {
  public form!: FormGroup;
  public tipoUsuario: any[] = [];
  public loading = true;
  public isUpdate = false;
  private id: string;
  public comitesLibres:ComiteModel[]=[];
  public tip = TipoUsuario;
  constructor(private fb: FormBuilder, private userS: UserService, private formCheck: FormCheckService,
              private router: Router,
              private route: ActivatedRoute,
              private notify: NotificationService,
              private comiteS: ComiteService) {
                this.id = this.route.snapshot.params.id;
                if (this.id) {
                  this.isUpdate = true;
                }
              }

  ngOnInit(): void {
    this.listTipoUsuario();
    this.getComitesSinUsuario();
    if (this.isUpdate) {
      this.get();
      return;
    }
    this.createForm();
  }

  createForm(data?: UserModel): void {
    this.form = this.fb.group({
      Usuario: [data?.Usuario , [Validators.required]],
      Contrasena: [null, [Validators.required]],
      TipoUsuarioId: [data?.TipoUsuarioId, [Validators.required]],
      ComiteId: [data?.ComiteId, [Validators.required]]
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
    this.userS.get(this.id).subscribe(
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
    this.userS.create(this.form.value).subscribe(
      data => {
        this.formCheck.cleanForm();
        this.router.navigate(['usuarios']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  update(): void {
    this.userS.update(this.id, this.form.value).subscribe(
      data => {
        this.router.navigate(['usuarios']);
      },
      (err: HttpResponseModel) => this.notify.errorNotification(err.Mensaje)
    );
  }

  listTipoUsuario(): void {
    this.tipoUsuario.push( { value: TipoUsuario.Admin , label: 'Administrador' });
    this.tipoUsuario.push( {value: TipoUsuario.Dependencia, label:'Dependencia'});
    // if (this.userS.getCurrentUser().TipoUsuarioId as TipoUsuario === TipoUsuario.Root ){
    //   this.tipoUsuario.push( { value: TipoUsuario.Root , label: 'Root' });
    // }
  }

  getComitesSinUsuario(){
    this.comiteS.getComitesSinUsuario().subscribe(data=>{
      this.comitesLibres = data;
      this.comitesLibres.map(ac=>{
        ac.Nombre = ac.Nombre+' '+ac.PrimerApellido+' '+ac.SegundoApellido +' /'+ ac.Dependencia.Nombre;
      })
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
    })
  }

  changeSelectTipo(tipo:string){
    if (tipo === this.tip.Dependencia){
      this.form.controls.ComiteId.setValidators(Validators.required);
    }else{
      this.form.controls.ComiteId.clearValidators();
    }
  }

}
