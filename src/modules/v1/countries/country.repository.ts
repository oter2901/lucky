import { Redis } from 'ioredis';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RedisService } from '@liaoliaots/nestjs-redis';

import CountryEntity from './schemas/country.entity';

@Injectable()
export default class CountryRepository {
  private readonly redisClient: Redis;

  constructor(
    @InjectRepository(CountryEntity)
    private readonly countryModel: Repository<CountryEntity>,
    private readonly redisService: RedisService,
  ) {
    this.redisClient = redisService.getClient();
  }

  public async findById(id: number) {
    const key = this.getKey(id);
    const cachedCountry = await this.redisClient.get(key);
    let country = JSON.parse(cachedCountry);
    if (!country) {
      country = await this.countryModel.findOne({ where: { id } });
      await this.redisClient.set(key, JSON.stringify(country), 'EX', 3600);
    }

    return country;
  }

  public async create(name: string) {
    return this.countryModel.save({ name });
  }

  private getKey(id: number) {
    return `country-${id}`;
  }
}
