import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '../api/api.service';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [HttpClientModule],
      providers: [ApiService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should selectProduct', () => {
    component.selectProduct({
      text: 'Mojo',
      icon: 'mojo',
      value: 'creditos',
    });
    expect(component.currentProduct).toEqual({
      text: 'Mojo',
      icon: 'mojo',
      value: 'creditos',
    });
  });

  it('should clearProduct', () => {
    component.clearProduct();
    expect(component.currentProduct).toBeUndefined();
  });
});
