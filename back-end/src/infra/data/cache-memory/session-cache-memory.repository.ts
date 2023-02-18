import { SessionEntity } from '@/core/domain/entities/session.entity';
import { SessionRepository } from '@/core/repositories/session.repository';
import { RepositoryCacheMemory } from '@/infra/data/cache-memory/repository-cache-memory';

export class SessionCacheMemoryRepository
  extends RepositoryCacheMemory<SessionEntity>
  implements SessionRepository {}
