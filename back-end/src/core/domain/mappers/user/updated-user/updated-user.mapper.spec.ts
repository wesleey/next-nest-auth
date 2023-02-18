import { Role } from '@/core/domain/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { UpdatedUserMapper } from './updated-user.mapper';

describe('UpdatedUserMapper', () => {
  let updatedUserMapper: UpdatedUserMapper;

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
    updatedUserMapper = new UpdatedUserMapper();
  });

  it('should be defined', () => {
    expect(updatedUserMapper).toBeDefined();
  });

  it('should map from', () => {
    const entity = updatedUserMapper.mapFrom({
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
    const data = updatedUserMapper.mapTo({
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
