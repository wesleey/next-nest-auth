import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers/user/created-user';
import { UserRepository } from '@/core/repositories/user.repository';
import { CreatedUserDto } from '@/shared/dtos/user/created-user.dto';

export class FindAllUsersUseCase implements UseCase<CreatedUserDto[]> {
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(): Promise<CreatedUserDto[]> {
    const users = await this.repository.findAll();
    return users.map((user) => this.createdUserMapper.mapTo(user));
  }
}
