import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminNiveauxComponent } from './modal-admin-niveaux.component';

describe('ModalAdminNiveauxComponent', () => {
  let component: ModalAdminNiveauxComponent;
  let fixture: ComponentFixture<ModalAdminNiveauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdminNiveauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdminNiveauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
