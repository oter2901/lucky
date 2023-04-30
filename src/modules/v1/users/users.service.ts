import { BadRequestException, Injectable } from '@nestjs/common';

import UsersRepository from './users.repository';
import SignUpDto from '../auth/dto/sign-up.dto';
import CityService from '../cities/city.service';
import AddressService from '../addresses/address.service';
import ProfileService from '../profiles/profile.service';

@Injectable()
export default class UsersService {
  constructor(
        private readonly usersRepository: UsersRepository,
        private readonly cityService: CityService,
        private readonly addressService: AddressService,
        private readonly profileService: ProfileService,
  ) {}

  public async create({
    cityId, address, username, password, name,
  }: SignUpDto) {
    const city = await this.cityService.findById(cityId);
    const newAddress = await this.addressService.create(address, city);
    const user = await this.usersRepository.create(username, password);

    return this.profileService.create(user, newAddress, name);
  }

  public async userExists(username: string) {
    const user = await this.usersRepository.getByUsername(username);

    if (user) {
      throw new BadRequestException();
    }
  }

  public async getUserByUsername(username: string) {
    return this.usersRepository.getByUsername(username);
  }
}
