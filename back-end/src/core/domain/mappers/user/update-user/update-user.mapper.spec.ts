import { Role } from '@/core/domain/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { UpdateUserMapper } from './update-user.mapper';

describe('UpdateUserMapper', () => {
  let updateUserMapper: UpdateUserMapper;

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
    updateUserMapper = new UpdateUserMapper();
  });

  it('should be defined', () => {
    expect(updateUserMapper).toBeDefined();
  });

  it('should map from', () => {
    const entity = updateUserMapper.mapFrom({
      id,
      name,
      email,
      password,
      role,
    });

    expect(entity).toEqual({ name, email, password });
  });

  it('should map to', () => {
    const data = updateUserMapper.mapTo({
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
      password,
      role,
    });
  });
});
