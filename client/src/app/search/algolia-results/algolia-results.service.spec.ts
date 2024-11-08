import { TestBed } from '@angular/core/testing';

import { AlgoliaResultsService } from './algolia-results.service';

describe('AlgoliaResultsService', () => {
  let service: AlgoliaResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoliaResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
