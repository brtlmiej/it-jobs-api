import { Module } from '@nestjs/common';
import { AdvertisementsTypesController } from './advertisements-types.controller';

@Module({
  controllers: [AdvertisementsTypesController]
})
export class AdvertisementsTypesModule {}
