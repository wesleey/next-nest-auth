import { SessionRepository } from '@/core/repositories/session.repository';
import { UserRepository } from '@/core/repositories/user.repository';
import { SessionCacheMemoryRepository } from '@/infra/data/cache-memory/session-cache-memory.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { GenerateCredentialsUseCase } from '@/use-cases/auth/generate-credentials';
import { RegisterUserUseCase } from '@/use-cases/auth/register-user';
import { ValidateSessionUseCase } from '@/use-cases/auth/validate-session';
import { ValidateUserUseCase } from '@/use-cases/auth/validate-user';
import { RemoveSessionUseCase } from '@/use-cases/session/remove-session';
import { FindOneUserUseCase } from '@/use-cases/user/find-one-user';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const authModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: SessionRepository,
          useClass: SessionCacheMemoryRepository,
        },
        {
          provide: UserRepository,
          useClass: UserCacheMemoryRepository,
        },
        ...[
          GenerateCredentialsUseCase,
          ValidateSessionUseCase,
          RemoveSessionUseCase,
        ].map((UseCase) => ({
          provide: UseCase,
          useFactory: (repository: SessionRepository) =>
            new UseCase(repository),
          inject: [SessionRepository],
        })),
        ...[RegisterUserUseCase, ValidateUserUseCase, FindOneUserUseCase].map(
          (UseCase) => ({
            provide: UseCase,
            useFactory: (repository: UserRepository) => new UseCase(repository),
            inject: [UserRepository],
          }),
        ),
        {
          provide: JwtStrategy,
          useFactory: (validateSessionUseCase: ValidateSessionUseCase) =>
            new JwtStrategy(validateSessionUseCase),
          inject: [ValidateSessionUseCase],
        },
        {
          provide: LocalStrategy,
          useFactory: (validateUserUseCase: ValidateUserUseCase) =>
            new LocalStrategy(validateUserUseCase),
          inject: [ValidateUserUseCase],
        },
        {
          provide: RefreshStrategy,
          useFactory: (
            validateSessionUseCase: ValidateSessionUseCase,
            removeSessionUseCase: RemoveSessionUseCase,
            findOneUserUseCase: FindOneUserUseCase,
          ) =>
            new RefreshStrategy(
              validateSessionUseCase,
              removeSessionUseCase,
              findOneUserUseCase,
            ),
          inject: [
            ValidateSessionUseCase,
            RemoveSessionUseCase,
            FindOneUserUseCase,
          ],
        },
      ],
    }).compile();

    authController = authModule.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });
});
