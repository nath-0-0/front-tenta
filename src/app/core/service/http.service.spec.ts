import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('ServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});
