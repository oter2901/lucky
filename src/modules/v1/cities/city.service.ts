import { Injectable } from '@nestjs/common';

import CityRepository from './city.repository';

@Injectable()
export default class CityService {
  constructor(
    private readonly cityRepository: CityRepository,
  ) {}

  public async findAll() {
    return this.cityRepository.findAll();
  }

  public async findByName(name: string) {
    return this.cityRepository.findByName(name);
  }

  public async findById(id: number) {
    return this.cityRepository.findById(id);
  }
}
