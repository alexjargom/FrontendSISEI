import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { EvidenciaModel, HttpResponseModel, NotificationService } from 'src/app/core';
import { DifusionService } from 'src/app/core/http/difusion/difusion.service';
import { EvidenciaService } from 'src/app/core/http/evidencia/evidencia.service';
import { DifusionModel } from 'src/app/core/models/difusion.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-difusion',
  templateUrl: './card-difusion.component.html',
  styleUrls: ['./card-difusion.component.scss']
})
export class CardDifusionComponent implements OnInit {
  @Input() difusion={} as DifusionModel;
  @Input() isPublic:boolean=false;
  fallback = 'data:image/png;base64,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';
  heigth = 600;
  width= 580;
  loading = true
  evidencia: EvidenciaModel[]=[];
  effect = 'scrollx';
  // difusion={} as DifusionModel;
  // control del photogrid
  spamSize:number[]=[]
  numFotos:number = 0;
  evid1:EvidenciaModel[]=[];
  evid2:EvidenciaModel[]=[];
  private tipoimg:string[] =["jpg","gif","bmp","png","jpeg","JPG","GIF","BMP","PNG","JEPG"]
  private tipofile:string[] = ["xlsx","csv","xls","pdf"];

  private id: string;

  constructor(
    private notify: NotificationService,
    private service:EvidenciaService,
    private route: ActivatedRoute,
    private servDi: DifusionService,
    private router:Router
  ) {
    if(this.isPublic){
      this.id = this.difusion.Id;
    }else{
      this.id = this.route.snapshot.params.id
    }
  }

  ngOnInit(): void {
    if(this.isPublic){
      this.id = this.difusion.Id;
      this.getPublicData();
    }else{
      this.id = this.route.snapshot.params.id
      this.getData();
    }
  }

  getData(){
    // this.loading = true
    this.service.getOrigen(this.id).subscribe(data=>{
      data.map(a=>{
        a.Archivo = environment.serverUrl +'/'+ a.Archivo;
      })
      this.numFotos = data.length;
      this.evidencia = data;
      this.crearSpanSize(data.length);
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.loading = false;
      this.notify.errorNotification(err.Mensaje);
    })
  }

  getPublicData(){
    this.loading = true;
    this.service.getOrigenPublic(this.id).subscribe(da=>{
      da.map(a=>{
        a.Archivo = environment.serverUrl+'/'+a.Archivo;
      })
      this.numFotos = da.length;
      this.evidencia = da;
      this.crearSpanSize(da.length);
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.loading = false;
    })
  }


  crearSpanSize(cantidad:number):void{
    this.spamSize = [];
    switch (cantidad) {
      case 1:
        this.spamSize[0]= 23;
        this.evid1 = this.evidencia.slice(0,1);
        break;
      case 2:
        this.spamSize[0]=11;
        this.evid1 = this.evidencia.slice(0,2);
        break;
      case 3:
        this.spamSize[0]=23;
        this.spamSize[1]=11;
        this.evid1 = this.evidencia.slice(0,1);
        this.evid2 = this.evidencia.slice(1,3);
        break;
      case 4:
        this.spamSize[0]=11;
        this.spamSize[1]=11;
        this.evid1 = this.evidencia.slice(0,2);
        this.evid2 = this.evidencia.slice(2,4);
        break
      case 5:
        this.spamSize[0]=11;
        this.spamSize[1]=7;
        this.evid1 = this.evidencia.slice(0,2);
        this.evid2 = this.evidencia.slice(2,5);
        break;
      case 6:
        this.spamSize[0]=7;
        this.spamSize[1]=7;
        this.evid1 = this.evidencia.slice(0,3);
        this.evid2 = this.evidencia.slice(3,6);
        break;
      default:
        break;
    }
  }


  isImg(tipo:string):boolean{
    let index = this.tipoimg.indexOf(tipo)
    if(index == -1){
      return false;
    }
    return true;
  }

  isFile(tipo:string):boolean{
    let index = this.tipofile.indexOf(tipo);
    if (index == -1){
      return false;
    }
    return true;
  }

  eliminar():void{
    this.loading = true;
    this.servDi.delete(this.id).subscribe(data=>{
      this.loading = false;
      this.router.navigate(['difusion']);
    },(err:HttpErrorResponse)=>{
      this.notify.errorNotification(err.message);
      this.loading = false;
    })
  }

}
