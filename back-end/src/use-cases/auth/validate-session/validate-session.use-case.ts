import { UseCase } from '@/core/base/use-case';
import { SessionEntity } from '@/core/domain/entities/session.entity';
import { SessionRepository } from '@/core/repositories/session.repository';
import { hasExpired } from '@/infra/dependencies/dayjs';
import { BadRequestException } from '@/shared/exceptions/bad-request.exception';
import { FindOneSessionUseCase } from '@/use-cases/session/find-one-session';
import { RemoveSessionUseCase } from '@/use-cases/session/remove-session';

export class ValidateSessionUseCase implements UseCase<SessionEntity> {
  private findOneSessionUseCase: FindOneSessionUseCase;
  private removeSessionUseCase: RemoveSessionUseCase;

  constructor(private readonly repository: SessionRepository) {
    this.findOneSessionUseCase = new FindOneSessionUseCase(repository);
    this.removeSessionUseCase = new RemoveSessionUseCase(repository);
  }

  async execute(sessionId: string): Promise<SessionEntity> {
    const session = await this.findOneSessionUseCase.execute(sessionId);

    const sessionExpired = hasExpired(session.expiresIn);
    if (sessionExpired) {
      await this.removeSessionUseCase.execute(session.id);
      throw new BadRequestException('Session expired');
    }

    return session;
  }
}
