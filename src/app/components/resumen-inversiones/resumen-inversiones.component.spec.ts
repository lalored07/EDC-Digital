import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InversionesService } from 'src/app/api/inversiones.service';

import { ResumenInversionesComponent } from './resumen-inversiones.component';

describe('ResumenInversionesComponent', () => {
  let component: ResumenInversionesComponent;
  let fixture: ComponentFixture<ResumenInversionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenInversionesComponent ],
      imports: [HttpClientModule],
      providers: [InversionesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenInversionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
