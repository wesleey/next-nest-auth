import { Mapper } from '@/core/base/mapper';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { UpdatedUserDto } from '@/shared/dtos/user/updated-user.dto';

export class UpdatedUserMapper implements Mapper<UpdatedUserDto, UserEntity> {
  public mapFrom(data: UpdatedUserDto): UserEntity {
    const entity = new UserEntity();

    entity.id = data.id;
    entity.name = data.name;
    entity.email = data.email;
    entity.verified = data.verified;
    entity.enabled = data.enabled;
    entity.role = data.role;
    entity.createdAt = data.createdAt;
    entity.updatedAt = data.updatedAt;

    return entity;
  }

  public mapTo(entity: UserEntity): UpdatedUserDto {
    const data = new UpdatedUserDto();

    data.id = entity.id;
    data.name = entity.name;
    data.email = entity.email;
    data.verified = entity.verified;
    data.enabled = entity.enabled;
    data.role = entity.role;
    data.createdAt = entity.createdAt;
    data.updatedAt = entity.updatedAt;

    return data;
  }
}
