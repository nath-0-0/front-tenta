import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AskToLendComponent } from './ask-to-lend.component';

describe('AskToLendComponent', () => {
  let component: AskToLendComponent;
  let fixture: ComponentFixture<AskToLendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AskToLendComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AskToLendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
