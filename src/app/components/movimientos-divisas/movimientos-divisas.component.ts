import { Component, OnInit } from '@angular/core';
import { DivisasService } from 'src/app/api/divisas.service';

@Component({
  selector: 'app-movimientos-divisas',
  templateUrl: './movimientos-divisas.component.html',
  styleUrls: ['./movimientos-divisas.component.css']
})
export class MovimientosDivisasComponent implements OnInit {

  constructor(
    public divisasService: DivisasService
  ) { }

  ngOnInit(): void {
    this.divisasService.getDivisas('');
  }

}
