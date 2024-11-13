import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

export interface SignInBody {
  user: string
  pwd: string
}

export async function signIn({ user, pwd }: SignInBody) {
  try {
    const response = await api.post('/User/loginPonto', { user, pwd })

    const token = response.data.idtoken
    const target = response.data.target

    localStorage.setItem('authToken', token)
    localStorage.setItem('target', target)

    document.cookie = `token=${token}; max-age=${60 * 60 * 14}`

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Erro desconhecido')
    }

    throw new Error('Ocorreu um erro inesperado.')
  }
}
