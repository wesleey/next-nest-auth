import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers/user/created-user';
import { UserRepository } from '@/core/repositories/user.repository';
import { checkPassword } from '@/infra/dependencies/bcrypt';
import { CreatedUserDto } from '@/shared/dtos/user/created-user.dto';
import { UnauthorizedException } from '@/shared/exceptions/unauthorized.exception';

export class ValidateUserUseCase implements UseCase<CreatedUserDto> {
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(
    email: string,
    password: string,
  ): Promise<CreatedUserDto> {
    const user = await this.repository.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    const passwordMatch = await checkPassword(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid user credentials');
    }

    return this.createdUserMapper.mapTo(user);
  }
}
