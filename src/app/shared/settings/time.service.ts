import { Injectable } from '@angular/core';

export enum Days {
  DOMINGO = 0,
  LUNES = 1,
  MARTES = 2,
  MIERCOLES = 3,
  JUEVES = 4,
  VIERNES = 5,
  SABADO = 6,
}


export class TimeModel {
  hrs: number;
  min: number;
  seg: number;
  constructor(h: number, m: number, s: number) {
    this.hrs = h;
    this.min = m;
    this.seg = s;
  }
}

export const DaysList = [{ id: 0, name: 'Domingo' },
{ id: 1, name: 'Lunes' }, { id: 2, name: 'Martes' },
{ id: 3, name: 'Miercoles' }, { id: 4, name: 'Jueves' },
{ id: 5, name: 'Viernes' }, { id: 6, name: 'Sabado' }];


@Injectable({
  providedIn: 'root'
})
export class TimeService {
  constructor() { }

  public dateEquals(first:Date, second: Date): boolean {
    return (first.getTime() === second.getTime());
  }

  public diaSemana(datef: string, params: string): string {
    const date = new Date(datef.replace(/-+/g, '/'));
    let options;
    switch (params) {
      case 'day-month-year':
        options = { year: 'numeric', month: 'long', day: 'numeric' };
        break;
      case 'month-year':
        options = { year: 'numeric', month: 'long' };
        break;
      case 'day':
        options = { weekday: 'long' };
        break;
      default:
        options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        break;
    }
    return date.toLocaleDateString('es-MX', options);
  }

  public convertDate(date: Date | string): Date {
    return date instanceof Date ? date : new Date(date);
  }

  public formatHours12(dateF: Date | string): string {
    let strTime = '';
    if (dateF) {
      const date = this.convertDate(dateF);
      let hours = date.getHours();
      let minutes: any = date.getMinutes();
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      strTime = hours + ':' + minutes + ' ' + ampm;
    }
    return strTime;
  }

  public subDateToDay(restar: string): string {
    let res = '';
    const today = new Date();
    const dif = this.subDates(today, restar);
    if (dif === '0') {
      const r = new Date(restar);
      res = this.subDatesHour(today, r);
    } else {
      res = dif + ' Dias';
    }

    return res;
  }

  public subDatesHour(fecha: Date, restar: Date): string {
    let res = '';
    let minutos = (+fecha - +restar) / 1000 / 60;
    const horas = Math.floor(minutos / 60);
    minutos = Math.floor(minutos % 60);
    if (horas === 0) {
      res = this.prefijo(minutos) + ' minutos.';
    } else {
      res = this.prefijo(horas) + ':' + this.prefijo(minutos) + ' horas.';
    }

    return res;
  }

  public subDates(fecha: string | number | Date, restar: string): string {
    let res = '';
    const a = new Date(fecha);
    const b = new Date(restar);
    if (this.isValidDate(a) && this.isValidDate(b)) {
      console.log(a);
      console.log(b);
      const diff = a.getTime() - b.getTime();
      console.log('dif  => ', diff);

      res = Math.round(diff / (1000 * 60 * 60 * 24)) + '';
    }
    return res;
  }

  public subDatesReturnTS(fecha:Date, restar: string): number|undefined {
    const a = new Date(fecha);
    const b = new Date(restar);
    if (this.isValidDate(a) && this.isValidDate(b)) {
      const diff = a.getTime() - b.getTime();
      return diff;
    }
    return undefined;
  }

  public subDatesYears(fecha: string | number | Date, restar: string): string {
    let res = '';
    const a = new Date(fecha);
    const b = new Date(restar);
    if (this.isValidDate(a) && this.isValidDate(b)) {
      const diff = a.getTime() - b.getTime();
      res = Math.floor(diff / (1000 * 60 * 60 * 24 * 360)) + '';
    }
    return res;
  }


  calculateAge(birthday: Date) {
    if (this.isValidDate(birthday)) {
      const birthday_date = new Date(birthday);
      const ageDifMs = Date.now() - birthday_date.getTime();
      const ageDate = new Date(ageDifMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    } else { return 0; }
  }

  public restarDias(fecha: Date, dias: number): Date {
    fecha.setDate(fecha.getDate() - dias);
    return fecha;
  }

  public sumarDias(fecha: Date, dias: number): Date {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

  public formatMonth(date:Date): string {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    return day + ' de ' + monthNames[monthIndex];
  }

  public formatDateComplete(dateF: string | Date): string {
    let strTime = '';
    if (dateF) {
      const date = this.convertDate(dateF);
      const monthNames = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ];
      const dayN = date.getDay();
      const daylistItem = DaysList.find(e => e.id === dayN);
      const day = date.getDate();
      const year = date.getFullYear();
      const monthIndex = date.getMonth();
      strTime = daylistItem?.name + ' ' + day + ' de ' + monthNames[monthIndex] + ' del ' + year;
    }
    return strTime;
  }

  public formatDateAcronyms(dateF: string | Date): string {
    let strTime = '';
    if (dateF) {
      const date = this.convertDate(dateF);
      let day = date.getDate() + '';
      let month = (date.getMonth() + 1) + '';
      const year = date.getFullYear();
      if (day.length < 2) {
        day = '0' + day;
      }
      if (month.length < 2) {
        month = '0' + month;
      }
      strTime = year + '-' + month + '-' + day;

    }
    return strTime;
  }

  msToTime(s: number) {
    console.log(s);

    // Pad to 2 or 3 digits, default is 2
    function pad(n: string, z?: number) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    console.log(hrs, mins, secs);


    return new TimeModel(hrs, mins, secs)

    // pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
  }

  public formatDateCompleteWithHour(dat: Date | string) {
    return this.formatDateComplete(dat) + ' ' + this.formatHours12(dat);
  }

  public isValidDate(d:Date): boolean {
    return d instanceof Date && !isNaN(Number(d));
  }

  public prefijo(num:number) {
    return num < 10 ? '0' + num : num;
  }

  getMonth(id: number): string {
    const MonthNames = [
      'ENE',
      'FEB',
      'MAR',
      'ABR',
      'MAY',
      'JUN',
      'JUL',
      'AGOS',
      'SEPT',
      'OCT',
      'NOV',
      'DIC'
    ];

    return MonthNames[id - 1];
  }
}