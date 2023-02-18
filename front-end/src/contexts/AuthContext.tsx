import * as React from 'react'
import { User } from '@/types/user'
import { SignInData, SignUpData } from '@/types/auth'
import { retrieveUser } from '@/utils/retrieveUser'
import { setCredentials, removeCredentials } from '@/utils/cookies'
import authService from '@/services/auth'
import Router from 'next/router'

type AuthContextData = {
  user: User | null
  signIn(signInData: SignInData): Promise<void>
  signUp: (signUpData: SignUpData) => Promise<void>
  signOut(): Promise<void>
}

const AuthContext = React.createContext({} as AuthContextData)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)

  React.useEffect(() => {
    const user = retrieveUser()
    setUser(user)
  }, [])

  async function signIn({ email, password }: SignInData) {
    await authService.login({ email, password }).then(async (credentials) => {
      setCredentials(undefined, credentials)
    })
    const user = await authService.getUser()
    setUser(user)
    Router.push('/')
  }

  async function signUp({ name, email, password }: SignUpData) {
    await authService.register({ name, email, password })
    Router.push('/auth/signin')
  }

  async function signOut() {
    await authService.logout()
    removeCredentials()
    setUser(null)
    Router.push('/auth/signin')
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
