import {TestBed} from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { BursatilService } from './bursatil.service';
describe('BursatilService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(BursatilService);
    expect(service).toBeTruthy();
  });

  it('should selectMarketFilter', () => {
    const service = TestBed.inject(BursatilService);
    service.selectMarketFilter({text: 'Mojo', value: 'Mojo'});
    expect(service.currentMarketFilter).toEqual({text: 'Mojo', value: 'Mojo'});
  });

  it('should setMovimientos', () => {
    const service = TestBed.inject(BursatilService);
    service.setMovimientos([]);
    expect(service.movimientos).toEqual([]);
  });

});
