import { TestBed } from '@angular/core/testing';

import { AlgoliaFiltersService } from './algolia-filters.service';

describe('AlgoliaFiltersService', () => {
  let service: AlgoliaFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoliaFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
