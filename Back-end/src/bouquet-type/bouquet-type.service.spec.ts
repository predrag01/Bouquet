import { Test, TestingModule } from '@nestjs/testing';
import { BouquetTypeService } from './bouquet-type.service';

describe('BouquetTypeService', () => {
  let service: BouquetTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BouquetTypeService],
    }).compile();

    service = module.get<BouquetTypeService>(BouquetTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
