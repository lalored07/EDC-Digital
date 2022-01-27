import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ApiService } from 'src/app/api/api.service';
import { BursatilService } from 'src/app/api/bursatil.service';
import { Colors } from 'src/theme/colors';

@Component({
  selector: 'app-resumen-bursatil',
  templateUrl: './resumen-bursatil.component.html',
  styleUrls: ['./resumen-bursatil.component.css']
})
export class ResumenBursatilComponent implements OnInit {

  currentMonthChart: EChartsOption = {
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

  pastMonthChart: EChartsOption = {
    series: [
      {
        data: [],
        type: 'pie',
        radius: [75, 110],
        color: [Colors.purple, Colors.darkBlue, Colors.lightBlue],
        label: {
          position: 'inner',
        }
      },
    ],
  };

  resumen: any = {};

  constructor(
    private api: ApiService,
    public bursatilService: BursatilService

  ) { }

  ngOnInit(): void {
    this.api.getResumenBursatil().subscribe({
      next: (data: any) => {
        this.setResumen(data.respuesta[0]);
        this.setChart(data.respuesta[0]);
      },
    });
  }

  setResumen(resumen: any) {
    this.resumen = resumen;
  }

  setChart(resumen: any) {
    this.currentMonthChart = {
      series: [
        {
          data: [resumen.titulos, resumen.importeMercado],
          type: 'pie',
          radius: [75, 110],
          color: [Colors.purple, Colors.darkBlue, Colors.lightBlue],
          label: {
            position: 'inner',
          }
        },
      ],
    };
    this.pastMonthChart = {
      series: [
        {
          data: [resumen.titulosMesAnt, resumen.importeMercadoMesAnt],
          type: 'pie',
          radius: [75, 110],
          color: [Colors.purple, Colors.darkBlue, Colors.lightBlue],
          label: {
            position: 'inner',
          }
        },
      ],
    };
  }

}
