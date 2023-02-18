import { UserRepository } from '@/core/repositories/user.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { CreateUserUseCase } from '../create-user';
import { FindAllUsersUseCase } from './find-all-users.use-case';

describe('FindAllUsersUseCase', () => {
  let repository: UserRepository;
  let createUserUseCase: CreateUserUseCase;
  let findAllUsersUseCase: FindAllUsersUseCase;

  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';

  beforeEach(async () => {
    repository = new UserCacheMemoryRepository();
    createUserUseCase = new CreateUserUseCase(repository);
    findAllUsersUseCase = new FindAllUsersUseCase(repository);
  });

  it('should be defined', () => {
    expect(findAllUsersUseCase).toBeDefined();
  });

  it('should find all users', async () => {
    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    const users = await findAllUsersUseCase.execute();
    expect(users).toEqual([createdUser]);
  });
});
