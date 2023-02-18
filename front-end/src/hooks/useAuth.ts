import * as React from 'react'
import AuthContext from '@/contexts/AuthContext'

export function useAuth() {
  return React.useContext(AuthContext)
}
