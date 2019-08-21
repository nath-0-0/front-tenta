import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMenuPage } from './footer-menu.page';

describe('FooterMenuPage', () => {
  let component: FooterMenuPage;
  let fixture: ComponentFixture<FooterMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterMenuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
