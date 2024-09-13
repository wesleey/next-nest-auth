import { SessionEntity } from '@/core/domain/entities/session.entity';
import { SessionRepository } from '@/core/repositories/session.repository';
import { PrismaService } from '@/infra/data/prisma/prisma.service';

export class PrismaSessionRepository implements SessionRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: SessionEntity): Promise<SessionEntity> {
    return this.prisma.session.create({ data });
  }

  async findAll(filter?: Partial<SessionEntity>): Promise<SessionEntity[]> {
    return this.prisma.session.findMany({ where: filter });
  }

  async findOne(filter: Partial<SessionEntity>): Promise<SessionEntity> {
    return this.prisma.session.findUnique({ where: filter });
  }

  async update(
    id: string,
    data: Partial<SessionEntity>,
  ): Promise<SessionEntity> {
    return this.prisma.session.update({ where: { id }, data });
  }

  async remove(id: string): Promise<void> {
    await this.prisma.session.delete({ where: { id } });
  }
}
