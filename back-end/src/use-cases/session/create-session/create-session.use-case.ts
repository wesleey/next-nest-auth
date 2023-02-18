import { UseCase } from '@/core/base/use-case';
import { SessionEntity } from '@/core/domain/entities/session.entity';
import { SessionRepository } from '@/core/repositories/session.repository';
import { generateExpirationTime } from '@/infra/dependencies/dayjs';
import { CreateSessionDto } from '@/shared/dtos/session/create-session.dto';

export class CreateSessionUseCase implements UseCase<SessionEntity> {
  constructor(private readonly repository: SessionRepository) {}

  async execute({ user_id: userId }: CreateSessionDto): Promise<SessionEntity> {
    const expiresIn = generateExpirationTime(30, 'days');

    const createdSession = await this.repository.create({
      userId,
      expiresIn,
    });

    return createdSession;
  }
}
