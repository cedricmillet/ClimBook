import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNiveauxComponent } from './admin-niveaux.component';

describe('AdminNiveauxComponent', () => {
  let component: AdminNiveauxComponent;
  let fixture: ComponentFixture<AdminNiveauxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNiveauxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNiveauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
