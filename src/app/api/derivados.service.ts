import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { BehaviorSubject, Subject } from 'rxjs';
import { DerivadosTotales, DerivadoType, ResumenDerivadosType } from 'src/models/details.types';
import { Colors } from 'src/theme/colors';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DerivadosService {

  nocionalVigentePesos: EChartsOption = {
    series: [
      {
        data: [],
        type: 'pie',
        radius: [75, 110],
        color: [Colors.lightBlue, Colors.grayBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  nocionalVigenteDolares: EChartsOption = {
    series: [
      {
        data: [],
        type: 'pie',
        radius: [75, 110],
        color: [Colors.lightBlue, Colors.grayBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  tiposDerivados = [
    {
      value: 'derivadosForward',
      text: 'Forward',
    },
    {
      value: 'derivadosOpciones',
      text: 'Opciones',
    },
    {
      value: 'derivadosOpcCapFloor',
      text: 'Opciones Capital',
    },
    {
      value: 'derivadosOpcBarrera',
      text: 'Opciones Barrera',
    },
    {
      value: 'derivadosSwaps',
      text: 'Swaps',
    },
    {
      value: 'derivadosCrossSwaps',
      text: 'Cross Swaps',
    },
  ];

  allowedDerivados: any[] = [];

  allDerivados: any = {};

  derivados: DerivadoType[] = [];
  resumen = <ResumenDerivadosType>{};
  resumenes: ResumenDerivadosType[] = [];

  derivadosMixed: Array<{
    monedaRefer: string | undefined,
    items: DerivadoType[],
    cantSubyacente?: number,
    impValuacionMxn?: number,
    impNocionVigente?: number,
    impValuacionAct?: number,
    impNocionPactado?: number,
  }> = [];

  derivativeTypeText = '';

  derivadosChanges$: Subject<string> = new Subject();

  totales = <DerivadosTotales>{};

  constructor (private api: ApiService) {}

  setTotales(respuesta: any[]) {
    if (respuesta && respuesta.length) {
      this.totales = respuesta[0];
      console.log(this.totales);
    }
  }

  setDerivadosTitle(derivativeTypeValue: string) {
    const derivativeType =  this.tiposDerivados.find(i => i.value === derivativeTypeValue);
    this.derivativeTypeText = derivativeType ? derivativeType.text : '';
  }

  initResumen(respuesta: any[]) {
    this.resumenes = respuesta;
    if (this.resumenes.length) {
      this.resumen = this.resumenes[0];
    }
    return this.resumen;
  }

  setDerivados(derivados: DerivadoType[]) {
    this.derivados = derivados;
    const a = this.derivados.map(i => i.monedaRefer);
    const b = a.filter((item, pos) => a.indexOf(item) == pos);
    this.derivadosMixed = b.map(monedaRefer => {
      const items = this.derivados.filter(i => i.monedaRefer === monedaRefer);
      const cantSubyacente = this.derivados.map(i => i.cantSubyacente || 0).reduce((a: number, b: number) => a + b, 0);
      const impValuacionMxn = this.derivados.map(i => i.impValuacionMxn || 0).reduce((a: number, b: number) => a + b, 0);
      const impNocionVigente = this.derivados.map(i => i.impNocionVigente || 0).reduce((a: number, b: number) => a + b, 0);
      const impValuacionAct = this.derivados.map(i => i.impValuacionAct || 0).reduce((a: number, b: number) => a + b, 0);
      const impNocionPactado = this.derivados.map(i => i.impNocionPactado || 0).reduce((a: number, b: number) => a + b, 0);
      return {
        monedaRefer,
        items,
        cantSubyacente,
        impValuacionMxn,
        impNocionVigente,
        impValuacionAct,
        impNocionPactado,
      }
    });
  }

  initDerivados() {
    this.api.getResumenDerivados().subscribe({
      next: (data: any) => {
        const resumen = this.initResumen(data.respuesta);
        console.log(resumen);
        this.setCharts(resumen);
      },
    });
  }

  getDerivados(tipoDerivado: string) {
    this.api.getTiposDerivados().subscribe({
      next: (data: any) => {
        const allowed = Object.keys(data.respuesta);
        const allowedMap = allowed.map((item) => {
          const entry = this.tiposDerivados.find((j) => j.value === item);
          return entry;
        });
        this.allowedDerivados = allowedMap;
        this.allDerivados = data.respuesta;
      }
    });
  }

  getCurrentDerivados(tipoDerivado: string) {
    if (this.allDerivados && this.allDerivados[tipoDerivado]) {
      this.setDerivados(this.allDerivados[tipoDerivado]);
    } else {
      this.setDerivados([]);
    }
  }

  setCharts(resumen: ResumenDerivadosType) {
    this.nocionalVigentePesos = {
      series: [
        {
          data: [resumen.saldoGarantiasMxn, resumen.valuacionMxn],
          type: 'pie',
          radius: [75, 110],
          color: [Colors.lightBlue, Colors.grayBlue],
          label: {
            position: 'inner',
          }
        },
      ],
    };
    this.nocionalVigenteDolares = {
      series: [
        {
          data: [resumen.saldoGarantiasMxn * resumen.tipoCambio, resumen.valuacionMxn * resumen.tipoCambio],
          type: 'pie',
          radius: [75, 110],
          color: [Colors.lightBlue, Colors.grayBlue],
          label: {
            position: 'inner',
          }
        },
      ],
    };
  }

}
