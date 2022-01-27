import { Component, Input, OnInit } from '@angular/core';
import { CentralService } from 'src/app/api/central.service';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrls: ['./ver-detalle.component.css']
})
export class VerDetalleComponent implements OnInit {


  constructor(
    public centralService: CentralService,

  ) { }

  ngOnInit(): void {
    console.log('Init');
  }

}
