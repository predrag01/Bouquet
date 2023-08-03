import { Test, TestingModule } from '@nestjs/testing';
import { BouquetTypeController } from './bouquet-type.controller';

describe('BouquetTypeController', () => {
  let controller: BouquetTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BouquetTypeController],
    }).compile();

    controller = module.get<BouquetTypeController>(BouquetTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
