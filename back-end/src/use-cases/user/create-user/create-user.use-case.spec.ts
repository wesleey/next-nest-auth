import { UserRepository } from '@/core/repositories/user.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { CreateUserUseCase } from '@/use-cases/user/create-user';

describe('CreateUserUseCase', () => {
  let repository: UserRepository;
  let createUserUseCase: CreateUserUseCase;

  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';

  beforeEach(() => {
    repository = new UserCacheMemoryRepository();
    createUserUseCase = new CreateUserUseCase(repository);
  });

  it('should be defined', () => {
    expect(createUserUseCase).toBeDefined();
  });

  it('should create user', async () => {
    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    expect({
      name: createdUser.name,
      email: createdUser.email,
    }).toEqual({ name, email });
  });

  it('should throw error when email address already exists', async () => {
    await createUserUseCase.execute({ name, email, password });
    await expect(
      createUserUseCase.execute({ name, email, password }),
    ).rejects.toThrowError('This email address already exists');
  });
});
