import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DerivadosService } from 'src/app/api/derivados.service';

@Component({
  selector: 'app-movimientos-derivados',
  templateUrl: './movimientos-derivados.component.html',
  styleUrls: ['./movimientos-derivados.component.css']
})
export class MovimientosDerivadosComponent implements OnInit, OnDestroy {

  killall$ = new Subject();

  constructor(
    public derivadosService: DerivadosService
  ) { }

  ngOnInit(): void {
    this.derivadosService.derivadosChanges$.pipe(
      takeUntil(this.killall$)
    ).subscribe({
      next: (derivativeTypeValue) => {
        this.derivadosService.getCurrentDerivados(derivativeTypeValue);
        this.derivadosService.setDerivadosTitle(derivativeTypeValue);
      }
    });
  }

  ngOnDestroy(): void {
    this.killall$.next(true);
    this.killall$.unsubscribe();
  }

}
