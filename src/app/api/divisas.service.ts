import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Currency, Pager, ResumenDivisaType } from 'src/models/details.types';
import { Colors } from 'src/theme/colors';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DivisasService {

  divisasFilters: any = {
    fechaMovimiento: false,
    descDetalle: false,
    monto: false,
    tipoCambio: false,
  };

  divisas: any = [];

  currentDivisasCurrency: Currency = {
    text: 'dólar américano',
    value: 'usd'
  };

  divisasCurrencies: Currency[] = [
    {
      text: 'dólar américano',
      value: 'usd'
    },
    {
      text: 'euro',
      value: 'euro'
    },
    {
      text: 'dólar canadiense',
      value: 'cad'
    },
  ];

  resumen = <ResumenDivisaType>{};
  resumenes: ResumenDivisaType[] = [];

  currentDivisasChart: EChartsOption = {
    series: [
      {
        data: [],
        type: 'pie',
        radius: [90, 130],
        color: [Colors.purple, Colors.darkBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  compraDivisasChart: EChartsOption = {
    series: [
      {
        data: [],
        type: 'pie',
        radius: [55, 80],
        color: [Colors.darkBlue, Colors.lightBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  ventaDivisasChart: EChartsOption = {
    series: [
      {
        data: [],
        type: 'pie',
        radius: [55, 80],
        color: [Colors.lightBlue, Colors.darkBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  filteredItems: any[] = [];
  paginador: Pager = {
    paginaActual: 0,
    paginas: [0],
    filterBy: 15,
  };

  constructor(private api: ApiService) {}

  getSpliced(array: any[], pager: Pager) {
    const spliced = [...array].splice(pager.paginaActual * pager.filterBy, pager.filterBy)
    return spliced;
  }

  changePage(page: number) {
    this.paginador.paginaActual = page;
    const spliced = this.getSpliced(this.divisas, this.paginador);
    this.filteredItems = [...spliced];
  }

  setPaginador(count: number) {
    const pages = Math.round(count / this.paginador.filterBy);
    this.paginador.paginas = Array.from(Array(pages).keys());
  }

  selectDivisasCurrency(currency: Currency, index: number) {
    this.currentDivisasCurrency = currency;
    this.resumen = this.resumenes[index];
    this.setCharts(this.resumen);
  }

  setDivisas(divisas: any[]) {
    this.divisas = divisas;
  }


  getDivisas(orderBy: string) {
    const ascDesc = this.divisasFilters[orderBy];
    this.api.getMovimientosDivisas({orderBy, ascDesc: ascDesc ? 'asc': 'desc'}).subscribe({
      next: (data: any) => {
        this.divisasFilters = {
          fechaMovimiento: false,
          descDetalle: false,
          monto: false,
          tipoCambio: false,
        };
        this.divisasFilters[orderBy] = !ascDesc;
        this.setDivisas(data.respuesta);
        this.setPaginador(this.divisas.length);
        const spliced = this.getSpliced(this.divisas, this.paginador);
        this.filteredItems = [...spliced];
      }
    });
  }

  initResumen(respuesta: any[]) {
    this.resumenes = respuesta;
    this.divisasCurrencies = respuesta.map((respuesta) => {
      const currencies: any = {
        'dólar americano': 'usd',
        'dólar canadiense': 'cad',
        'euro': 'euro',
        'peso': 'mxn',
        'libra esterlina': 'gbp'
      };
      return {
        text: respuesta.descDivisa,
        value: currencies[respuesta.descDivisa] || 'other',
      };
    });
    if (this.divisasCurrencies.length) {
      this.currentDivisasCurrency = this.divisasCurrencies[0];
    }
    if (this.resumenes.length) {
      this.resumen = this.resumenes[0];
    }
    return this.resumen;
  }

  setCharts(resumen: ResumenDivisaType) {
    this.currentDivisasChart = {
      tooltip: {},
      series: [
        {
          data: [resumen.importeAbono, resumen.importeCargo],
          type: 'pie',
          radius: [90, 130],
          color: [Colors.purple, Colors.darkBlue],
          label: {
            position: 'inner',
          }
        },
      ],
    };

    this.compraDivisasChart = {
      series: [
        {
          data: [resumen.importeAbono, resumen.importeCargo],
          type: 'pie',
          radius: [55, 80],
          color: [Colors.darkBlue, Colors.lightBlue],
          label: {
            position: 'inner',
          }
        },
      ],
    };

    this.ventaDivisasChart = {
      series: [
        {
          data: [resumen.importeCargo, resumen.importeAbono],
          type: 'pie',
          radius: [55, 80],
          color: [Colors.lightBlue, Colors.darkBlue],
          label: {
            position: 'inner',
          }
        },
      ],
    };

  }
}
