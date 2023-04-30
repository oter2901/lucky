import { Injectable } from '@nestjs/common';
import ProfileRepository from './profile.repository';
import UserEntity from '../users/schemas/user.entity';
import AddressEntity from '../addresses/schemas/address.entity';

@Injectable()
export default class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
  ) {}

  public async create(user: UserEntity, address: AddressEntity, name: string) {
    return this.profileRepository.create(user, address, name);
  }

  public async getProfileByUsername(username: string) {
    return this.profileRepository.getProfileByUsername(username);
  }
}
