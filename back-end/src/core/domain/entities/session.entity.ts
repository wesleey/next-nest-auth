import { Entity } from '@/core/base/entity';

export class SessionEntity extends Entity {
  userId: string;
  expiresIn: number;
}
