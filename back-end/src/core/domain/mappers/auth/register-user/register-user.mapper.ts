import { Mapper } from '@/core/base/mapper';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { RegisterUserDto } from '@/shared/dtos/auth/register-user.dto';

export class RegisterUserMapper extends Mapper<RegisterUserDto, UserEntity> {
  public mapFrom(data: RegisterUserDto): UserEntity {
    const entity = new UserEntity();

    entity.name = data.name;
    entity.email = data.email;
    entity.password = data.password;

    return entity;
  }

  public mapTo(entity: UserEntity): RegisterUserDto {
    const data = new RegisterUserDto();

    data.id = entity.id;
    data.name = entity.name;
    data.email = entity.email;
    data.password = entity.password;
    data.verified = entity.verified;
    data.enabled = entity.enabled;
    data.role = entity.role;

    return data;
  }
}
