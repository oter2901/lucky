import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ProfileService from './profile.service';
import ProfileEntity from './schemas/profile.entity';
import ProfileRepository from './profile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity])],
  providers: [ProfileService, ProfileRepository],
  exports: [ProfileService, ProfileRepository],
})

export default class ProfileModule {}
