import { Role } from '@/core/domain/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { CreatedUserMapper } from './created-user.mapper';

describe('CreatedUserMapper', () => {
  let createdUserMapper: CreatedUserMapper;

  const id = randomUUID();
  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';
  const verified = false;
  const enabled = true;
  const role = Role.USER;
  const createdAt = new Date();
  const updatedAt = new Date();

  beforeEach(() => {
    createdUserMapper = new CreatedUserMapper();
  });

  it('should be defined', () => {
    expect(createdUserMapper).toBeDefined();
  });

  it('should map from', () => {
    const entity = createdUserMapper.mapFrom({
      id,
      name,
      email,
      verified,
      enabled,
      role,
      createdAt,
      updatedAt,
    });

    expect(entity).toEqual({
      id,
      name,
      email,
      verified,
      enabled,
      role,
      createdAt,
      updatedAt,
    });
  });

  it('should map to', () => {
    const data = createdUserMapper.mapTo({
      id,
      name,
      email,
      password,
      verified,
      enabled,
      role,
      createdAt,
      updatedAt,
    });

    expect(data).toEqual({
      id,
      name,
      email,
      verified,
      enabled,
      role,
      createdAt,
      updatedAt,
    });
  });
});
