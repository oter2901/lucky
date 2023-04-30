import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RedisModule } from '@liaoliaots/nestjs-redis';
import DBConfig from 'src/database/ormconfig';
import AppController from './app.controller';
import AppService from './app.service';
import V1Module from '../v1/v1.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...DBConfig,
    }),
    RedisModule.forRootAsync({
      useFactory: (cfg: ConfigService) => ({
        config: {
          url: cfg.get('REDIS_URL'),
        },
      }),
      inject: [ConfigService],
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export default class AppModule {}
