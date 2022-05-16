import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './common/database/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { AdvertisementsModule } from './modules/advertisements/advertisements.module';
import { AdvertisementsTypesModule } from './modules/advertisements-types/advertisements-types.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig()),
    AuthModule,
    UsersModule,
    AdvertisementsModule,
    AdvertisementsTypesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
