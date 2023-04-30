import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import UsersModule from '../users/users.module';

import LocalStrategy from './strategies/local.strategy';
import JwtAccessStrategy from './strategies/jwt-access.strategy';
import JwtRefreshStrategy from './strategies/jwt-refresh.strategy';

import AuthRepository from './auth.repository';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import ProfileModule from '../profiles/profile.module';

@Module({
  imports: [
    UsersModule,
    ProfileModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (cfg: ConfigService) => ({ secret: cfg.get('JWT_SECRET') || 'super-secret' }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtAccessStrategy,
    JwtRefreshStrategy,
    AuthRepository,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export default class AuthModule {}
