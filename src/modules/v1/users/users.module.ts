import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UsersService from './users.service';
import UserEntity from './schemas/user.entity';
import UsersRepository from './users.repository';
import CityService from '../cities/city.service';
import CityModule from '../cities/city.module';
import AddressService from '../addresses/address.service';
import AddressModule from '../addresses/address.module';
import ProfileModule from '../profiles/profile.module';
import ProfileService from '../profiles/profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    AddressModule,
    CityModule,
    ProfileModule,
  ],
  providers: [
    UsersService,
    UsersRepository,
    CityService,
    AddressService,
    ProfileService,
  ],
  exports: [UsersService, UsersRepository],
})

export default class UsersModule {}
