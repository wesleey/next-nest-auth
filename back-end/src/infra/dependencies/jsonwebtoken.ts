import { JwtPayload } from '@/shared/interfaces/jwt-payload.interface';
import * as jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_EXPIRATION_TIME,
  ACCESS_TOKEN_PASSPHRASE,
  REFRESH_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_PASSPHRASE,
} from '@/shared/constants/jwt';

import {
  ACCESS_TOKEN_PRIVATE_KEY,
  ACCESS_TOKEN_PUBLIC_KEY,
  REFRESH_TOKEN_PRIVATE_KEY,
  REFRESH_TOKEN_PUBLIC_KEY,
} from '@/shared/constants/keys';

export function generateAccessToken(payload: JwtPayload) {
  const privateKey: jwt.Secret = {
    key: ACCESS_TOKEN_PRIVATE_KEY,
    passphrase: ACCESS_TOKEN_PASSPHRASE,
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
  });
}

export function generateRefreshToken(payload: JwtPayload) {
  const privateKey: jwt.Secret = {
    key: REFRESH_TOKEN_PRIVATE_KEY,
    passphrase: REFRESH_TOKEN_PASSPHRASE,
  };

  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
  });
}

export function verifyAccessToken(accessToken: string) {
  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_PUBLIC_KEY);
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_PUBLIC_KEY);
    return decoded as JwtPayload;
  } catch {
    return null;
  }
}
