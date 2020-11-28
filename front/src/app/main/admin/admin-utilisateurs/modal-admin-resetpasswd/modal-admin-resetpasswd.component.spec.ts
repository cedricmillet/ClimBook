import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminResetpasswdComponent } from './modal-admin-resetpasswd.component';

describe('ModalAdminResetpasswdComponent', () => {
  let component: ModalAdminResetpasswdComponent;
  let fixture: ComponentFixture<ModalAdminResetpasswdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdminResetpasswdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminResetpasswdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
