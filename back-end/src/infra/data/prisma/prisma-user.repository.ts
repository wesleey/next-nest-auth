import { UserEntity } from '@/core/domain/entities/user.entity';
import { UserRepository } from '@/core/repositories/user.repository';
import { PrismaService } from '@/infra/data/prisma/prisma.service';

export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: UserEntity): Promise<UserEntity> {
    return this.prisma.user.create({ data });
  }

  async findAll(filter?: Partial<UserEntity>): Promise<UserEntity[]> {
    return this.prisma.user.findMany({ where: filter });
  }

  async findOne(filter: Partial<UserEntity>): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: filter });
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
