import { Test, TestingModule } from '@nestjs/testing';
import { BouquetService } from './bouquet.service';

describe('BouquetService', () => {
  let service: BouquetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BouquetService],
    }).compile();

    service = module.get<BouquetService>(BouquetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
