import { Component, OnInit } from '@angular/core';
import { SwapsService } from 'src/app/api/swaps.service';

@Component({
  selector: 'app-movimientos-swaps',
  templateUrl: './movimientos-swaps.component.html',
  styleUrls: ['./movimientos-swaps.component.css']
})
export class MovimientosSwapsComponent implements OnInit {

  constructor(
    public swapsService: SwapsService
  ) { }

  ngOnInit(): void {
    this.swapsService.initSwaps();
  }

}
