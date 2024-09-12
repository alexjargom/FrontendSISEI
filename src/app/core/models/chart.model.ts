export interface DataGrafica {
    name: string;
    value: number;
}
  
export interface Grafica{
    Nombre: string;
    Objetivo: string;
    Data: DataGrafica[];
}

export interface QuejaGrafica{
    name: string;
    series: DataGrafica[];
}