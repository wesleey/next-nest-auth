import Link from 'next/link'
import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import TextField from '@/components/TextField'
import { useAuth } from '@/hooks/useAuth'
import { SignInData } from '@/types/auth'
import { parseCredentials } from '@/utils/cookies'
import { yupResolver } from '@hookform/resolvers/yup'
import { EnvelopeSimple, Lock } from 'phosphor-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import * as yup from 'yup'

const SignInFormSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().min(4).required(),
})

export default function SignIn() {
  const { signIn } = useAuth()
  const { register, handleSubmit, formState } = useForm<SignInData>({
    mode: 'onChange',
    resolver: yupResolver(SignInFormSchema),
  })

  const { isValid } = formState

  const onSubmit: SubmitHandler<SignInData> = async ({ email, password }) => {
    await signIn({ email, password })
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-zinc-900 text-zinc-100">
      <header className="flex flex-col items-center gap-2">
        <Heading size="lg">Sign in</Heading>
        <Text size="lg" className="text-zinc-400">
          Sign in to your account
        </Text>
      </header>

      <main className="w-full max-w-sm mt-8">
        <form
          className="flex flex-col items-stretch gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="email" className="flex flex-col gap-3">
            <Text className="font-semibold">Email address</Text>
            <TextField.Root>
              <TextField.Icon className="left-4">
                <EnvelopeSimple weight="bold" />
              </TextField.Icon>
              <TextField.Input
                id="email"
                type="email"
                className="pl-11"
                placeholder="name@company.com"
                {...register('email')}
              />
            </TextField.Root>
          </label>

          <label htmlFor="password" className="flex flex-col gap-3">
            <Text className="font-semibold">Password</Text>
            <TextField.Root>
              <TextField.Icon className="left-4">
                <Lock weight="bold" />
              </TextField.Icon>
              <TextField.Input
                id="password"
                type="password"
                className="pl-11"
                placeholder="••••••••"
                {...register('password')}
              />
            </TextField.Root>
          </label>

          <Button className="uppercase mt-8" disabled={!isValid}>
            Sign in
          </Button>
        </form>
      </main>

      <footer className="flex flex-col items-center mt-8">
        <Text size="sm" asChild>
          <Link
            href="/auth/signup"
            className="underline text-zinc-400 hover:text-zinc-200"
          >
            {"Don't have an account? Sign Up"}
          </Link>
        </Text>
      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { accessToken, refreshToken } = parseCredentials(ctx)

  if (accessToken || refreshToken) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
