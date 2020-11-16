import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcranClassementsComponent } from './ecran-classements.component';

describe('EcranClassementsComponent', () => {
  let component: EcranClassementsComponent;
  let fixture: ComponentFixture<EcranClassementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcranClassementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcranClassementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
