import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/api/api.service';
import { DivisasService } from 'src/app/api/divisas.service';

import { MovimientosDivisasComponent } from './movimientos-divisas.component';

describe('MovimientosDivisasComponent', () => {
  let component: MovimientosDivisasComponent;
  let fixture: ComponentFixture<MovimientosDivisasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosDivisasComponent ],
      imports: [HttpClientModule],
      providers: [ApiService, DivisasService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosDivisasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
