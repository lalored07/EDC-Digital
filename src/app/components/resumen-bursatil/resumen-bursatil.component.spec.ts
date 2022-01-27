import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/api/api.service';
import { BursatilService } from 'src/app/api/bursatil.service';

import { ResumenBursatilComponent } from './resumen-bursatil.component';

describe('ResumenBursatilComponent', () => {
  let component: ResumenBursatilComponent;
  let fixture: ComponentFixture<ResumenBursatilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenBursatilComponent ],
      imports: [HttpClientModule],
      providers: [ApiService, BursatilService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenBursatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
