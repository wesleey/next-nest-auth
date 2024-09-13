import { SessionRepository } from '@/core/repositories/session.repository';
import { UserRepository } from '@/core/repositories/user.repository';
import { PrismaSessionRepository } from '@/infra/data/prisma/prisma-session.repository';
import { PrismaUserRepository } from '@/infra/data/prisma/prisma-user.repository';
import { PrismaService } from '@/infra/data/prisma/prisma.service';
import { GenerateCredentialsUseCase } from '@/use-cases/auth/generate-credentials';
import { RegisterUserUseCase } from '@/use-cases/auth/register-user';
import { ValidateSessionUseCase } from '@/use-cases/auth/validate-session';
import { ValidateUserUseCase } from '@/use-cases/auth/validate-user';
import { RemoveSessionUseCase } from '@/use-cases/session/remove-session';
import { FindOneUserUseCase } from '@/use-cases/user/find-one-user';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: SessionRepository,
      useFactory: (prisma: PrismaService) =>
        new PrismaSessionRepository(prisma),
      inject: [PrismaService],
    },
    {
      provide: UserRepository,
      useFactory: (prisma: PrismaService) => new PrismaUserRepository(prisma),
      inject: [PrismaService],
    },
    ...[
      GenerateCredentialsUseCase,
      ValidateSessionUseCase,
      RemoveSessionUseCase,
    ].map((UseCase) => ({
      provide: UseCase,
      useFactory: (repository: SessionRepository) => new UseCase(repository),
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
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('auth/login');
  }
}
