import { TestBed } from '@angular/core/testing';

import { BouquetTypeService } from './bouquet-type.service';

describe('BouquetTypeService', () => {
  let service: BouquetTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BouquetTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
