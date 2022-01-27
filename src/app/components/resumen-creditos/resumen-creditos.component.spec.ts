import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/api/api.service';

import { ResumenCreditosComponent } from './resumen-creditos.component';

describe('ResumenCreditosComponent', () => {
  let component: ResumenCreditosComponent;
  let fixture: ComponentFixture<ResumenCreditosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenCreditosComponent ],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCreditosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
