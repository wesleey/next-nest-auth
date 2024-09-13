import { Mapper } from '@/core/base/mapper';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { CreateUserDto } from '@/shared/dtos/user/create-user.dto';

export class CreateUserMapper extends Mapper<CreateUserDto, UserEntity> {
  public mapFrom(data: CreateUserDto): UserEntity {
    const entity = new UserEntity();

    entity.name = data.name;
    entity.email = data.email;
    entity.password = data.password;
    entity.verified = data.verified;
    entity.enabled = data.enabled;
    entity.role = data.role;

    return entity;
  }

  public mapTo(entity: UserEntity): CreateUserDto {
    const data = new CreateUserDto();

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
