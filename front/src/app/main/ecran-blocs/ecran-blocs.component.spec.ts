import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcranBlocsComponent } from './ecran-blocs.component';

describe('EcranBlocsComponent', () => {
  let component: EcranBlocsComponent;
  let fixture: ComponentFixture<EcranBlocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcranBlocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcranBlocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
