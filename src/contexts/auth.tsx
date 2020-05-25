import React, { useState, createContext, useEffect, useContext } from 'react'
import { AsyncStorage } from 'react-native'
import * as auth from '../services/auth'
import api from '../services/api'
import User from '../models/User'
import { saveItem, getItem } from '../services/secureStore'

interface AuthContextData {
  signed: boolean;
  user?: object | null;
  signIn(username?: string, password?: string): Promise<void>;
  signOut(): Promise<void>;
  loading: boolean;
  firstLogin: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [firstLogin, setFirstLogin] = useState(true)

  useEffect(() => {
    async function loadStorage() {
      const storagedUser = await AsyncStorage.getItem('@AuthApp:user')
      const storagedToken = await getItem('token')

      await new Promise(resolve => setTimeout(resolve, 2000))

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser))
        api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
      }

      setLoading(false)
    }

    loadStorage()
    checkForSavedCredentials()
  }, [])

  async function checkForSavedCredentials() {
    const credentials = await getItem('credentials')

    if (credentials) {
      setFirstLogin(false)
    }
  }

  async function signIn(username?: string, password?: string) {
    try {
      let response;
      setLoading(true)

      if (username && password) {
        response = await auth.signIn(username, password)

      } else {
        const credentials = await getItem('credentials')
        const { username, password } = JSON.parse((credentials as string))
        response = await auth.signIn(username, password)
      }      

      setUser(response.user)

      api.defaults.headers['Authorization'] = `Bearer ${response.token}`

      await AsyncStorage.setItem('@AuthApp:user', JSON.stringify(response.user))
      await saveItem('credentials', JSON.stringify({ username, password }))
      await saveItem('token', response.token)
      setLoading(false)
      
    } catch (error) {
      console.log(error)
    }
  }

  async function signOut() {
    setUser(null)
    await AsyncStorage.clear()
  }

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut, loading, firstLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  return context
}