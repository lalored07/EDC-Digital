import {TestBed} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CentralService } from './central.service';

describe('CentralService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [CentralService]
    });
  });

  it('should be created', () => {
    const service = TestBed.inject(CentralService);
    expect(service).toBeTruthy();
  });


});
