import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/api/api.service';
import { SwapsService } from 'src/app/api/swaps.service';

import { ResumenSwapsComponent } from './resumen-swaps.component';

describe('ResumenSwapsComponent', () => {
  let component: ResumenSwapsComponent;
  let fixture: ComponentFixture<ResumenSwapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenSwapsComponent ],
      imports: [HttpClientModule],
      providers: [SwapsService, ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenSwapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
