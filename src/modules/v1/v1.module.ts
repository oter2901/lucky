import { Module } from '@nestjs/common';
import { Routes, RouterModule } from '@nestjs/core';
import AuthModule from './auth/auth.module';
import UsersModule from './users/users.module';
import CityModule from './cities/city.module';
import CountryModule from './countries/country.module';
import AddressModule from './addresses/address.module';

const routes: Routes = [
  {
    path: '/v1',
    children: [
      { path: '/', module: AuthModule },
      { path: '/users', module: UsersModule },
      { path: '/cities', module: CityModule },
      { path: '/country', module: CountryModule },
    ],
  },
];

@Module({
  imports: [
    RouterModule.register(routes),
    AddressModule,
    AuthModule,
    CityModule,
    CountryModule,
    UsersModule,
  ],
})

export default class V1Module {}
