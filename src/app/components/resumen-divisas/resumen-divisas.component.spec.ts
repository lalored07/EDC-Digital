import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/api/api.service';
import { DivisasService } from 'src/app/api/divisas.service';

import { ResumenDivisasComponent } from './resumen-divisas.component';

describe('ResumenDivisasComponent', () => {
  let component: ResumenDivisasComponent;
  let fixture: ComponentFixture<ResumenDivisasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenDivisasComponent ],
      imports: [HttpClientModule],
      providers: [ApiService, DivisasService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenDivisasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
