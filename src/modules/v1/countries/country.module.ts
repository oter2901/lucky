import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CountryEntity from './schemas/country.entity';
import CountryService from './country.service';
import CountryRepository from './country.repository';
import CountryController from './country.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity])],
  controllers: [CountryController],
  providers: [CountryService, CountryRepository],
  exports: [CountryService, CountryRepository],
})

export default class CountryModule {}
