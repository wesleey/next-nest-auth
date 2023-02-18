import { UseCase } from '@/core/base/use-case';
import { SessionEntity } from '@/core/domain/entities/session.entity';
import { SessionRepository } from '@/core/repositories/session.repository';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';

export class FindOneSessionUseCase implements UseCase<SessionEntity> {
  constructor(private readonly repository: SessionRepository) {}

  async execute(id: string): Promise<SessionEntity> {
    const session = await this.repository.findOne({ id });

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }
}
