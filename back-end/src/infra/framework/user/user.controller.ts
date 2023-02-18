import { Role } from '@/core/domain/entities/user.entity';
import { CreateUserDto } from '@/shared/dtos/user/create-user.dto';
import { UpdateUserDto } from '@/shared/dtos/user/update-user.dto';
import { CreateUserUseCase } from '@/use-cases/user/create-user';
import { FindAllUsersUseCase } from '@/use-cases/user/find-all-users';
import { FindOneUserUseCase } from '@/use-cases/user/find-one-user';
import { RemoveUserUseCase } from '@/use-cases/user/remove-user';
import { UpdateUserUseCase } from '@/use-cases/user/update-user';
import { CurrentUser, Public, Roles } from '../common/decorators';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: FindAllUsersUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly removeUserUseCase: RemoveUserUseCase,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  createUser(@Body() data: CreateUserDto) {
    return this.createUserUseCase.execute(data);
  }

  @Public()
  @Get()
  findAllUsers() {
    return this.findAllUsersUseCase.execute();
  }

  @Public()
  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.findOneUserUseCase.execute(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.updateUserUseCase.execute(id, data);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  removeUser(@Param('id') id: string) {
    return this.removeUserUseCase.execute(id);
  }

  @Patch()
  updateCurrentUser(
    @CurrentUser('sub') userId: string,
    @Body() data: UpdateUserDto,
  ) {
    return this.updateUserUseCase.execute(userId, data);
  }

  @Delete()
  removeCurrentUser(@CurrentUser('sub') userId: string) {
    return this.removeUserUseCase.execute(userId);
  }
}
