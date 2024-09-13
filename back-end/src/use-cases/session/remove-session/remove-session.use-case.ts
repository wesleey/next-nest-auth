import { UseCase } from '@/core/base/use-case';
import { SessionRepository } from '@/core/repositories/session.repository';
import { FindOneSessionUseCase } from '../find-one-session/find-one-session.use-case';

export class RemoveSessionUseCase implements UseCase<void> {
  private findOneSessionUseCase: FindOneSessionUseCase;

  constructor(private readonly repository: SessionRepository) {
    this.findOneSessionUseCase = new FindOneSessionUseCase(repository);
  }

  async execute(id: string): Promise<void> {
    await this.findOneSessionUseCase.execute(id);
    return this.repository.remove(id);
  }
}
