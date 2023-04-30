import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CityEntity from './schemas/city.entity';

@Injectable()
export default class CityRepository {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityModel: Repository<CityEntity>,
  ) {}

  public findAll() {
    return this.cityModel.find({
      relations: ['country'],
    });
  }

  public findByName(name: string) {
    return this.cityModel.findOne({ where: { name }, relations: ['country'] });
  }

  public findById(id: number) {
    return this.cityModel.findOne({ where: { id }, relations: ['country'] });
  }
}
