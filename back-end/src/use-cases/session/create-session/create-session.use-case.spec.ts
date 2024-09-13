import { SessionRepository } from '@/core/repositories/session.repository';
import { SessionCacheMemoryRepository } from '@/infra/data/cache-memory/session-cache-memory.repository';
import { randomUUID } from 'node:crypto';
import { CreateSessionUseCase } from './create-session.use-case';

describe('CreateSessionUseCase', () => {
  let repositoy: SessionRepository;
  let createSessionUseCase: CreateSessionUseCase;

  const userId = randomUUID();

  beforeEach(() => {
    repositoy = new SessionCacheMemoryRepository();
    createSessionUseCase = new CreateSessionUseCase(repositoy);
  });

  it('should be defined', () => {
    expect(createSessionUseCase).toBeDefined();
  });

  it('should create session', async () => {
    const createdSession = await createSessionUseCase.execute({
      user_id: userId,
    });

    expect(createdSession.userId).toBe(userId);
  });
});
