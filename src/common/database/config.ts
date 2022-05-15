import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function databaseConfig(): TypeOrmModuleOptions {
  return {
    type: 'sqlite',
    database: 'db.sqlite3',
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}']
  }
}