import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/models/details.types';
import { ApiService } from '../api/api.service';
import { CentralService } from '../api/central.service';
import { ParamsService } from '../api/params.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  canShow = false;
  currentProduct?: Product;

  allProducts: Product[] = [
    {
      text: 'Divisas',
      icon: 'divisas_icon',
      value: 'divisas'
    },
    {
      text: 'Swaps',
      icon: 'swaps_icon',
      value: 'swaps'
    },
    {
      text: 'Créditos',
      icon: 'creditos_icon',
      value: 'creditos'
    },
    {
      text: 'Inversión',
      icon: 'inversiones_icon',
      value: 'inversiones'
    },
    {
      text: 'Derivados',
      icon: 'derivados_icon',
      value: 'derivados'
    },
    {
      text: 'Opciones de Mercado',
      icon: 'operaciones_icon',
      value: 'operaciones'
    },
  ];

  products: (Product | undefined)[] = [];

  periodoFormControl = this.fb.control('');

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public paramsService: ParamsService,
    public centralService: CentralService,
  ) { }

  ngOnInit(): void {
    const contrato = this.activatedRoute.snapshot.paramMap.get('contrato');
    if (contrato) {
      this.paramsService.contrato = contrato;
    }
    this.periodoFormControl.valueChanges.subscribe({
      next: (value: string) => {
        this.paramsService.periodo = value;
        this.api.periodoChanged$.next(value);
        this.centralService.getResumen();
        this.clearProduct();
        this.api.getSeccionesCentral().subscribe({
          next: (data: any) => {
            this.canShow = true;
            const mapped = data.respuesta.map((item: any) => {
              return this.allProducts.find(j => item === j.text);
            });
            this.products = mapped.filter((item: any) => typeof item !== 'undefined');
          },
        });
      },
    })
  }

  generateCSV(ultimosMovimientos: any[]) {
    if (this.canShow) {
      const parseData = ultimosMovimientos.map((el) => ({
        'Fecha': el.fechaMovimiento,
        'Descripción': el.descDetalle,
        'Abonos': el.abono,
        'Cargos': el.cargo,
        'Saldo': el.saldoTotal,
      }));
      this.api.download(parseData, 'Úlitmos movimientos');
    }
  }

  selectProduct(product: Product | undefined) {
    this.currentProduct = product;
  }

  clearProduct() {
    this.currentProduct = undefined;
  }


}
