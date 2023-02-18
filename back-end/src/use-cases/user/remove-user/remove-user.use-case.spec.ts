import { UserRepository } from '@/core/repositories/user.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { CreateUserUseCase } from '../create-user';
import { RemoveUserUseCase } from './remove-user.use-case';

describe('RemoveUserUseCase', () => {
  let repository: UserRepository;
  let createUserUseCase: CreateUserUseCase;
  let removeUserUseCase: RemoveUserUseCase;

  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';

  beforeEach(() => {
    repository = new UserCacheMemoryRepository();
    createUserUseCase = new CreateUserUseCase(repository);
    removeUserUseCase = new RemoveUserUseCase(repository);
  });

  it('should be defined', () => {
    expect(removeUserUseCase).toBeDefined();
  });

  it('should throw error when trying to remove a removed user', async () => {
    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    await removeUserUseCase.execute(createdUser.id);
    await expect(
      removeUserUseCase.execute(createdUser.id),
    ).rejects.toThrowError('User not found');
  });
});
