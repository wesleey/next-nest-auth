import { Entity } from '@/core/base/entity';

export const Role = {
  USER: 'USER',
  ADMIN: 'ADMIN',
} as const;

export type Role = keyof typeof Role;

export class UserEntity extends Entity {
  name: string;
  email: string;
  password: string;
  verified: boolean;
  enabled: boolean;
  role: Role;
  createdAt: Date | string;
  updatedAt: Date | string;
}
