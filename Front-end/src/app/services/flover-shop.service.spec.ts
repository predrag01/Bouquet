import { TestBed } from '@angular/core/testing';

import { FloverShopService } from './flover-shop.service';

describe('FloverShopService', () => {
  let service: FloverShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloverShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
