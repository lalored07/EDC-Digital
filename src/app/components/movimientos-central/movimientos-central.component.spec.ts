import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/api/api.service';
import { CentralService } from 'src/app/api/central.service';

import { MovimientosCentralComponent } from './movimientos-central.component';

describe('MovimientosCentralComponent', () => {
  let component: MovimientosCentralComponent;
  let fixture: ComponentFixture<MovimientosCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientosCentralComponent ],
      imports: [HttpClientModule],
      providers: [ApiService, CentralService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimientosCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
