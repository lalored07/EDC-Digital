import { Component, OnInit } from '@angular/core';
import { CentralService } from 'src/app/api/central.service';

@Component({
  selector: 'app-movimientos-central',
  templateUrl: './movimientos-central.component.html',
  styleUrls: ['./movimientos-central.component.css']
})
export class MovimientosCentralComponent implements OnInit {

  constructor(
    public centralService: CentralService
  ) { }

  ngOnInit(): void {
    this.centralService.getMovimientos('');
  }

}
