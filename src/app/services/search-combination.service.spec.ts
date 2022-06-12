import { TestBed } from '@angular/core/testing';

import { SearchCombinationService } from './search-combination.service';

describe('SearchCombinationService', () => {
  let service: SearchCombinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCombinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
