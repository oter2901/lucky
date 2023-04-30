import { ApiProperty } from '@nestjs/swagger';
import CountryEntity from '../../countries/schemas/country.entity';

export default class CityResponseDTO {
  @ApiProperty({
    type: String,
  })
  readonly name: string = '';

  @ApiProperty({
    type: Number,
  })
  readonly id: string = '';

  @ApiProperty({
    type: CountryEntity,
  })
  readonly country: {};
}
