import { UseCase } from '@/core/base/use-case';
import { CreateUserMapper } from '@/core/domain/mappers/user/create-user';
import { CreatedUserMapper } from '@/core/domain/mappers/user/created-user';
import { UserRepository } from '@/core/repositories/user.repository';
import { hashPassword } from '@/infra/dependencies/bcrypt';
import { CreateUserDto } from '@/shared/dtos/user/create-user.dto';
import { CreatedUserDto } from '@/shared/dtos/user/created-user.dto';
import { ConflictException } from '@/shared/exceptions/conflict.exception';

export class CreateUserUseCase implements UseCase<CreatedUserDto> {
  private createUserMapper: CreateUserMapper;
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.createUserMapper = new CreateUserMapper();
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(data: CreateUserDto): Promise<CreatedUserDto> {
    const entity = this.createUserMapper.mapFrom(data);

    const emailAlreadyExists = await this.repository.findOne({
      email: entity.email,
    });

    if (emailAlreadyExists) {
      throw new ConflictException('This email address already exists');
    }

    const hashedPassword = await hashPassword(entity.password);
    const createdUser = await this.repository.create({
      ...entity,
      password: hashedPassword,
    });

    return this.createdUserMapper.mapTo(createdUser);
  }
}
