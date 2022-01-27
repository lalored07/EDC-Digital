import { Component, OnInit } from '@angular/core';
import { SwapsService } from 'src/app/api/swaps.service';

@Component({
  selector: 'app-resumen-swaps',
  templateUrl: './resumen-swaps.component.html',
  styleUrls: ['./resumen-swaps.component.css']
})
export class ResumenSwapsComponent implements OnInit {

  constructor(
    public swapsService: SwapsService
  ) { }

  ngOnInit(): void {
    this.swapsService.initResumenSwaps();
  }

}
