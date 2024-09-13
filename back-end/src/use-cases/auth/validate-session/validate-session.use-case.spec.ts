import { SessionRepository } from '@/core/repositories/session.repository';
import { SessionCacheMemoryRepository } from '@/infra/data/cache-memory/session-cache-memory.repository';
import { CreateSessionUseCase } from '@/use-cases/session/create-session';
import { randomUUID } from 'node:crypto';
import { ValidateSessionUseCase } from './validate-session.use-case';

describe('ValidateSessionUseCase', () => {
  let repository: SessionRepository;
  let createSessionUseCase: CreateSessionUseCase;
  let validateSessionUseCase: ValidateSessionUseCase;

  const userId = randomUUID();

  beforeEach(() => {
    repository = new SessionCacheMemoryRepository();
    createSessionUseCase = new CreateSessionUseCase(repository);
    validateSessionUseCase = new ValidateSessionUseCase(repository);
  });

  it('should be defined', () => {
    expect(validateSessionUseCase).toBeDefined();
  });

  it('should return session if not expired', async () => {
    const createdSession = await createSessionUseCase.execute({
      user_id: userId,
    });

    const session = await validateSessionUseCase.execute(createdSession.id);
    expect(session).toEqual(createdSession);
  });
});
