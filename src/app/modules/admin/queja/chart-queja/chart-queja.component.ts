import { Component, OnInit } from '@angular/core';
import { concat, forkJoin } from 'rxjs';
import { DataChart, DataGrafica, HttpResponseModel, NotificationService, QuejaChart, QuejaGrafica, QuejaService } from 'src/app/core';
import { TipoQueja } from 'src/app/core/var/variables';
import { PeriodoPipe } from 'src/app/shared/pipes/periodo.pipe';

@Component({
  selector: 'app-chart-queja',
  templateUrl: './chart-queja.component.html',
  styleUrls: ['./chart-queja.component.scss']
})
export class ChartQuejaComponent implements OnInit {
  multi: any[]=[];
  view: [number,number] = [1200, 500];

  loading= true;
  data={} as DataChart;
  dataQueja = {} as DataChart;
  dataDenuncia = {} as DataChart;
  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Año';
  yAxisLabel: string = 'No. Quejas';
  timeline: boolean = true;
  legTitulo ="Dependencias"

  colorScheme = {
    domain: ['#8A2BE2','#A52A2A','#DEB887','#5F9EA0','#7FFF00',
    '#D2691E','#FF7F50','#6495ED','#FFF8DC','#DC143C','#00008B','#008B8B','#B8860B','#A9A9A9','#006400','#BDB76B','#8B008B','#556B2F',
    '#FF8C00','#9932CC','#8B0000','#E9967A','#8FBC8F','#483D8B','#2F4F4F','#00CED1','#9400D3','#FF1493','#00BFFF','#696969','#1E90FF','#B22222','#FFFAF0',
    '#228B22','#DCDCDC','#F8F8FF','#FFD700','#DAA520','#808080','#008000','#ADFF2F','#F0FFF0','#FF69B4','#CD5C5C','#4B0082','#FFFFF0','#F0E68C',
    '#E6E6FA','#FFF0F5','#7CFC00','#FFFACD','#ADD8E6','#F08080','#E0FFFF','#FAFAD2','#D3D3D3','#90EE90','#FFB6C1','#FFA07A','#20B2AA','#87CEFA',
    '#778899','#B0C4DE','#FFFFE0','#00FF00','#32CD32','#FAF0E6','#FF00FF','#800000','#66CDAA','#0000CD','#BA55D3','#9370D8','#3CB371','#7B68EE','#00FA9A',
    '#48D1CC','#C71585','#191970','#F5FFFA','#FFE4E1','#FFE4B5','#FFDEAD','#000080','#FDF5E6','#808000','#6B8E23','#FFA500','#FF4500','#DA70D6','#EEE8AA',
    '#98FB98','#AFEEEE','#D87093','#FFEFD5','#FFDAB9','#CD853F','#FFC0CB','#DDA0DD','#B0E0E6','#800080','#FF0000','#BC8F8F','#4169E1','#8B4513','#FA8072',
    '#F4A460','#2E8B57','#FFF5EE','#A0522D','#C0C0C0','#87CEEB','#6A5ACD','#708090','#FFFAFA','#00FF7F','#4682B4','#D2B48C','#008080','#D8BFD8','#FF6347',
    '#40E0D0','#EE82EE','#F5DEB3','#FFFFFF','#F5F5F5','#FFFF00','#9ACD32','#F0F8FF','#FAEBD7','#00FFFF','#7FFFD4','#F0FFFF','#F5F5DC','#FFE4C4','#000000','#FFEBCD','#0000FF']

  };

  selectFiltro = 'a';
  selectTipo = 'a';
  constructor(
    private qservice:QuejaService,
    private notify: NotificationService,
    private pip : PeriodoPipe
  ) { 
    // Object.assign(this, { multi });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(val?:string, tipo?:string):void{
    this.loading = true;
    this.qservice.getDataChartQueja(tipo,val).subscribe(d=>{
      this.data = this.removeSeriesNull(d);
      this.multi = this.parseData(this.data);
      this.notify.successNotification("Info consultado correctamente");
      this.changeAxisTitle();
      this.loading = false;
    },(err:HttpResponseModel)=>{
      this.notify.errorNotification(err.Mensaje);
      this.loading = false;
    })
  }

  onSelect(data:any): void {
  }

  onActivate(data:any): void {
  }

  onDeactivate(data:any): void {
  }

  removeSeriesNull(dat: DataChart):DataChart{
    var d = dat.Data
    var resp:DataChart = {
      Data:[]
    };
    d.forEach(dep => {
        if (dep.Series.length > 0) {
          resp.Data.push(dep)
        }
    });
    return resp
  }

  parseData(data : DataChart): any[]{
    var multi:any[] = [];
    var arr = data.Data
    arr.forEach(actual => {
      var dg:QuejaGrafica={
        name: actual.Name,
        series: this.parseSeries(actual.Series)
      }
      multi.push(dg);
    });
    return multi;
  }

  parseSeries(info:QuejaChart[]):DataGrafica[]{
    var resp:DataGrafica[]=[];
    info.forEach(element => {
      var dat:DataGrafica = {
        value: element.Value,
        name: element.Periodo? element.Name+' '+ this.pip.transform(element.Periodo): element.Name
      };
      resp.push(dat);
    });
    return resp;
  }

  selectChange():void{
    this.getData(this.selectFiltro, this.selectTipo);
  }

  changeAxisTitle(){
    if(this.selectFiltro === 'a' ) {
      this.xAxisLabel = 'Año';
    }else{
      this.xAxisLabel = "Trimestre";
    }
    if(this.selectTipo === TipoQueja.Queja){
      this.yAxisLabel = 'No. Quejas';
    }else{
      this.yAxisLabel = 'No. Denuncias';
    }
  }

}
