import { Role } from '@/core/domain/entities/user.entity';
import { randomUUID } from 'node:crypto';
import { RegisterUserMapper } from './register-user.mapper';

describe('RegisterUserMapper', () => {
  let registerUserMapper: RegisterUserMapper;

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
    registerUserMapper = new RegisterUserMapper();
  });

  it('should be defined', () => {
    expect(registerUserMapper).toBeDefined();
  });

  it('should map from', () => {
    const entity = registerUserMapper.mapFrom({
      id,
      name,
      email,
      password,
      verified,
      enabled,
      role,
    });

    expect(entity).toEqual({ name, email, password });
  });

  it('should map to', () => {
    const data = registerUserMapper.mapTo({
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
