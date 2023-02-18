import { SessionRepository } from '@/core/repositories/session.repository';
import { UserRepository } from '@/core/repositories/user.repository';
import { SessionCacheMemoryRepository } from '@/infra/data/cache-memory/session-cache-memory.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { CreateUserUseCase } from '@/use-cases/user/create-user';
import { GenerateCredentialsUseCase } from './generate-credentials.use-case';

import {
  verifyAccessToken,
  verifyRefreshToken,
} from '@/infra/dependencies/jsonwebtoken';

import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME,
} from '@/shared/constants/jwt';

describe('GenerateCredentialsUseCase', () => {
  let userRepository: UserRepository;
  let sessionRepository: SessionRepository;
  let createUserUseCase: CreateUserUseCase;
  let generateCredentialsUseCase: GenerateCredentialsUseCase;

  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';

  beforeEach(async () => {
    userRepository = new UserCacheMemoryRepository();
    sessionRepository = new SessionCacheMemoryRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
    generateCredentialsUseCase = new GenerateCredentialsUseCase(
      sessionRepository,
    );
  });

  it('should be defined', () => {
    expect(generateCredentialsUseCase).toBeDefined();
  });

  it('should generate credentials', async () => {
    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
      refresh_expires_in: refreshExpiresIn,
      token_type: tokenType,
    } = await generateCredentialsUseCase.execute(createdUser);

    const isValidAccessToken = !!verifyAccessToken(accessToken);
    expect(isValidAccessToken).toBe(true);

    const isValidRefreshToken = !!verifyRefreshToken(refreshToken);
    expect(isValidRefreshToken).toBe(true);

    expect(expiresIn).toBe(ACCESS_TOKEN_EXPIRATION_TIME);
    expect(refreshExpiresIn).toBe(REFRESH_TOKEN_EXPIRATION_TIME);
    expect(tokenType).toBe('Bearer');
  });
});
