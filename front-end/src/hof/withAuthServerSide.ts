import authService from '@/services/auth'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { parseCredentials, setCredentials } from '@/utils/cookies'
import { destroyCookie } from 'nookies'
import * as jwt from 'jsonwebtoken'

import {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME,
} from '@/constants/settings'

export default function withAuthServerSide(
  getServerSideProps: GetServerSideProps,
) {
  return async (ctx: GetServerSidePropsContext) => {
    const { accessToken, refreshToken } = parseCredentials(ctx)

    if (accessToken) {
      try {
        jwt.verify(accessToken, process.env.NEXT_PUBLIC_PUBLIC_KEY)
        return getServerSideProps(ctx)
      } catch {
        destroyCookie(ctx, ACCESS_TOKEN_COOKIE_NAME)
      }
    }

    if (refreshToken) {
      try {
        authService.setBearerToken(refreshToken)
        await authService.refreshCredentials().then((credentials) => {
          setCredentials(ctx, credentials)
        })
        return getServerSideProps(ctx)
      } catch {
        destroyCookie(ctx, REFRESH_TOKEN_COOKIE_NAME)
      }
    }

    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }
}
