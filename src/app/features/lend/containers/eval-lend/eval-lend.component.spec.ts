import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalLendComponent } from './eval-lend.component';

describe('EvalLendComponent', () => {
  let component: EvalLendComponent;
  let fixture: ComponentFixture<EvalLendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalLendComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalLendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
