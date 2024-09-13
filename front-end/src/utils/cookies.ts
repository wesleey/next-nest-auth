import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { GetServerSidePropsContext } from 'next'
import { Credentials } from '@/types/auth'

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/constants/settings'

export function setCredentials(
  ctx: GetServerSidePropsContext,
  credentials: Credentials,
) {
  const {
    access_token: accessToken,
    expires_in: expiresIn,
    refresh_token: refreshToken,
    refresh_expires_in: refreshExpiresIn,
  } = credentials

  setCookie(ctx, ACCESS_TOKEN_COOKIE_NAME, accessToken, {
    path: '/',
    maxAge: expiresIn,
    secure: process.env.NODE_ENV === 'production',
  })

  setCookie(ctx, REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
    path: '/',
    maxAge: refreshExpiresIn,
    secure: process.env.NODE_ENV === 'production',
  })
}

export function parseCredentials(ctx?: GetServerSidePropsContext) {
  const {
    [ACCESS_TOKEN_COOKIE_NAME]: accessToken,
    [REFRESH_TOKEN_COOKIE_NAME]: refreshToken,
  } = parseCookies(ctx)

  return { accessToken, refreshToken }
}

export function removeCredentials(ctx?: GetServerSidePropsContext) {
  destroyCookie(ctx, ACCESS_TOKEN_COOKIE_NAME)
  destroyCookie(ctx, REFRESH_TOKEN_COOKIE_NAME)
}
