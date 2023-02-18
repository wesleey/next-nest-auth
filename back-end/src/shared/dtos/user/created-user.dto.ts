import { Role } from '@/core/domain/entities/user.entity';

export class CreatedUserDto {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  enabled: boolean;
  role: Role;
  createdAt: Date | string;
  updatedAt: Date | string;
}
