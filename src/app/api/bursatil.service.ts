import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filter } from 'src/models/details.types';

@Injectable({
  providedIn: 'root'
})
export class BursatilService {
  marketFilters: Filter[] = [
    {
      text: 'Posición en reporto',
      value: 'REPO',
      altText: 'posición en reporto'
    },
    {
      text: 'Mercado de dinero',
      value: 'CUST',
      altText: 'mercado de dinero'
    },
  ];

  currentMarketFilter: Filter = {
    text: 'Posición en reporto',
    value: 'REPO',
    altText: 'posición en reporto'
  };

  movimientos: any[] = [];

  onFilterSelection = new BehaviorSubject('REPO');

  selectMarketFilter(filter: Filter) {
    this.currentMarketFilter = filter;
    this.onFilterSelection.next(filter.value);
  }

  setMovimientos(movimientos: any[]) {
    this.movimientos = movimientos;
  }

}
