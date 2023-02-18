import { UserEntity } from '@/core/domain/entities/user.entity';
import { UserRepository } from '@/core/repositories/user.repository';
import { RepositoryCacheMemory } from '@/infra/data/cache-memory/repository-cache-memory';

export class UserCacheMemoryRepository
  extends RepositoryCacheMemory<UserEntity>
  implements UserRepository {}
