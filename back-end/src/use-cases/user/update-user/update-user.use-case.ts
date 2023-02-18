import { UseCase } from '@/core/base/use-case';
import { UpdateUserMapper } from '@/core/domain/mappers/user/update-user';
import { UpdatedUserMapper } from '@/core/domain/mappers/user/updated-user';
import { UserRepository } from '@/core/repositories/user.repository';
import { hashPassword } from '@/infra/dependencies/bcrypt';
import { UpdateUserDto } from '@/shared/dtos/user/update-user.dto';
import { UpdatedUserDto } from '@/shared/dtos/user/updated-user.dto';
import { ConflictException } from '@/shared/exceptions/conflict.exception';

export class UpdateUserUseCase implements UseCase<UpdatedUserDto> {
  private updateUserMapper: UpdateUserMapper;
  private updatedUserMapper: UpdatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.updateUserMapper = new UpdateUserMapper();
    this.updatedUserMapper = new UpdatedUserMapper();
  }

  public async execute(
    id: string,
    data: UpdateUserDto,
  ): Promise<UpdatedUserDto> {
    const user = this.updateUserMapper.mapFrom(data);
    const { email, password } = user;

    if (email) {
      const emailAlreadyExists = await this.repository.findOne({ email });
      if (emailAlreadyExists) {
        throw new ConflictException('This email address already exists');
      }
    }

    if (password) {
      user.password = await hashPassword(password);
    }

    const updatedUser = await this.repository.update(id, user);
    return this.updatedUserMapper.mapTo(updatedUser);
  }
}
