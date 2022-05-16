import { Test, TestingModule } from '@nestjs/testing';
import { AdvertisementsTypesController } from './advertisements-types.controller';

describe('AdvertisementsTypesController', () => {
  let controller: AdvertisementsTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvertisementsTypesController],
    }).compile();

    controller = module.get<AdvertisementsTypesController>(AdvertisementsTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
