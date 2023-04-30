import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import AddressEntity from '../addresses/schemas/address.entity';
import UserEntity from '../users/schemas/user.entity';

import ProfileEntity from './schemas/profile.entity';

@Injectable()
export default class ProfileRepository {
  constructor(
    @InjectRepository(ProfileEntity)
    private readonly profileModel: Repository<ProfileEntity>,
  ) {}

  public async create(user: UserEntity, address: AddressEntity, name: string) {
    return this.profileModel.save({ user, address, name });
  }

  public async getProfileByUsername(username: string) {
    return this.profileModel.findOne({ where: { user: { username } }, relations: { user: true, address: { city: { country: true } } } });
  }
}
