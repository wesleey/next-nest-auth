import { Role } from '@/core/domain/entities/user.entity';
import { CreateSessionDto } from '@/shared/dtos/session/create-session.dto';
import { CreateSessionUseCase } from '@/use-cases/session/create-session';
import { FindOneSessionUseCase } from '@/use-cases/session/find-one-session';
import { RemoveSessionUseCase } from '@/use-cases/session/remove-session';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Roles } from '../common/decorators';

@Controller('sessions')
export class SessionController {
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly findOneSessionUseCase: FindOneSessionUseCase,
    private readonly removeSessionUseCase: RemoveSessionUseCase,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  createSession(@Body() data: CreateSessionDto) {
    return this.createSessionUseCase.execute(data);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOneSession(@Param('id') id: string) {
    return this.findOneSessionUseCase.execute(id);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  removeSession(@Param('id') id: string) {
    return this.removeSessionUseCase.execute(id);
  }
}
