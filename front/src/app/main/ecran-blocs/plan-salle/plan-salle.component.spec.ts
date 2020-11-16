import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSalleComponent } from './plan-salle.component';

describe('PlanSalleComponent', () => {
  let component: PlanSalleComponent;
  let fixture: ComponentFixture<PlanSalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanSalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
