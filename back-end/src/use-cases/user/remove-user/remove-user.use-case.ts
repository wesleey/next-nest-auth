import { UseCase } from '@/core/base/use-case';
import { UserRepository } from '@/core/repositories/user.repository';
import { FindOneUserUseCase } from '../find-one-user';

export class RemoveUserUseCase implements UseCase<void> {
  private findOneUserUseCase: FindOneUserUseCase;

  constructor(private readonly repository: UserRepository) {
    this.findOneUserUseCase = new FindOneUserUseCase(repository);
  }

  public async execute(id: string): Promise<void> {
    await this.findOneUserUseCase.execute(id);
    return this.repository.remove(id);
  }
}
