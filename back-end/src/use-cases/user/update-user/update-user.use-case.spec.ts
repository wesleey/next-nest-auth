import { UserRepository } from '@/core/repositories/user.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { CreateUserUseCase } from '../create-user';
import { UpdateUserUseCase } from './update-user.use-case';

describe('UpdateUserUseCase', () => {
  let repository: UserRepository;
  let createUserUseCase: CreateUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;

  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';

  beforeEach(() => {
    repository = new UserCacheMemoryRepository();
    createUserUseCase = new CreateUserUseCase(repository);
    updateUserUseCase = new UpdateUserUseCase(repository);
  });

  it('should be defined', () => {
    expect(updateUserUseCase).toBeDefined();
  });

  it('should update user', async () => {
    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    const updatedUser = await updateUserUseCase.execute(createdUser.id, {
      email: 'john123@gmail.com',
    });

    expect(updatedUser.email).toBe('john123@gmail.com');
  });

  it('should throw error when email address already exists', async () => {
    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    await expect(
      updateUserUseCase.execute(createdUser.id, {
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toThrowError('This email address already exists');
  });
});
