import { ApiProperty } from '@nestjs/swagger';

export default class CreateCountryDTO {
  @ApiProperty({
    type: String,
  })
  readonly name: string = '';
}
