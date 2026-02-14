/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';

interface JwtPayload {
  sub: string;
  email: string;
  role: 'PLAYER' | 'admin';
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const jwtFromRequest: JwtFromRequestFunction = (req) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not defined in .env');
    }

    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      jwtFromRequest,
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  validate(payload: JwtPayload) {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
