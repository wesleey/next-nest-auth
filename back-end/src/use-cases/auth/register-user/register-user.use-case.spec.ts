import { UserRepository } from '@/core/repositories/user.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { RegisterUserUseCase } from './register-user.use-case';

describe('RegisterUserUseCase', () => {
  let userRepository: UserRepository;
  let registerUserUseCase: RegisterUserUseCase;

  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';

  beforeEach(() => {
    userRepository = new UserCacheMemoryRepository();
    registerUserUseCase = new RegisterUserUseCase(userRepository);
  });

  it('should be defined', () => {
    expect(registerUserUseCase).toBeDefined();
  });

  it('should register user', async () => {
    const registeredUser = await registerUserUseCase.execute({
      name,
      email,
      password,
    });

    expect({
      name: registeredUser.name,
      email: registeredUser.email,
    }).toEqual({ name, email });
  });

  it('should throw error when email address already exists', async () => {
    await registerUserUseCase.execute({ name, email, password });
    await expect(
      registerUserUseCase.execute({ name, email, password }),
    ).rejects.toThrowError('This email address already exists');
  });
});
