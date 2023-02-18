export interface JwtPayload {
  [key: string]: any;
  sub: string;
  sid: string;
  aud?: string | string[];
  iss?: string;
  exp?: number;
  nbf?: number;
  iat?: number;
  jti?: string;
}
