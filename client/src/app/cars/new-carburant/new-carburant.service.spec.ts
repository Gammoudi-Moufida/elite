import { TestBed } from '@angular/core/testing';

import { NewCarburantService } from './new-carburant.service';

describe('NewCarburantService', () => {
  let service: NewCarburantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewCarburantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
