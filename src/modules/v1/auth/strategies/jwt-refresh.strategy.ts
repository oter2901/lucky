import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import UserEntity from '../../users/schemas/user.entity';

@Injectable()
export default class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refreshToken') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_TOKEN'),
    });
  }

  async validate(payload: UserEntity) {
    return {
      id: payload.id,
      username: payload.username,
    };
  }
}
