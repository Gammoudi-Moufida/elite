import { TestBed } from '@angular/core/testing';

import { ScrollToFragmentService } from './scroll-to-fragment.service';

describe('ScrollToFragmentService', () => {
  let service: ScrollToFragmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollToFragmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
