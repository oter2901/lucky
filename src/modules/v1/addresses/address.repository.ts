import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AddressEntity from './schemas/address.entity';
import CityEntity from '../cities/schemas/city.entity';

@Injectable()
export default class AddressRepository {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressModel: Repository<AddressEntity>,
  ) {}

  public async create(street:string, city: CityEntity) {
    return this.addressModel.save({ street, city });
  }
}
