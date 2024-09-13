import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export async function checkPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}
