import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AddressService from './address.service';
import AddressEntity from './schemas/address.entity';
import AddressRepository from './address.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressEntity])],
  providers: [AddressService, AddressRepository],
  exports: [AddressService, AddressRepository],
})

export default class AddressModule {}
