import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import UserEntity from '../../users/schemas/user.entity';
import AddressEntity from '../../addresses/schemas/address.entity';

@Entity('profile')
@Index(['id', 'user'], { unique: true })
export default class ProfileEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ApiProperty({ type: String })
  @Column({ length: 64 })
  readonly name: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  readonly user: UserEntity;

  @OneToOne(() => AddressEntity)
  @JoinColumn()
  readonly address: AddressEntity;
}
