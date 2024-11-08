import { TestBed } from '@angular/core/testing';

import { AlgoliaCardService } from './algolia-card.service';

describe('AlgoliaCardService', () => {
  let service: AlgoliaCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlgoliaCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
