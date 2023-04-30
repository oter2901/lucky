import {
  Controller, Get, HttpCode, HttpStatus, UseInterceptors,
} from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import WrapResponseInterceptor from 'src/interceptors/wrap-response.interceptor';
import CityService from './city.service';
import CityResponseDTO from './dto/city-response.dto';

@ApiTags('Cities')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class CityController {
  constructor(
        private readonly cityService: CityService,
  ) {}

  @ApiOkResponse({
    type: [CityResponseDTO],
    description: '200, returns available cities',
  })
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
  @HttpCode(HttpStatus.OK)
  @Get()
  async getCities() {
    const cities = await this.cityService.findAll();

    return cities;
  }
}
