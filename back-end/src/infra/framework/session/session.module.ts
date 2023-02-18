import { SessionRepository } from '@/core/repositories/session.repository';
import { PrismaSessionRepository } from '@/infra/data/prisma/prisma-session.repository';
import { PrismaService } from '@/infra/data/prisma/prisma.service';
import { CreateSessionUseCase } from '@/use-cases/session/create-session';
import { FindOneSessionUseCase } from '@/use-cases/session/find-one-session';
import { RemoveSessionUseCase } from '@/use-cases/session/remove-session';
import { Module } from '@nestjs/common';
import { SessionController } from './session.controller';

@Module({
  controllers: [SessionController],
  providers: [
    PrismaService,
    {
      provide: SessionRepository,
      useFactory: (prisma: PrismaService) =>
        new PrismaSessionRepository(prisma),
      inject: [PrismaService],
    },
    ...[CreateSessionUseCase, FindOneSessionUseCase, RemoveSessionUseCase].map(
      (UseCase) => ({
        provide: UseCase,
        useFactory: (repository: SessionRepository) => new UseCase(repository),
        inject: [SessionRepository],
      }),
    ),
  ],
})
export class SessionModule {}
