import { Repository } from '@/core/base/repository';
import { SessionEntity } from '@/core/domain/entities/session.entity';

export abstract class SessionRepository extends Repository<SessionEntity> {}
