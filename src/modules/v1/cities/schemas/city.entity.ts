import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import CountryEntity from '../../countries/schemas/country.entity';
import AddressEntity from '../../addresses/schemas/address.entity';

@Entity('city')
export default class CityEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ApiProperty({ type: String })
  @Column({ length: 64 })
  readonly name: string;

  @OneToMany(() => AddressEntity, (address) => address.city)
  readonly address: AddressEntity[];

  @ManyToOne(() => CountryEntity, (country) => country.cities)
  readonly country: CountryEntity;
}
