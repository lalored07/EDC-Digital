import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Currency, Pager, ResumenSwapsType } from 'src/models/details.types';
import { Colors } from 'src/theme/colors';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SwapsService {

  filters: any = {
    fechaMovimiento: false,
    descDetalle: false,
    tipoCambio: false,
    monto: false,
    abono: false,
    cargo: false,
    saldoSinIntMxp: false,
  };

  swaps: any[] = [];

  currentSwapCurrency = <Currency>{};

  swapsCurrencies: Currency[] = [];

  swapsAutoChart: EChartsOption = {
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
        data: [820, 932],
        type: 'pie',
        radius: [55, 80],
        color: [Colors.darkBlue, Colors.lightBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  resumen = <ResumenSwapsType>{};
  resumenes: ResumenSwapsType[] = [];

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
    const spliced = this.getSpliced(this.swaps, this.paginador);
    this.filteredItems = [...spliced];
  }

  setPaginador(count: number) {
    const pages = Math.round(count / this.paginador.filterBy);
    this.paginador.paginas = Array.from(Array(pages).keys());
  }

  initResumenSwaps() {
    this.api.getSwapsAutoDivisas().subscribe({
      next: (data: any) => {
        this.initResumen(data.respuesta);
      }
    });
  }

  initResumen(respuesta: any[]) {
    this.resumenes = respuesta;
    this.swapsCurrencies = respuesta.map((respuesta) => {
      return {
        text: respuesta.descDivisa,
        value: respuesta.claveDivisa,
      }
    });
    if (this.swapsCurrencies.length) {
      this.currentSwapCurrency = this.swapsCurrencies[0];
      this.getSwaps('');
    }
    if (this.resumenes.length) {
      this.resumen = this.resumenes[0];
      this.setCharts(this.resumen);
    }
    return this.resumen;
  }

  initSwaps() {}

  getSwaps(orderBy: string) {
    const ascDesc = this.filters[orderBy];
    this.api.getMovimientosSwaps({
      orderBy,
      ascDesc: ascDesc ? 'asc': 'desc',
      currency: this.currentSwapCurrency.value
    }).subscribe({
      next: (data: any) => {
        this.filters = {
          fechaMovimiento: false,
          descDetalle: false,
          tipoCambio: false,
          monto: false,
          abono: false,
          cargo: false,
          saldoSinIntMxp: false,
        };
        this.filters[orderBy] = !ascDesc;
        this.setSwaps(data.respuesta);
        this.setPaginador(this.swaps.length);
        const spliced = this.getSpliced(this.swaps, this.paginador);
        this.filteredItems = [...spliced];
      }
    });
  }

  setSwaps(swaps: any[]) {
    this.swaps = swaps;
  }

  setCharts(resumen: ResumenSwapsType) {
    this.swapsAutoChart = {
      series: [
        {
          data: [resumen.saldoInicial, resumen.montoPactado],
          type: 'pie',
          radius: [90, 130],
          color: [Colors.purple, Colors.darkBlue],
          label: {
            position: 'inner',
          }
        },
      ],
    };
  }

  selectSwapCurrency(currency: Currency, index: number) {
    this.currentSwapCurrency = currency;
    this.resumen = this.resumenes[index];
    this.setCharts(this.resumen);
    this.getSwaps('');
  }

}
