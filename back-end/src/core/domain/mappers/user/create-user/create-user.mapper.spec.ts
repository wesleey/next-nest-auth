import { Role } from '@/core/domain/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { CreateUserMapper } from './create-user.mapper';

describe('CreateUserMapper', () => {
  let createUserMapper: CreateUserMapper;

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
    createUserMapper = new CreateUserMapper();
  });

  it('should be defined', () => {
    expect(createUserMapper).toBeDefined();
  });

  it('should map from', () => {
    const entity = createUserMapper.mapFrom({
      id,
      name,
      email,
      password,
      verified,
      enabled,
      role,
    });

    expect(entity).toEqual({
      name,
      email,
      password,
      verified,
      enabled,
      role,
    });
  });

  it('should map to', () => {
    const data = createUserMapper.mapTo({
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
      verified,
      enabled,
      role,
    });
  });
});
