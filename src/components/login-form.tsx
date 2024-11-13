import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  username: z.string().email({ message: 'E-mail Inválido' }),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  const navigate = useNavigate()

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await authenticate({ user: data.username, pwd: data.password })
      toast.success('Usuário logado com sucesso', {
        position: 'top-center',
      })
      navigate('/')
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || 'Erro de autenticação'
        toast.error(errorMessage)
      } else if (error instanceof Error) {
        toast.error(error.message || 'Erro desconhecido')
      } else {
        toast.error('Ocorreu um erro inesperado.')
      }
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register('username')}
              />
            </div>
            <div className="space-y-2 relative">
              <Label htmlFor="password">Senha</Label>
              <Input
                className="text-base pr-10"
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
              />

              <button
                type="button"
                className="absolute right-2 top-9"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                ) : (
                  // eslint-disable-next-line react/jsx-no-undef
                  <Eye className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
            <Button className="w-full " disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <LoaderCircle className="h-5 w-5 animate-spin" />
                  Carregando...
                </div>
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
