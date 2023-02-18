import { UserRepository } from '@/core/repositories/user.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { CreateUserUseCase } from '../create-user';
import { FindOneUserUseCase } from './find-one-user.use-case';

describe('FindOneUserUseCase', () => {
  let repository: UserRepository;
  let createUserUseCase: CreateUserUseCase;
  let findOneUserUseCase: FindOneUserUseCase;

  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';

  beforeEach(async () => {
    repository = new UserCacheMemoryRepository();
    createUserUseCase = new CreateUserUseCase(repository);
    findOneUserUseCase = new FindOneUserUseCase(repository);
  });

  it('should be defined', () => {
    expect(findOneUserUseCase).toBeDefined();
  });

  it('should find one user', async () => {
    const createdUser = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    const user = await findOneUserUseCase.execute(createdUser.id);
    expect(user).toEqual(createdUser);
  });
});
