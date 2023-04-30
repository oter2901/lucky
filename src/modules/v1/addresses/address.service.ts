import { Injectable } from '@nestjs/common';
import AddressRepository from './address.repository';
import CityEntity from '../cities/schemas/city.entity';

@Injectable()
export default class AddressService {
  constructor(
        private readonly addressRepository: AddressRepository,
  ) {}

  public async create(street: string, city: CityEntity) {
    return this.addressRepository.create(street, city);
  }
}
