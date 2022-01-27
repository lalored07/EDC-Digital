import {TestBed} from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { SwapsService } from './swaps.service';
import { ResumenSwapsType } from 'src/models/details.types';
describe('SwapsService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(SwapsService);
    expect(service).toBeTruthy();
  });


  it('should selectSwapCurrency', () => {
    const service = TestBed.inject(SwapsService);
    service.resumenes = [
      <ResumenSwapsType>{}
    ];
    service.selectSwapCurrency({text: 'Mojo', value: 'usd'}, 0);
    expect(service.currentSwapCurrency).toEqual({text: 'Mojo', value: 'usd'});
  });

});
