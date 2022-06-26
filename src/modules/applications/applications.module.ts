import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementsRepository } from '../advertisements/advertisements.repository';
import { ApplicationsRepository } from './applications.repository';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { AdvertisementsModule } from '../advertisements/advertisements.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ApplicationsRepository, AdvertisementsRepository]),
    forwardRef(() => AdvertisementsModule),
  ],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
  controllers: [ApplicationsController],
})
export class ApplicationsModule {}
