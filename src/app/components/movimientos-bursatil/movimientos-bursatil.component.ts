import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';
import { BursatilService } from 'src/app/api/bursatil.service';

@Component({
  selector: 'app-movimientos-bursatil',
  templateUrl: './movimientos-bursatil.component.html',
  styleUrls: ['./movimientos-bursatil.component.css']
})
export class MovimientosBursatilComponent implements OnInit {

  constructor(
    private api: ApiService,
    public bursatilService: BursatilService
  ) { }

  ngOnInit(): void {
    this.bursatilService.onFilterSelection.subscribe({
      next: (data: any) => {
        this.getMovimientos(data);
      }
    });
  }

  getMovimientos(tipo: 'REPO' | 'CUST') {
    this.api.getMovimientosBursatil({tipo}).subscribe({
      next: (data: any) => {
        this.bursatilService.setMovimientos(data.respuesta);
      },
    });
  }

}
