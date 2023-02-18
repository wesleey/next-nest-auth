import { UseCase } from '@/core/base/use-case';
import { RegisterUserMapper } from '@/core/domain/mappers/auth/register-user';
import { UserRepository } from '@/core/repositories/user.repository';
import { RegisterUserDto } from '@/shared/dtos/auth/register-user.dto';
import { CreatedUserDto } from '@/shared/dtos/user/created-user.dto';
import { CreateUserUseCase } from '@/use-cases/user/create-user';

export class RegisterUserUseCase implements UseCase<CreatedUserDto> {
  private registerUserMapper: RegisterUserMapper;
  private createUserUseCase: CreateUserUseCase;

  constructor(private readonly userRepository: UserRepository) {
    this.registerUserMapper = new RegisterUserMapper();
    this.createUserUseCase = new CreateUserUseCase(userRepository);
  }

  async execute(data: RegisterUserDto): Promise<CreatedUserDto> {
    const entity = this.registerUserMapper.mapFrom(data);
    const registeredUser = await this.createUserUseCase.execute(entity);
    return registeredUser;
  }
}
