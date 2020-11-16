import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcranProgressionComponent } from './ecran-progression.component';

describe('EcranProgressionComponent', () => {
  let component: EcranProgressionComponent;
  let fixture: ComponentFixture<EcranProgressionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcranProgressionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcranProgressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
