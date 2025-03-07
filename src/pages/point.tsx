import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Clock7, LoaderCircle, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerPoint } from '@/api/register-point'
import { CardContentDialog } from '@/components/dialog-content'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PointsResults {
  Codigo: number
  Nome: string
  Data: string
  Hora: string
  Id: number
}

const registerPointSchema = z.object({
  codigoPonto: z.number(),
})

type RegisterPointForm = z.infer<typeof registerPointSchema>

export function RegisterPoint() {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const navigate = useNavigate()

  const { register, handleSubmit, setFocus, reset } =
    useForm<RegisterPointForm>()

  const {
    mutateAsync: point,
    data: results,
    isPending,
  } = useMutation<PointsResults, AxiosError, RegisterPointForm>({
    mutationFn: registerPoint,
    onSuccess: () => {
      setDialogOpen(true)
    },
  })

  useEffect(() => {
    setFocus('codigoPonto')
  }, [setFocus])

  useEffect(() => {
    if (isDialogOpen) {
      const timer = setTimeout(() => {
        setDialogOpen(false)
      }, 3000)
      return () => clearTimeout(timer)
    }

    setFocus('codigoPonto')
  }, [isDialogOpen, setFocus])

  async function handleRegisterPoint({ codigoPonto }: RegisterPointForm) {
    try {
      await point({ codigoPonto })
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
    setFocus('codigoPonto')
    reset()
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  function handleLogout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('target')

    navigate('login')
  }

  return (
    <>
      <div className="flex pt-4 pr-4">
        <Button
          onClick={() => handleLogout()}
          variant={'ghost'}
          className="ml-auto"
        >
          <LogOut className="h-6 w-6 text-red-500" />
          <span>Logout</span>
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={handleCloseDialog}>
        <div className="h-screen flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit(handleRegisterPoint)}
            className="flex w-[400px] flex-col gap-6 p-8 rounded-sm"
          >
            <Label className="m-auto">
              <Clock7 className="m-auto text-primary w-20 h-20 mb-3" />
              <span className="text-center font-serif text-slate-700 text-2xl mb-4">
                Registrar Ponto
              </span>
            </Label>
            <Input
              placeholder="Insira seu código do ponto"
              type="number"
              {...register('codigoPonto')}
            />
            <Button className="w-full p-6 sm:p-0" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Carregando...
                </div>
              ) : (
                'Confirmar'
              )}
            </Button>
          </form>
        </div>
        <DialogContent>
          <CardContentDialog results={results} />
        </DialogContent>
      </Dialog>
    </>
  )
}
