import * as fs from 'fs';
import * as path from 'path';

export const ACCESS_TOKEN_PUBLIC_KEY = fs.readFileSync(
  path.resolve(process.env.ACCESS_PUBLIC_KEY_PATH),
);

export const ACCESS_TOKEN_PRIVATE_KEY = fs.readFileSync(
  path.resolve(process.env.ACCESS_PRIVATE_KEY_PATH),
);

export const REFRESH_TOKEN_PUBLIC_KEY = fs.readFileSync(
  path.resolve(process.env.REFRESH_PUBLIC_KEY_PATH),
);

export const REFRESH_TOKEN_PRIVATE_KEY = fs.readFileSync(
  path.resolve(process.env.REFRESH_PRIVATE_KEY_PATH),
);
