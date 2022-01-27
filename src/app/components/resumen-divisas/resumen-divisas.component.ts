import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { DivisasService } from 'src/app/api/divisas.service';

@Component({
  selector: 'app-resumen-divisas',
  templateUrl: './resumen-divisas.component.html',
  styleUrls: ['./resumen-divisas.component.css']
})
export class ResumenDivisasComponent implements OnInit {



  constructor(
    private api: ApiService,
    public divisasService: DivisasService
  ) { }

  ngOnInit(): void {
    this.api.getResumenDivisas().subscribe({
      next: (data: any) => {
        const resumen = this.divisasService.initResumen(data.respuesta);
        this.divisasService.setCharts(resumen);
      },
    });
  }

}
