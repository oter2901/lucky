import { ApiProperty } from '@nestjs/swagger';
import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import CityEntity from '../../cities/schemas/city.entity';

@Entity('country')
export default class CountryEntity {
  @ApiProperty({ type: Number })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @ApiProperty({ type: String })
  @Column({ length: 64 })
  readonly name: string;

  @OneToMany(() => CityEntity, (city) => city.country, { cascade: true })
  readonly cities: CityEntity[];
}
