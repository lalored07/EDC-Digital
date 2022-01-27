import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/api/api.service';
import { BursatilService } from 'src/app/api/bursatil.service';

import { MovimientosBursatilComponent } from './movimientos-bursatil.component';

describe('MovimientosBursatilComponent', () => {
  let component: MovimientosBursatilComponent;
  let fixture: ComponentFixture<MovimientosBursatilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosBursatilComponent ],
      imports: [HttpClientModule],
      providers: [ApiService, BursatilService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosBursatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
