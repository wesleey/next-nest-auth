import Heading from '@/components/Heading'
import Text from '@/components/Text'
import Button from '@/components/Button'
import withAuthServerSide from '@/hof/withAuthServerSide'
import { useAuth } from '@/hooks/useAuth'

export default function Dashboard() {
  const { user, signOut } = useAuth()

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-zinc-900 text-zinc-100">
      <main className="w-full max-w-sm">
        <Heading size="lg" className="text-center mb-2">
          Welcome, {user.name}! 🎉
        </Heading>
        <Text size="lg" className="text-center text-zinc-400">
          {user.email}
        </Text>

        <Button className="w-full uppercase mt-10" onClick={signOut}>
          Sign out
        </Button>
      </main>
    </div>
  )
}

export const getServerSideProps = withAuthServerSide(async () => {
  return {
    props: {},
  }
})
