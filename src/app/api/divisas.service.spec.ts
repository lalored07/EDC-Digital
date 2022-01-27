import {TestBed} from '@angular/core/testing';
import { DivisasService } from './divisas.service';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ResumenDivisaType } from 'src/models/details.types';
describe('DivisasService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(DivisasService);
    expect(service).toBeTruthy();
  });

  it('should selectDivisasCurrency', () => {
    const service = TestBed.inject(DivisasService);
    service.resumenes = [<ResumenDivisaType>{}];
    service.selectDivisasCurrency({text: 'Mojo', value: 'usd'}, 0);
    expect(service.currentDivisasCurrency).toEqual({text: 'Mojo', value: 'usd'});
  });


  it('should setDivisas', () => {
    const service = TestBed.inject(DivisasService);
    service.setDivisas([]);
    expect(service.divisas).toEqual([]);
  });


});
