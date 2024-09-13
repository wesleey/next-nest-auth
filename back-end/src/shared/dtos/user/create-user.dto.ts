import { Role } from '@/core/domain/entities/user.entity';

import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
  verified?: boolean;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
