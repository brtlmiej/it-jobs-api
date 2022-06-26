import { Module } from '@nestjs/common';
import { AdvertisementsService } from './advertisements.service';
import { AdvertisementsController } from './advertisements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementsRepository } from './advertisements.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { UsersRepository } from '../users/users.repository';
import { AuthModule } from '../auth/auth.module';
import { SkillsRepository } from '../skills/skills.repository';
import { BenefitsRepository } from '../benefits/benefits.repository';
import { ApplicationsRepository } from '../applications/applications.repository';
import { ApplicationsModule } from '../applications/applications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdvertisementsRepository,
      CategoriesRepository,
      SkillsRepository,
      BenefitsRepository,
      ApplicationsRepository,
    ]),
    AuthModule,
    ApplicationsModule,
  ],
  controllers: [AdvertisementsController],
  providers: [AdvertisementsService],
  exports: [AdvertisementsService],
})
export class AdvertisementsModule {}
