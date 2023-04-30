import {
  ApiBody, ApiInternalServerErrorResponse, ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller, HttpCode, HttpStatus, Post, UseInterceptors,
} from '@nestjs/common';

import WrapResponseInterceptor from '../../../interceptors/wrap-response.interceptor';
import CountryService from './country.service';
import CreateCountryDTO from './dto/create-country.dto';

@ApiTags('Country')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class CountryController {
  constructor(
        private readonly countryService: CountryService,
  ) {}

  @ApiBody({ type: CreateCountryDTO })
  @ApiInternalServerErrorResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
        details: {},
      },
    },
    description: '500. InternalServerError',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async signUp(@Body() { name }: CreateCountryDTO) {
    return this.countryService.create(name);
  }
}
