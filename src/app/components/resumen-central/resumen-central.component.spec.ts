import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/api/api.service';
import { CentralService } from 'src/app/api/central.service';

import { ResumenCentralComponent } from './resumen-central.component';

describe('ResumenCentralComponent', () => {
  let component: ResumenCentralComponent;
  let fixture: ComponentFixture<ResumenCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenCentralComponent ],
      imports: [HttpClientModule],
      providers: [ApiService, CentralService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCentralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
