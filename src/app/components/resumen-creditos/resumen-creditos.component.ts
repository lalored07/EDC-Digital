import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EChartsOption } from 'echarts';
import { ApiService } from 'src/app/api/api.service';
import { CreditoType } from 'src/models/details.types';
import { Colors } from 'src/theme/colors';

@Component({
  selector: 'app-resumen-creditos',
  templateUrl: './resumen-creditos.component.html',
  styleUrls: ['./resumen-creditos.component.css']
})
export class ResumenCreditosComponent implements OnInit {

  estados = [
    {
      value: '0',
      text: 'Vigentes'
    },
    {
      value: '1',
      text: 'Liquidados'
    },
    {
      value: '2',
      text: 'No Liquidados'
    }
  ];
  credits: CreditoType[] = [];
  currentState = this.fb.control('');
  currentCreditNumber = this.fb.control('');
  currentCredit: CreditoType | undefined;

  chartOptions: EChartsOption = {
    series: [],
  };

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
  ) { }

  getCharts(credit: CreditoType | undefined) {
    if (credit) {
      const a = credit.numPago.split(' de ');
      const [pagosRealizados, pagosTotales] = a;
      this.chartOptions = {
        xAxis: {
          max: 'dataMax'
        },
        yAxis: {
          type: 'category',
          data: ['Realizados', 'Totales'],
          show: false,
        },
        tooltip: {},
        series: [
          {
            type: 'bar',
            data: [{
              value: +pagosRealizados,
              itemStyle: {
                color: Colors.lightGrayBlue
              }
            }, {
              value: +pagosTotales,
              itemStyle: {
                color: Colors.darkBlue
              }
            }],
          }
        ],
      };
    }
  }

  ngOnInit(): void {
    this.api.getCreditos().subscribe();
    this.currentCreditNumber.valueChanges.subscribe({
      next: (value: string) => {
        const credit = this.credits.find(({subCredito}) => `${subCredito}` === value);
        this.currentCredit = credit;
        this.getCharts(credit);
      }
    });
    this.currentState.valueChanges.subscribe({
      next: (value: string) => {
        this.currentCredit = undefined;
        this.currentCreditNumber.setValue('');
        this.api.getCreditosEstado({ estado: value }).subscribe({
          next: (data: any) => {
            this.credits = data.respuesta;
          }
        });
      }
    });
  }

}
