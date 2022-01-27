import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/api/api.service';
import { DerivadosService } from 'src/app/api/derivados.service';

import { MovimientosDerivadosComponent } from './movimientos-derivados.component';

describe('MovimientosDerivadosComponent', () => {
  let component: MovimientosDerivadosComponent;
  let fixture: ComponentFixture<MovimientosDerivadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosDerivadosComponent ],
      imports: [HttpClientModule],
      providers: [ApiService, DerivadosService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosDerivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
