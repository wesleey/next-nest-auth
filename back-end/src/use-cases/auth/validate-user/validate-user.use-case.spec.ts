import { UserRepository } from '@/core/repositories/user.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { CreateUserUseCase } from '@/use-cases/user/create-user';
import { ValidateUserUseCase } from './validate-user.use-case';

describe('ValidateUserUseCase', () => {
  let repository: UserRepository;
  let createUserUseCase: CreateUserUseCase;
  let validateUserUseCase: ValidateUserUseCase;

  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';

  beforeEach(async () => {
    repository = new UserCacheMemoryRepository();
    validateUserUseCase = new ValidateUserUseCase(repository);
    createUserUseCase = new CreateUserUseCase(repository);

    await createUserUseCase.execute({ name, email, password });
  });

  it('should be defined', () => {
    expect(validateUserUseCase).toBeDefined();
  });

  it('should return user when credentials are valid', async () => {
    const user = await validateUserUseCase.execute(email, password);
    expect({ name: user.name, email: user.email }).toEqual({ name, email });
  });

  it('should throw error when credentials are invalid', async () => {
    await expect(
      validateUserUseCase.execute('john123@gmail.com', '123456'),
    ).rejects.toThrowError('Invalid user credentials');
  });
});
