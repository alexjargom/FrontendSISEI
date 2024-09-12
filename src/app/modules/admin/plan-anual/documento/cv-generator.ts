import { DatePipe } from "@angular/common";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  PageOrientation,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
// import { readFile, readFileSync } from 'fs'
// import { imageFile } from '../../../../../assets/images/logoOax';
import { ActividadPlanModel } from "src/app/core/models/plan-anual.model";

export class DocumentCreator {

  private data: ActividadPlanModel[];
  private anio: number;
  private dependencia:string;
  private presidente:string;
  private sejecutivo:string;
  private tableDeleteBorder={
    top: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
      bottom: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
      left: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
      right: {style: BorderStyle.NONE, size: 0, color: "FFFFFF"},
  }
  constructor(private pipe:DatePipe,dat:ActividadPlanModel[],an:number,presidente:string, sejecutivo:string,dep?:string){
    this.data = dat;
    this.anio= an;
    this.dependencia = dep? dep:'';
    this.presidente = presidente;
    this.sejecutivo = sejecutivo;
  }

  public create(): Document {
    const doc = new Document({
        sections: [
            {
              properties:{
                page:{
                  size:{
                    orientation: PageOrientation.LANDSCAPE
                  }
                }
              },
              children: [
                  // this.createImageOaxaca(),
                  new Paragraph({alignment: AlignmentType.CENTER,
                    children:[ new TextRun({text: this.dependencia,bold:true})]
                  }),
                  new Paragraph({ alignment: AlignmentType.CENTER, 
                    children:[ new TextRun({ text:"Plan Anual "+this.anio ,bold:true})] 
                  }),
                  this.createTable(),
                  new Paragraph({ text: " ",alignment: AlignmentType.CENTER, }),
                  this.createTableFirmas(),
              ],
            },
        ],
    });
    return doc;
  }

  createTable():Table{
    var ren=this.createRenglones()
    const table = new Table({
      columnWidths: [5505,8500],
      rows: ren ,
    });
    return table;
  }

  createRenglones():TableRow[]{
    var renglones:TableRow[]= [];
    var cab = new TableRow({
      children: this.createCabecerasTabla(),
      tableHeader: true,
      cantSplit: true,
    })
    renglones.push(cab);
    this.data.forEach(element =>{
      let r = this.createCellOfRow(element)
      renglones = renglones.concat(r);
    });
    return renglones;
  }

  createCellOfRow(act:ActividadPlanModel): TableRow[]{
    var fecha= this.pipe.transform( act.Fecha ,'EEEE, MMMM d, y' );
    var fecha2 = fecha? fecha:'';
    var fechaFin = this.pipe.transform(act.FechaConclusion,'EEEE, MMMM d, y' );
    var fechaFin2 = fechaFin? fechaFin:'';
    var rows:TableRow[]=[];
    // var span = acs.length; 
    var acts = this.createBulletPoint(act.Actividades);
    var factor = this.createBulletPoint(act.FactorRiesgo);
    var row =new TableRow({
      children:[
        new TableCell({
          children: [new Paragraph(act.Nombre)],
          // rowSpan: span,
        }),
        new TableCell({
          children: [new Paragraph(act.Objetivo)],
          // rowSpan: span,
        }),
        new TableCell({
          children: [new Paragraph(act.Meta)],
          // rowSpan:span,
        }),
        // new TableCell({
        //   children: [new Paragraph(act.Indicador)],
        //   // rowSpan:span,
        // }),
        new TableCell({
          children: acts,
        }),
        new TableCell({
          children: [new Paragraph( fecha2 )],
          // rowSpan: span,
        }),
        new TableCell({
          children: [new Paragraph( fechaFin2 )],
          // rowSpan: span,
        }),
        new TableCell({
          children: [new Paragraph('')],
          // rowSpan: span,
        }),
        new TableCell({
          children: factor,
          // rowSpan: span,
        })
      ],
      cantSplit: true,
    });

    // acs.forEach((el,index) => {
    //   if(index==0){
        
    //   }else{
    //     var row =new TableRow({
    //       children:[
    //         new TableCell({
    //           children: [new Paragraph(el)]
    //         }),
    //       ],
    //       cantSplit: true,
    //     });
    //   }
    // });
    rows.push(row);

    return rows;
  }

