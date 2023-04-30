import {
  Entity, Column, PrimaryGeneratedColumn, Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export default class UserEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  readonly password: string;

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Index({ unique: true })
  readonly username: string;
}
