import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUtilisateursComponent } from './modal-admin-utilisateurs.component';

describe('ModalAdminUtilisateursComponent', () => {
  let component: ModalAdminUtilisateursComponent;
  let fixture: ComponentFixture<ModalAdminUtilisateursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdminUtilisateursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