  createBulletPoint(data:string):Paragraph[]{
    var acs: string[]
    if (data == '') {
      acs =  data.split(',');
    }else{
      acs= JSON.parse(data)
    }
    var bullect: Paragraph[] =[];
    acs.forEach(element=>{
      bullect.push(
        new Paragraph({
          text: element,
          bullet:{
            level:0,
          }
        })
      )
    });
    return bullect;
  }

  createCabecerasTabla():TableCell[]{
    var cab: TableCell[]=[
      new TableCell({
        children: [new Paragraph({
          children: [new TextRun({text:'Temas',bold:true})]
        })]
      }),
      new TableCell({
        children: [new Paragraph({
          children:[ new TextRun({ text:"Objetivo",bold:true})]
        })]
      }),
      new TableCell({
        children: [new Paragraph({
          children:[ new TextRun({text:"Metas",bold:true})]
        })]
      }),
      // new TableCell({
      //   children: [new Paragraph({
      //     children:[ new TextRun({ text:"Indicador",bold:true})]
      //   })]
      // }),
      new TableCell({
        children: [new Paragraph({
          children:[ new TextRun({text:"Actividades",bold:true})]
        })]
      }),
      new TableCell({
        children: [new Paragraph({
          children:[new TextRun({ text:"Fecha Inicio",bold:true})]
        })]
      }),
      new TableCell({
        children: [new Paragraph({
          children:[new TextRun({text:"Fecha Conclusión",bold:true})]
        })]
      }),
      new TableCell({
        children: [new Paragraph({
          children:[new TextRun({text:"Mecanismos de Verificación",bold:true})]
        })]
      }),
      new TableCell({
        children: [new Paragraph({
          children:[new TextRun({ text:"Factor de Riesgo",bold:true})]
        })]
      }),
    ]
    return cab;

  }

  createTableFirmas():Table{
    const table = new Table({
      columnWidths: [5505,8500],
      rows: [
        new TableRow({
          children:[
            new TableCell({
                borders: this.tableDeleteBorder,
              children:[new Paragraph({text:'ELABORÓ', alignment: AlignmentType.CENTER})]
            }),
            new TableCell({
              borders: this.tableDeleteBorder,
              children:[new Paragraph({text:'Vo. Bo.', alignment: AlignmentType.CENTER})]
            })
          ]
        }),
        new TableRow({
          children:[
            new TableCell({
              borders:this.tableDeleteBorder,
              children:[new Paragraph({text:'______________________________________', alignment: AlignmentType.CENTER})]
            }),
            new TableCell({
              borders:this.tableDeleteBorder,
              children:[new Paragraph({text:'______________________________________', alignment: AlignmentType.CENTER})]
            })
          ]
        }),
        new TableRow({
          children:[
            new TableCell({
              borders:this.tableDeleteBorder,
              children:[new Paragraph({text: 'SECRETARIO EJECUTIVO', alignment: AlignmentType.CENTER})]
            }),
            new TableCell({
              borders:this.tableDeleteBorder,
              children:[new Paragraph({text: 'PRESIDENTE', alignment: AlignmentType.CENTER})]
            })
          ]
        }),
        new TableRow({
          children:[
            new TableCell({
              borders:this.tableDeleteBorder,
              children:[new Paragraph({text: this.sejecutivo, alignment: AlignmentType.CENTER})]
            }),
            new TableCell({
              borders:this.tableDeleteBorder,
              children:[new Paragraph({text: this.presidente, alignment:AlignmentType.CENTER})]
            })
          ]
        })
      ] ,
    });
    return table;
  }

  // createImageOaxaca(): Paragraph{
  //   return new Paragraph({
  //     children:[
  //       new ImageRun({
  //         // data: logoOax,
  //         data: readFileSync('./assets/images/logoOax.png'),
  //         // data: Buffer.from()
  //         transformation:{
  //           width:200,
  //           height: 200,
  //         }
  //       })
  //     ] 
  //   });
  // }

}
// ./assets/images/logoOax.png