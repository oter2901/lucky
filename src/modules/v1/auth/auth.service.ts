import * as bcrypt from 'bcryptjs';
import { Injectable, NotFoundException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import UsersService from '../users/users.service';
import SignUpDto from './dto/sign-up.dto';
import { LoginPayload } from './interfaces/login-payload.interface';
import AuthRepository from './auth.repository';
import ProfileService from '../profiles/profile.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly usersService: UsersService,
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signUp(payload: SignUpDto) {
    await this.usersService.userExists(payload.username);
    const hashedPassword = await bcrypt.hash(payload.password, 10);

    await this.usersService.create({ ...payload, password: hashedPassword });

    return {};
  }

  public async signIn(payload: LoginPayload) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXP') || 3600,
      secret: this.configService.get<string>('ACCESS_TOKEN'),
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXP') || '2 days',
      secret: this.configService.get<string>('REFRESH_TOKEN'),
    });

    await this.authRepository.addRefreshToken(
      payload.username as string,
      refreshToken,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  public async validateUser(username: string, password: string) {
    const user = await this.usersService.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('The item does not exist');
    }

    const passwordCompared = await bcrypt.compare(password, user.password);

    if (!passwordCompared) {
      throw new NotFoundException('The item does not exist');
    }

    const profile = await this.profileService.getProfileByUsername(username);

    return {
      username: profile.user.username,
      id: profile.id,
      name: profile.name,
      address: {
        street: profile.address.street,
        city: profile.address.city.name,
        country: profile.address.city.country.name,
      },
    };
  }

  public async verifyToken(token: string, secret:string) {
    try {
      const { id, name, address } = await this.jwtService.verifyAsync(token, { secret });

      return { id, name, address };
    } catch (error) {
      return null;
    }
  }
}
