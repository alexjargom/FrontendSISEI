import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormatoMaterial } from 'src/app/core';
import { TipoFormato } from 'src/app/core/var/variables';
import { archivos } from './archivos_content';

@Component({
  selector: 'app-material-apoyo',
  templateUrl: './material-apoyo.component.html',
  styleUrls: ['./material-apoyo.component.scss']
})
export class MaterialApoyoComponent implements OnInit {
  tipoFormato = TipoFormato;
  public archivos = archivos
  
  currentIndex = 0;
  currentItem: FormatoMaterial = this.archivos[ this.currentIndex ];

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  onClickPlaylistItem(item: FormatoMaterial,index:number) {
    this.currentIndex = index;
    this.currentItem = item;
  }

  redirigirVista(item:FormatoMaterial, index:number){
    this.route.navigate(['material/ver/'+index])
  }

}
