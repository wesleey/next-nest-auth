import { SessionRepository } from '@/core/repositories/session.repository';
import { SessionCacheMemoryRepository } from '@/infra/data/cache-memory/session-cache-memory.repository';
import { randomUUID } from 'node:crypto';
import { CreateSessionUseCase } from '../create-session';
import { FindOneSessionUseCase } from './find-one-session.use-case';

describe('FindOneSessionUseCase', () => {
  let repository: SessionRepository;
  let createSessionUseCase: CreateSessionUseCase;
  let findOneSessionUseCase: FindOneSessionUseCase;

  const userId = randomUUID();

  beforeEach(() => {
    repository = new SessionCacheMemoryRepository();
    createSessionUseCase = new CreateSessionUseCase(repository);
    findOneSessionUseCase = new FindOneSessionUseCase(repository);
  });

  it('should be defined', () => {
    expect(findOneSessionUseCase).toBeDefined();
  });

  it('should find one session', async () => {
    const createdSession = await createSessionUseCase.execute({
      user_id: userId,
    });

    const session = await findOneSessionUseCase.execute(createdSession.id);
    expect(session).toEqual(createdSession);
  });
});
