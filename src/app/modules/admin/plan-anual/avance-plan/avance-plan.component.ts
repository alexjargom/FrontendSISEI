import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataGrafica, Grafica, HttpResponseModel, NotificationService } from 'src/app/core';
import { PlanAnualService } from 'src/app/core/http/planAnual/plan-anual.service';
import { DataPlanAnulaModel } from 'src/app/core/models/plan-anual.model';

@Component({
  selector: 'app-avance-plan',
  templateUrl: './avance-plan.component.html',
  styleUrls: ['./avance-plan.component.scss']
})
export class AvancePlanComponent implements OnInit {

  data ={} as DataPlanAnulaModel;

  dataGraf: DataGrafica[] =[];
  allGraf: Grafica[] = [];
  
  title = "Avance Plan Anual ";
  view:[number, number] = [400, 200];
   // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';
 
  colorScheme = {
     domain: ['#9370DB', '#87CEFA']
  };

  colorPrincipal={
    domain:['#5BBB41','#D4482A']
  };


  private id :string;
  loading = true;

  constructor(
    private planS: PlanAnualService,
    private notify: NotificationService,
    private route:ActivatedRoute
  ) { 
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    if (this.id){
      this.getData();
      return
    }
    this.notify.errorNotification("Error inesperado");
  }

  getData(){
    this.loading = true;
    this.planS.getAvancePlan(this.id).subscribe(data=>{
      this.data = data;
      this.title = this.title + data.Anio
      this.filterData();
      this.loading = false;
    },(err: HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

  filterData(){
    this.data.Actividades.forEach(act=>{
      const b : DataGrafica = {
        name: 'Cargado',
        value: act.Cargado
      }
      const c : DataGrafica = {
        name: 'Faltante',
        value: act.Faltante
      }
      //asig 1 data graf
      var graf= [];
      graf.push(b);
      graf.push(c);

      //asig graf data
      const gr: Grafica = {
        Nombre: act.Nombre,
        Objetivo: act.Objetivo,
        Data: graf,
      }
      this.allGraf.push(gr);

    });
  }
}