import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core';
import { ReporteService } from 'src/app/core/http/reporte/reporte.service';
import { ReporteModelView } from 'src/app/core/models/reporte.model';

@Component({
  selector: 'app-index-reportes',
  templateUrl: './index-reportes.component.html',
  styleUrls: ['./index-reportes.component.scss']
})
export class IndexReportesComponent implements OnInit {
  
  data: ReporteModelView[] = [
    {
      Nombre: 'Reporte General',
      Descripcion:'Reporte general con informacion generalizado de todas las depenencias',
      Tipo:'general'// estatico no mover esto 
    }
  ];
  constructor(
    private notify: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
  }

  navigate(rep :ReporteModelView){
    if (rep.Tipo === 'general'){
      this.router.navigate(['reportes', 'principal'])
    }
    return 
  }

  

}
