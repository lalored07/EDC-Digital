import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginWso2Component } from './login-wso2.component';

describe('LoginWso2Component', () => {
  let component: LoginWso2Component;
  let fixture: ComponentFixture<LoginWso2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginWso2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginWso2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
