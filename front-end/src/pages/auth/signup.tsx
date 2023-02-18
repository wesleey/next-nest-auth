import Link from 'next/link'
import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Text from '@/components/Text'
import TextField from '@/components/TextField'
import { useAuth } from '@/hooks/useAuth'
import { SignUpData } from '@/types/auth'
import { parseCredentials } from '@/utils/cookies'
import { yupResolver } from '@hookform/resolvers/yup'
import { User, EnvelopeSimple, Lock } from 'phosphor-react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { GetServerSideProps } from 'next'
import * as yup from 'yup'

const SignUpFormSchema = yup.object().shape({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

export default function SignUp() {
  const { signUp } = useAuth()
  const { handleSubmit, register } = useForm<SignUpData>({
    resolver: yupResolver(SignUpFormSchema),
  })

  const onSubmit: SubmitHandler<SignUpData> = async ({
    name,
    email,
    password,
  }) => {
    await signUp({ name, email, password })
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-zinc-900 text-zinc-100">
      <header className="flex flex-col items-center gap-2">
        <Heading size="lg">Sign Up</Heading>
        <Text size="lg" className="text-zinc-400">
          Create your account
        </Text>
      </header>

      <main className="w-full max-w-sm mt-8">
        <form
          className="flex flex-col items-stretch gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label htmlFor="name" className="flex flex-col gap-3">
            <Text className="font-semibold">Your name</Text>
            <TextField.Root>
              <TextField.Icon className="left-4">
                <User weight="bold" />
              </TextField.Icon>
              <TextField.Input
                id="name"
                type="text"
                className="pl-11"
                placeholder="Full name"
                autoComplete="off"
                {...register('name')}
              />
            </TextField.Root>
          </label>

          <label htmlFor="email" className="flex flex-col gap-3">
            <Text className="font-semibold">Your email address</Text>
            <TextField.Root>
              <TextField.Icon className="left-4">
                <EnvelopeSimple weight="bold" />
              </TextField.Icon>
              <TextField.Input
                id="email"
                type="email"
                className="pl-11"
                placeholder="name@company.com"
                autoComplete="off"
                {...register('email')}
              />
            </TextField.Root>
          </label>

          <label htmlFor="password" className="flex flex-col gap-3">
            <Text className="font-semibold">Your password</Text>
            <TextField.Root>
              <TextField.Icon className="left-4">
                <Lock weight="bold" />
              </TextField.Icon>
              <TextField.Input
                id="password"
                type="password"
                className="pl-11"
                placeholder="••••••••"
                autoComplete="off"
                {...register('password')}
              />
            </TextField.Root>
          </label>

          <Button className="uppercase mt-8">Create</Button>
        </form>
      </main>

      <footer className="flex flex-col items-center mt-8">
        <Text size="sm" asChild>
          <Link
            href="/auth/signin"
            className="underline text-zinc-400 hover:text-zinc-200"
          >
            Already have an account? Sign in
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
