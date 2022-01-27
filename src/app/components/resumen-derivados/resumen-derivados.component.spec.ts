import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/api/api.service';
import { DerivadosService } from 'src/app/api/derivados.service';

import { ResumenDerivadosComponent } from './resumen-derivados.component';

describe('ResumenDerivadosComponent', () => {
  let component: ResumenDerivadosComponent;
  let fixture: ComponentFixture<ResumenDerivadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenDerivadosComponent ],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [ApiService, DerivadosService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenDerivadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen derivativeType', async () => {
    const select: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('#derivativeTypeCombo');
    select.value = '';
    select.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();
    const value = component.derivativeType.value;
    expect(value).toEqual('');
  });

});
