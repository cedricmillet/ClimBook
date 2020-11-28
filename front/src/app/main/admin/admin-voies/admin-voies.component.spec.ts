import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVoiesComponent } from './admin-voies.component';

describe('AdminVoiesComponent', () => {
  let component: AdminVoiesComponent;
  let fixture: ComponentFixture<AdminVoiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminVoiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVoiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
