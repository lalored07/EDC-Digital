import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Currency, Filter, InvestmentFilter, ResumenInversionesType } from 'src/models/details.types';
import { Colors } from 'src/theme/colors';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class InversionesService {


  monedas: Currency[] = [
    {
      text: 'Peso mexicano',
      value: 'mxn'
    },
    {
      text: 'Dólar américano',
      value: 'usd'
    },
  ];

  tipoInversion: Filter = {
    text: 'Inversiones Pactadas',
    value: 'pactadas',
  };

  moneda: Currency = {
    text: 'Peso mexicano',
    value: 'mxn'
  };


  chart: EChartsOption = {
    series: [
      {
        data: [],
        type: 'pie',
        radius: [75, 110],
        color: [Colors.darkBlue, Colors.lightGray],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  investmentFilters: InvestmentFilter[] = [];

  resumen = <ResumenInversionesType>{};
  resumenes: ResumenInversionesType[] = [];

  currentIndexTipoInversion!: number;

  movimientos: any[] = [];
  total = 0;

  constructor(private api: ApiService) {}

  initResumen() {
    this.api.getInversionGral().subscribe({
      next: (data: any) => {
        this.resumenes = data.respuesta;
        this.investmentFilters = this.resumenes.map((i) => ({
          text: i.descInversion,
          value: i.claveDivisa,
          ...i,
        }));
        const a = this.resumenes.map(resumen => (resumen.claveDivisa));
        const b = a.filter((item, pos) => a.indexOf(item) == pos);
        const c = b.map((item) => {
          const itemFound = this.resumenes.find((i) => i.claveDivisa === item);
          return {
            text: itemFound ? itemFound.descDivisa : '',
            value: item
          };
        });
        this.monedas = c;
        if (this.monedas.length) {
          this.moneda = this.monedas[0];
        }
        this.setChart(data.respuesta);
        if (this.resumenes.length) {
          this.currentIndexTipoInversion = 0;
          this.total = this.resumenes.map(i => i.impInversion).reduce((a,b) => a + b, 0);
          this.setResumen(this.resumenes[0]);
          this.setMovimientos(this.resumen);
        }
      }
    })
  }

  setResumen(resumen: ResumenInversionesType) {
    this.resumen = resumen;
  }

  setMoneda(currency: Currency) {
    this.moneda = currency;
    this.resumen.claveDivisa = currency.value;
    this.setMovimientos(this.resumen);
  }

  setTipoInversion(filter: Filter, index: number) {
    this.tipoInversion = filter;
    this.currentIndexTipoInversion = index;
    this.setResumen(this.resumenes[index]);
    this.setMovimientos(this.resumenes[index]);
  }

  setMovimientos(resumen: ResumenInversionesType) {
    this.api.getMovimientosInversion({cveDivisa: resumen.claveDivisa, tipo: resumen.descInversion}).subscribe({
      next: (response: any) => {
        this.movimientos = response.respuesta;
      }
    })
  }

  setChart(resumenes: ResumenInversionesType[]) {
    if (resumenes.length && resumenes.length > 0) {
      this.chart = {
        tooltip: {},
        series: [
          {
            data: [resumenes[0].impInversion, resumenes[1].impInversion],
            type: 'pie',
            radius: [75, 110],
            color: [Colors.darkBlue, Colors.lightGray],
            label: {
              position: 'inner',
            }
          },
        ],
      };
    }
  }
}
