import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminVoiesComponent } from './modal-admin-voies.component';

describe('ModalAdminVoiesComponent', () => {
  let component: ModalAdminVoiesComponent;
  let fixture: ComponentFixture<ModalAdminVoiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdminVoiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminVoiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
