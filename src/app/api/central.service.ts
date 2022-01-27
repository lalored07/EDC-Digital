import { Injectable } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Pager, ResumenCentral } from 'src/models/details.types';
import { Colors } from 'src/theme/colors';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CentralService {
  resumen: ResumenCentral = <ResumenCentral>{};
  chartOption: EChartsOption = {
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

  currentMonthChart: EChartsOption = {
    series: [
      {
        data: [80, 932],
        type: 'pie',
        radius: [90, 130],
        color: [Colors.purple, Colors.darkBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };
  currentAbonos: EChartsOption = {
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

  currentCargos: EChartsOption = {
    series: [
      {
        data: [820, 932],
        type: 'pie',
        radius: [55, 80],
        color: [Colors.lightBlue, Colors.darkBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  currentAbonosDetalle: EChartsOption = {
    series: [
      {
        data: [820, 932],
        type: 'pie',
        radius: [90, 130],
        color: [Colors.darkBlue, Colors.lightBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  currentCargosDetalle: EChartsOption = {
    series: [
      {
        data: [820, 932],
        type: 'pie',
        radius: [90, 130],
        color: [Colors.lightBlue, Colors.darkBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };
  ultimosMovimientosMainFilter = 'saldoTotal';
  ultimosMovimientosFiltered: any[] = [];
  totalSaldo = 0;
  totalAbonos = 0;
  totalCargos = 0;

  paginador: Pager = {
    paginaActual: 0,
    paginas: [0],
    filterBy: 30,
  };

  ultimosMovimientos: any[] = [];
  ultimosMovimientosFilters: any = {
    fechaMovimiento: false,
    descDetalle: false,
    abono: false,
    cargo: false,
    saldoTotal: false,
  };

  constructor(private api: ApiService) {}

  changePage(page: number) {
    this.paginador.paginaActual = page;
    const spliced = this.getSpliced(this.ultimosMovimientos, this.paginador);
    this.ultimosMovimientosFiltered = [...spliced];
  }

  changeUltimosMovimientosMainFilter(filter: 'saldoTotal' | 'abono' | 'cargo') {
    this.ultimosMovimientosMainFilter = filter;
    this.getMovimientos('descDetalle');
  }

  getResumen() {
    this.api.getResumenCentral('MXN').subscribe({
      next: (data: any) => {
        this.setResumen(data.respuesta);
      }
    });
  }

  setResumen(respuesta: any[]) {
    if (respuesta.length) {
      this.resumen = respuesta[0];
    }
  }

  setPaginador(count: number) {
    const pages = Math.round(count / this.paginador.filterBy);
    this.paginador.paginas = Array.from(Array(pages).keys());
  }

  getSpliced(array: any[], pager: Pager) {
    const spliced = [...array].splice(pager.paginaActual * pager.filterBy, pager.filterBy)
    return spliced;
  }

  getMovimientos(orderBy: string) {
    const m = this.ultimosMovimientosFilters[orderBy];
    this.api.getMovimientosCentral({orderBy, ascDesc: m ? 'asc': 'desc'}).subscribe({
      next: (data: any) => {
        this.ultimosMovimientosFilters = {
          fechaMovimiento: false,
          descDetalle: false,
          abono: false,
          cargo: false,
          saldoTotal: false,
        };
        this.ultimosMovimientosFilters[orderBy] = !m;
        this.ultimosMovimientos = data.respuesta;
        if (this.ultimosMovimientosMainFilter === 'saldoTotal') {
          this.setPaginador(this.ultimosMovimientos.length);
          const spliced = this.getSpliced(this.ultimosMovimientos, this.paginador);
          this.ultimosMovimientosFiltered = [...spliced];
        }
        if (this.ultimosMovimientosMainFilter === 'abono') {
          const b = this.getSpliced([...this.ultimosMovimientos.filter((a) => a.cargo === 0)], this.paginador);
          this.ultimosMovimientosFiltered = [...b];
        }
        if (this.ultimosMovimientosMainFilter === 'cargo') {
          const c = this.getSpliced([...this.ultimosMovimientos.filter((a) => a.abono === 0)], this.paginador);
          this.ultimosMovimientosFiltered = [...c];
        }
        this.totalSaldo = parseInt(this.ultimosMovimientos.map(i => i.saldoTotal).reduce((a, b) => a + b, 0));
        this.totalAbonos = parseInt(this.ultimosMovimientos.map(i => i.abono).reduce((a, b) => a + b, 0));
        this.totalCargos = parseInt(this.ultimosMovimientos.map(i => i.cargo).reduce((a, b) => a + b, 0));
        this.currentMonthChart = {
          tooltip: {
            trigger: 'item'
          },
          series: [
            {
              data: [this.totalAbonos, this.totalCargos],
              type: 'pie',
              radius: [90, 130],
              color: [Colors.lightBlue, Colors.darkBlue],
              avoidLabelOverlap: false,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                position: 'inner',
              }
            },
          ],
        };
        this.currentAbonos = {
          tooltip: {},
          series: [
            {
              data: [this.totalAbonos, this.totalCargos],
              type: 'pie',
              radius: [55, 80],
              color: [Colors.darkBlue, Colors.lightBlue],
              label: {
                position: 'inner',
              }
            },
          ],
        };
        this.currentCargos = {
          tooltip: {},
          series: [
            {
              data: [this.totalAbonos, this.totalCargos],
              type: 'pie',
              radius: [55, 80],
              color: [Colors.lightBlue, Colors.darkBlue],
              label: {
                position: 'inner',
              }
            },
          ],
        };


        this.currentAbonosDetalle = {
          tooltip: {},
          series: [
            {
              data: [this.totalAbonos, this.totalCargos],
              type: 'pie',
              radius: [90, 130],
              color: [Colors.darkBlue, Colors.lightBlue],
              label: {
                position: 'inner',
              }
            },
          ],
        };

        this.currentCargosDetalle = {
          tooltip: {},
          series: [
            {
              data: [this.totalAbonos, this.totalCargos],
              type: 'pie',
              radius: [90, 130],
              color: [Colors.lightBlue, Colors.darkBlue],
              label: {
                position: 'inner',
              }
            },
          ],
        };
      }
    });
  }
}
