import { SessionRepository } from '@/core/repositories/session.repository';
import { SessionCacheMemoryRepository } from '@/infra/data/cache-memory/session-cache-memory.repository';
import { CreateSessionUseCase } from '@/use-cases/session/create-session';
import { FindOneSessionUseCase } from '@/use-cases/session/find-one-session';
import { RemoveSessionUseCase } from '@/use-cases/session/remove-session';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'node:crypto';
import { SessionController } from './session.controller';

describe('SessionController', () => {
  let sessionController: SessionController;

  const userId = randomUUID();

  beforeEach(async () => {
    const sessionModule: TestingModule = await Test.createTestingModule({
      controllers: [SessionController],
      providers: [
        {
          provide: SessionRepository,
          useClass: SessionCacheMemoryRepository,
        },
        ...[
          CreateSessionUseCase,
          FindOneSessionUseCase,
          RemoveSessionUseCase,
        ].map((UseCase) => ({
          provide: UseCase,
          useFactory: (repository: SessionRepository) =>
            new UseCase(repository),
          inject: [SessionRepository],
        })),
      ],
    }).compile();

    sessionController = sessionModule.get<SessionController>(SessionController);
  });

  it('should be defined', () => {
    expect(sessionController).toBeDefined();
  });

  it('should create session', async () => {
    const createdSession = await sessionController.createSession({
      user_id: userId,
    });

    expect(createdSession.userId).toBe(userId);
  });

  it('should find one session', async () => {
    const createdSession = await sessionController.createSession({
      user_id: userId,
    });

    const session = await sessionController.findOneSession(createdSession.id);
    expect(session).toEqual(createdSession);
  });
});
