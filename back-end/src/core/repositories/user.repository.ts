import { Repository } from '@/core/base/repository';
import { UserEntity } from '@/core/domain/entities/user.entity';

export abstract class UserRepository extends Repository<UserEntity> {}
