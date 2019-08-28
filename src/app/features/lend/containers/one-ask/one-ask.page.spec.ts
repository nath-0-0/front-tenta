import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAskPage } from './one-ask.page';

describe('OneAskPage', () => {
  let component: OneAskPage;
  let fixture: ComponentFixture<OneAskPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneAskPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneAskPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
