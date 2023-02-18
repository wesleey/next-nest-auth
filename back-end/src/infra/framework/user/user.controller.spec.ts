import { UserRepository } from '@/core/repositories/user.repository';
import { UserCacheMemoryRepository } from '@/infra/data/cache-memory/user-cache-memory.repository';
import { CreateUserUseCase } from '@/use-cases/user/create-user';
import { FindAllUsersUseCase } from '@/use-cases/user/find-all-users';
import { FindOneUserUseCase } from '@/use-cases/user/find-one-user';
import { RemoveUserUseCase } from '@/use-cases/user/remove-user';
import { UpdateUserUseCase } from '@/use-cases/user/update-user';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('UserController', () => {
  let userController: UserController;

  const name = 'John Doe';
  const email = 'johndoe@gmail.com';
  const password = 'password123';

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserRepository,
          useClass: UserCacheMemoryRepository,
        },
        ...[
          CreateUserUseCase,
          FindAllUsersUseCase,
          FindOneUserUseCase,
          UpdateUserUseCase,
          RemoveUserUseCase,
        ].map((UseCase) => ({
          provide: UseCase,
          useFactory: (repository: UserRepository) => new UseCase(repository),
          inject: [UserRepository],
        })),
      ],
    }).compile();

    userController = userModule.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create user', async () => {
    const createdUser = await userController.createUser({
      name,
      email,
      password,
    });

    expect({
      name: createdUser.name,
      email: createdUser.email,
    }).toEqual({ name, email });
  });

  it('should find all users', async () => {
    const createdUser = await userController.createUser({
      name,
      email,
      password,
    });

    const users = await userController.findAllUsers();
    expect(users).toEqual([createdUser]);
  });

  it('should find one user', async () => {
    const createdUser = await userController.createUser({
      name,
      email,
      password,
    });

    const user = await userController.findOneUser(createdUser.id);
    expect(user).toEqual(createdUser);
  });
});
