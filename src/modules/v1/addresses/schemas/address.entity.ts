import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import CityEntity from '../../cities/schemas/city.entity';

@Entity('address')
export default class AddressEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ApiProperty({ type: String })
  @Column({ length: 64 })
  readonly street: string;

  @ManyToOne(() => CityEntity, (city) => city.address)
  readonly city: CityEntity;
}
