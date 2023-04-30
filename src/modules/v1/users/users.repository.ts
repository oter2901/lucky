import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import UserEntity from './schemas/user.entity';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersModel: Repository<UserEntity>,
  ) {}

  public async getByUsername(username:string): Promise<UserEntity> {
    return this.usersModel.findOne({ where: { username } });
  }

  public async create(username:string, password: string): Promise<UserEntity> {
    return this.usersModel.save({ username, password });
  }
}
