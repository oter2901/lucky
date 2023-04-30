import { Request as ExpressRequest } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import JwtAccessGuard from 'src/guards/jwt-access.guard';
import AuthBearer from 'src/decorators/auth-bearer.decorator';
import WrapResponseInterceptor from '../../../interceptors/wrap-response.interceptor';
import UsersService from '../users/users.service';

import AuthService from './auth.service';
import JwtTokensDto from './dto/jwt-tokens.dto';
import SignUpDto from './dto/sign-up.dto';
import SignInDto from './dto/sign-in.dto';
import LocalAuthGuard from './guards/local-auth.guard';
import { LoginPayload } from './interfaces/login-payload.interface';
import UserEntity from '../users/schemas/user.entity';

@ApiTags('Auth')
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(JwtTokensDto)
@Controller()
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @ApiBody({ type: SignUpDto })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: [
          {
            target: {
              email: 'string',
              password: 'string',
              cityId: 'number',
              address: 'string',
              name: 'string',
            },
            value: 'string',
            property: 'string',
            children: [],
            constraints: {},
          },
        ],
        error: 'Bad Request',
      },
    },
    description: '400. ValidationException',
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
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }

  @ApiBody({ type: SignInDto })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(JwtTokensDto),
        },
      },
    },
    description: 'Returns jwt token',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: {
        message: [
          {
            target: {
              email: 'string',
              password: 'string',
            },
            value: 'string',
            property: 'string',
            children: [],
            constraints: {},
          },
        ],
        error: 'Bad Request',
      },
    },
    description: '400. ValidationException',
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
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req: ExpressRequest) {
    const user = req.user as LoginPayload;

    return this.authService.signIn(user);
  }

  @ApiOkResponse({
    type: UserEntity,
    description: '200, returns a decoded user from access token',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '403, says you Unauthorized',
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
  @ApiBearerAuth()
  @UseGuards(JwtAccessGuard)
  @Get()
  async getUserByAccessToken(@AuthBearer() token: string) {
    const decodedProfile = await this.authService.verifyToken(
      token,
      this.configService.get<string>('ACCESS_TOKEN'),
    );

    if (!decodedProfile) {
      throw new ForbiddenException('Incorrect token');
    }

    return decodedProfile;
  }
}
