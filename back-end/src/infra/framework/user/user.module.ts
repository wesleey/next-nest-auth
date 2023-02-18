import { UserRepository } from '@/core/repositories/user.repository';
import { PrismaUserRepository } from '@/infra/data/prisma/prisma-user.repository';
import { PrismaService } from '@/infra/data/prisma/prisma.service';
import { CreateUserUseCase } from '@/use-cases/user/create-user';
import { FindAllUsersUseCase } from '@/use-cases/user/find-all-users';
import { FindOneUserUseCase } from '@/use-cases/user/find-one-user';
import { RemoveUserUseCase } from '@/use-cases/user/remove-user';
import { UpdateUserUseCase } from '@/use-cases/user/update-user';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useFactory: (prisma: PrismaService) => new PrismaUserRepository(prisma),
      inject: [PrismaService],
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
})
export class UserModule {}
