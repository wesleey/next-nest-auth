import { Mapper } from '@/core/base/mapper';
import { UserEntity } from '@/core/domain/entities/user.entity';
import { CreatedUserDto } from '@/shared/dtos/user/created-user.dto';

export class CreatedUserMapper implements Mapper<CreatedUserDto, UserEntity> {
  public mapFrom(data: CreatedUserDto): UserEntity {
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

  public mapTo(entity: UserEntity): CreatedUserDto {
    const data = new CreatedUserDto();

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
