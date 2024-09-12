import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  constructor() {}

  configHeightTable(h: PercentageHeight = PercentageHeight.DEFAULT): object {
    const size = window.innerHeight;
    const formula = Math.trunc(size / 100 * h ) + 'px';
    return { y: formula, x: '1100px' };
  }
}

export enum PercentageHeight {
  LITTLE = 45,
  SMALL = 50,
  DEFAULT = 60,
  BIG = 70
}
