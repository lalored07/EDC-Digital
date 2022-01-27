import { Component, OnInit } from '@angular/core';
import { InversionesService } from 'src/app/api/inversiones.service';

@Component({
  selector: 'app-resumen-inversiones',
  templateUrl: './resumen-inversiones.component.html',
  styleUrls: ['./resumen-inversiones.component.css']
})
export class ResumenInversionesComponent implements OnInit {

  constructor(public inversionesService: InversionesService) { }

  ngOnInit(): void {
    this.inversionesService.initResumen();
  }

}
