import { AxiosError } from 'axios'

import { api } from '@/lib/axios'

interface RegisterPointQuery {
  codigoPonto: number
}

export async function registerPoint({ codigoPonto }: RegisterPointQuery) {
  try {
    const response = await api.post('Ponto/Registrar', {
      codigoPonto,
      target: 'Ponto',
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido'
      throw new Error(errorMessage)
    }

    throw new Error('Ocorreu um erro inesperado.')
  }
}
