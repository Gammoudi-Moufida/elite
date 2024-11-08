import { TestBed } from '@angular/core/testing';

import { HomeNextService } from './home-next.service';

describe('HomeNextService', () => {
  let service: HomeNextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeNextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
