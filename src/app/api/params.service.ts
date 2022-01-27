import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {
  contrato = '1133586';
  periodo = '202010';
  periodos = [
    {
      value: 202010,
      text: 'Octubre 2020'
    },
    {
      value: 202107,
      text: 'Julio 2021'
    },
    {
      value: 202108,
      text: 'Agosto 2021'
    },
    {
      value: 202109,
      text: 'Septiembre 2021'
    },
    {
      value: 202110,
      text: 'Octubre 2021'
    },
    {
      value: 202111,
      text: 'Noviembre 2021'
    },
    {
      value: 202112,
      text: 'Diciembre 2021'
    },
    {
      value: 202201,
      text: 'Enero 2022'
    }
  ];
}
