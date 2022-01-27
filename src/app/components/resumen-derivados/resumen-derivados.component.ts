import { Component, OnInit } from '@angular/core';
import { DerivadosService } from 'src/app/api/derivados.service';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-resumen-derivados',
  templateUrl: './resumen-derivados.component.html',
  styleUrls: ['./resumen-derivados.component.css']
})
export class ResumenDerivadosComponent implements OnInit {
  canShow = false;
  derivativeType = this.fb.control('');

  constructor(
    private fb: FormBuilder,
    public derivadosService: DerivadosService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.derivadosService.initDerivados();
    this.derivadosService.getDerivados('');
    this.derivativeType.valueChanges.subscribe({
      next: (value: string) => {
        const a: any = {
          'derivadosForward': 'forward',
          'derivadosOpciones': 'opciones',
          'derivadosOpcCapFloor': 'opcCapFloor',
          'derivadosOpcBarrera': 'opcBarrera',
          'derivadosSwaps': 'swaps',
          'derivadosCrossSwaps': 'crossSwaps',
        };
        const tipoDerivado = a[value] || '';
        this.api.getMovimientosDerivados({tipoDerivado}).subscribe({
          next: (data: any) => {
            this.derivadosService.setTotales(data.respuesta);
          }
        })
        this.canShow = true;
        this.derivadosService.derivadosChanges$.next(value);
      }
    });
  }

}
