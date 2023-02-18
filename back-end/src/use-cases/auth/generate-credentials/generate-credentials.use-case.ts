import { UseCase } from '@/core/base/use-case';
import { SessionRepository } from '@/core/repositories/session.repository';
import { GeneratedCredentialsDto } from '@/shared/dtos/auth/generated-credentials.dto';
import { CreatedUserDto } from '@/shared/dtos/user/created-user.dto';
import { JwtPayload } from '@/shared/interfaces/jwt-payload.interface';
import { CreateSessionUseCase } from '@/use-cases/session/create-session';

import {
  generateAccessToken,
  generateRefreshToken,
} from '@/infra/dependencies/jsonwebtoken';

import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from '@/shared/constants/jwt';

export class GenerateCredentialsUseCase
  implements UseCase<GeneratedCredentialsDto>
{
  private createSessionUseCase: CreateSessionUseCase;

  constructor(private readonly repository: SessionRepository) {
    this.createSessionUseCase = new CreateSessionUseCase(repository);
  }

  async execute(user: CreatedUserDto): Promise<GeneratedCredentialsDto> {
    const createdSession = await this.createSessionUseCase.execute({
      user_id: user.id,
    });

    const accessTokenPayload: JwtPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      typ: 'Bearer',
      session_state: createdSession.id,
      sid: createdSession.id,
    };

    const refreshTokenPayload: JwtPayload = {
      sub: user.id,
      typ: 'Refresh',
      session_state: createdSession.id,
      sid: createdSession.id,
    };

    const accessToken = generateAccessToken(accessTokenPayload);
    const refreshToken = generateRefreshToken(refreshTokenPayload);

    return {
      access_token: accessToken,
      expires_in: ACCESS_TOKEN_EXPIRATION_TIME,
      refresh_expires_in: REFRESH_TOKEN_EXPIRATION_TIME,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      session_state: createdSession.id,
    };
  }
}
