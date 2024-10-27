import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerPoint } from '@/api/register-point'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const registerPointSchema = z.object({
  codigoPonto: z.number(),
})

type RegisterPointForm = z.infer<typeof registerPointSchema>

export function RegisterPoint() {
  const { register, handleSubmit } = useForm<RegisterPointForm>()

  const { mutateAsync: point } = useMutation({
    mutationFn: registerPoint,
  })

  async function handleRegisterPoint({ codigoPonto }: RegisterPointForm) {
    try {
      await point({ codigoPonto })
      toast.success('Ponto Registrado com sucesso')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage = error.message
        toast.error(errorMessage)
      } else if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Ocorreu um erro inesperado.')
      }
    }
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(handleRegisterPoint)}
        className="flex w-[400px] flex-col gap-6 p-8 rounded-sm"
      >
        <Label className="text-center font-normal text-2xl mb-4">
          Registrar Ponto
        </Label>
        <Input type="number" {...register('codigoPonto')} />
        <Button>Confirmar</Button>
      </form>
    </div>
  )
}
