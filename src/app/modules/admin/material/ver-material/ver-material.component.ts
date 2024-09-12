import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { viewerType } from 'ngx-doc-viewer/document-viewer.component';
import { FormatoMaterial } from 'src/app/core';
import { TipoFormato } from 'src/app/core/var/variables';
import { archivos } from '../material-apoyo/archivos_content';

@Component({
  selector: 'app-ver-material',
  templateUrl: './ver-material.component.html',
  styleUrls: ['./ver-material.component.scss']
})
export class VerMaterialComponent implements OnInit {
  private datos = archivos;
  private id:number;
  public actual: FormatoMaterial = {} as FormatoMaterial;
  tipos = TipoFormato
  viewer: viewerType = 'url';
  constructor(private route:ActivatedRoute) { 
    this.id =  route.snapshot.params.id;
    // if(this.id){
    //   this.actual = this.datos[this.id]
    // }
    
  }

  ngOnInit(): void {
    if(this.id){
        this.actual = this.datos[this.id]
    }
  }



}
