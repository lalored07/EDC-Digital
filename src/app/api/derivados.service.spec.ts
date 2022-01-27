import {TestBed} from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { DerivadosService } from './derivados.service';
describe('DerivadosService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(DerivadosService);
    expect(service).toBeTruthy();
  });


  it('should initResumen', () => {
    const service = TestBed.inject(DerivadosService);
    service.initResumen([{
      periodo: 0,
      refNumContrato: '1',
      tipoCambio: 0,
      tasaInteres: 0,
      valuacionMxn: 0,
      saldoGarantiasMxn: 0,
    }]);
    expect(service.resumen).toEqual({
      periodo: 0,
      refNumContrato: '1',
      tipoCambio: 0,
      tasaInteres: 0,
      valuacionMxn: 0,
      saldoGarantiasMxn: 0,
    });
  });

  it('should setDerivados', () => {
    const service = TestBed.inject(DerivadosService);
    service.setDerivados([]);
    expect(service.derivados).toEqual([]);
  });

});
