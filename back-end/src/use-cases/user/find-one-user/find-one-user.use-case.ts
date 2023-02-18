import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers/user/created-user';
import { UserRepository } from '@/core/repositories/user.repository';
import { CreatedUserDto } from '@/shared/dtos/user/created-user.dto';
import { NotFoundException } from '@/shared/exceptions/not-found.exception';

export class FindOneUserUseCase implements UseCase<CreatedUserDto> {
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(id: string): Promise<CreatedUserDto> {
    const user = await this.repository.findOne({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.createdUserMapper.mapTo(user);
  }
}
