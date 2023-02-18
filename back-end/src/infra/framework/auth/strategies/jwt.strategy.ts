import { ACCESS_TOKEN_PUBLIC_KEY } from '@/shared/constants/keys';
import { JwtPayload } from '@/shared/interfaces/jwt-payload.interface';
import { ValidateSessionUseCase } from '@/use-cases/auth/validate-session';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly validateSessionUseCase: ValidateSessionUseCase) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ACCESS_TOKEN_PUBLIC_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    await this.validateSessionUseCase.execute(payload.sid);
    return payload;
  }
}
