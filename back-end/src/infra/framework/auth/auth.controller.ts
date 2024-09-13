import { RegisterUserDto } from '@/shared/dtos/auth/register-user.dto';
import { GenerateCredentialsUseCase } from '@/use-cases/auth/generate-credentials';
import { RegisterUserUseCase } from '@/use-cases/auth/register-user';
import { RemoveSessionUseCase } from '@/use-cases/session/remove-session';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, Public } from '../common/decorators';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { RefreshAuthGuard } from '../common/guards/refresh-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly generateCredentialsUseCase: GenerateCredentialsUseCase,
    private readonly removeSessionUseCase: RemoveSessionUseCase,
  ) {}

  @Public()
  @Post('register')
  registerUser(@Body() data: RegisterUserDto) {
    return this.registerUserUseCase.execute(data);
  }

  @Public()
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@CurrentUser() user) {
    return this.generateCredentialsUseCase.execute(user);
  }

  @Public()
  @Get('refresh')
  @UseGuards(RefreshAuthGuard)
  refreshCredentials(@CurrentUser() user) {
    return this.generateCredentialsUseCase.execute(user);
  }

  @Get('logout')
  logout(@CurrentUser('sid') sessionId: string) {
    return this.removeSessionUseCase.execute(sessionId);
  }

  @Get('profile')
  getUserProfile(@CurrentUser() user) {
    return {
      id: user.sub,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
