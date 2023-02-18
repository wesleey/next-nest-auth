import { REFRESH_TOKEN_PUBLIC_KEY } from '@/shared/constants/keys';
import { JwtPayload } from '@/shared/interfaces/jwt-payload.interface';
import { ValidateSessionUseCase } from '@/use-cases/auth/validate-session';
import { RemoveSessionUseCase } from '@/use-cases/session/remove-session';
import { FindOneUserUseCase } from '@/use-cases/user/find-one-user';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly validateSessionUseCase: ValidateSessionUseCase,
    private readonly removeSessionUseCase: RemoveSessionUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: REFRESH_TOKEN_PUBLIC_KEY,
    });
  }

  async validate(payload: JwtPayload) {
    await this.validateSessionUseCase.execute(payload.sid);
    await this.removeSessionUseCase.execute(payload.sid);
    return this.findOneUserUseCase.execute(payload.sub);
  }
}
