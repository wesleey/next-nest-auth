import { SessionRepository } from '@/core/repositories/session.repository';
import { SessionCacheMemoryRepository } from '@/infra/data/cache-memory/session-cache-memory.repository';
import { randomUUID } from 'node:crypto';
import { CreateSessionUseCase } from '../create-session';
import { RemoveSessionUseCase } from './remove-session.use-case';

describe('RemoveSessionUseCase', () => {
  let repository: SessionRepository;
  let createSessionUseCase: CreateSessionUseCase;
  let removeSessionUseCase: RemoveSessionUseCase;

  const userId = randomUUID();

  beforeEach(() => {
    repository = new SessionCacheMemoryRepository();
    createSessionUseCase = new CreateSessionUseCase(repository);
    removeSessionUseCase = new RemoveSessionUseCase(repository);
  });

  it('should be defined', () => {
    expect(removeSessionUseCase).toBeDefined();
  });

  it('should throw error when trying to remove a removed session', async () => {
    const createdSession = await createSessionUseCase.execute({
      user_id: userId,
    });

    await removeSessionUseCase.execute(createdSession.id);
    await expect(
      removeSessionUseCase.execute(createdSession.id),
    ).rejects.toThrowError('Session not found');
  });
});
