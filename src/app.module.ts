import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './common/database/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdvertisementsModule } from './modules/advertisements/advertisements.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { SkillsModule } from './modules/skills/skills.module';
import { BenefitsModule } from './modules/benefits/benefits.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig()),
    AuthModule,
    UsersModule,
    AdvertisementsModule,
    CategoriesModule,
    SkillsModule,
    BenefitsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
