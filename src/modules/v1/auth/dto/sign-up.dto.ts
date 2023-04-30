import {
  IsNotEmpty,
  MinLength,
  IsString,
  MaxLength,
  Min,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class SignUpDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(128)
    username: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(64)
    password: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
    name: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(128)
    address: string = '';

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
    cityId: number;
}
