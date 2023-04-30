import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CityEntity from './schemas/city.entity';
import CityService from './city.service';
import CityRepository from './city.repository';
import CityController from './city.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CityController],
  providers: [CityService, CityRepository],
  exports: [CityService, CityRepository],
})

export default class CityModule {}
