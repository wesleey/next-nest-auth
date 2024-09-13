import { Mapper } from '@/core/base/mapper';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { UpdateUserDto } from '@/shared/dtos/user/update-user.dto';

export class UpdateUserMapper implements Mapper<UpdateUserDto, UserEntity> {
  public mapFrom(data: UpdateUserDto): UserEntity {
    const entity = new UserEntity();

    entity.name = data.name;
    entity.email = data.email;
    entity.password = data.password;

    return entity;
  }

  public mapTo(entity: UserEntity): UpdateUserDto {
    const data = new UpdateUserDto();

    data.id = entity.id;
    data.name = entity.name;
    data.email = entity.email;
    data.password = entity.password;
    data.role = entity.role;

    return data;
  }
}
