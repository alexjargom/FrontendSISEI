import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentacionModel, DocumentacionService, Documento, FileController, HttpResponseModel, NotificationService} from 'src/app/core';
import { ArchivosAnuales, ArchivosPermanentes } from 'src/app/core/var/variables';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-documentacion',
  templateUrl: './view-documentacion.component.html',
  styleUrls: ['./view-documentacion.component.scss']
})
export class ViewDocumentacionComponent implements OnInit {
  @Input() data:DocumentacionModel[]=[];
  @Input() general:boolean = false;

  loading = true;
  controlPermanente:FileController[]=[];
  controlAnual:FileController[]=[];
  anio:number= 0;
  private fechaInicio = 2019;
  public anios:number[]=[];
  public idDep:string ='';
  
  constructor(
    private notify: NotificationService,
    private router:ActivatedRoute,
    private service: DocumentacionService,
  ) { 
    this.idDep = this.router.snapshot.params.id;
  }

  ngOnInit(): void {
    this.listaAnios();
    if(this.general){
      this.inicializacionData();
    }else{
      this.getListData();
    }
    this.loading = false;
  }

  inicializacionData():void{
    this.loading = true;
   this.data.map(e => {
      e.Archivo = `${environment.serverUrl}/${e.Archivo}`;
    });
    this.controlPermanente= this.asingTiposDocumentacion(ArchivosPermanentes);//asiganado permanentes
    this.controlAnual= this.asingTiposDocumentacion(ArchivosAnuales);
    this.loading = false;
  }


  getListData(): void{
    this.loading = true;
    this.service.getAllPublic(this.anio,this.idDep).subscribe(data => {
        data.map(e => {
          e.Archivo = `${environment.serverUrl}/${e.Archivo}`;
        });
        this.data = data;
        this.controlPermanente= this.asingTiposDocumentacion(ArchivosPermanentes);//asiganado permanentes
        this.controlAnual= this.asingTiposDocumentacion(ArchivosAnuales);
        this.loading = false;
      },
      (err: HttpResponseModel) => {
        this.notify.errorNotification(err.Mensaje);
        this.loading = false;
      }
    );
  }

  asingTiposDocumentacion(tip:Documento[]):FileController[]{
    let dt: FileController[]=[];
    tip.forEach(element => {
      var as = this.getDocumentacionModel(element.tipo);
      if(element.tipo == 'B'|| element.tipo =='E'){
        let fc:FileController={name: element.name,tipo:element.tipo,permitidos:1,files:as }
        dt.push(fc)
      }else{
        let fc:FileController={name: element.name,tipo:element.tipo,permitidos:10,files:as }
        dt.push(fc)
      }
    });
    return dt;
  }

  getDocumentacionModel(tipo:string): DocumentacionModel[]{
    let dat: DocumentacionModel[]=[];
    this.data.forEach(element => {
      if(element.Tipo == tipo){
        dat.push(element);
      }
    });
    return dat;
  }

  changeAnio(e:any){
    this.getListData();
  }

  listaAnios(){
    var now = new Date();
    var anio = now.getFullYear();
    for (var i = anio ; i>= this.fechaInicio;i--){
      this.anios.push(i)
    }
    this.anio = this.anios[0];
  }

}
