import { Injectable } from '@nestjs/common';

import CountryRepository from './country.repository';

@Injectable()
export default class CountryService {
  constructor(
    private readonly countryRepository: CountryRepository,
  ) {}

  public findById(id:number) {
    return this.countryRepository.findById(id);
  }

  public create(name: string) {
    return this.countryRepository.create(name);
  }
}
