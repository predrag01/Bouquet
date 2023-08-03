import { Test, TestingModule } from '@nestjs/testing';
import { BouquetController } from './bouquet.controller';

describe('BouquetController', () => {
  let controller: BouquetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BouquetController],
    }).compile();

    controller = module.get<BouquetController>(BouquetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
