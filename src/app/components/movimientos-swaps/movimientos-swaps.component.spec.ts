import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/api/api.service';
import { SwapsService } from 'src/app/api/swaps.service';

import { MovimientosSwapsComponent } from './movimientos-swaps.component';

describe('MovimientosSwapsComponent', () => {
  let component: MovimientosSwapsComponent;
  let fixture: ComponentFixture<MovimientosSwapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosSwapsComponent ],
      imports: [HttpClientModule],
      providers: [ApiService, SwapsService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosSwapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
