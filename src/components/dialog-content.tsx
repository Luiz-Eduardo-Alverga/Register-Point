import { ShieldCheck } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CardContentProps {
  results:
    | {
        Nome: string
        Codigo: number
        Data: string
        Hora: string
      }
    | undefined
}

export function CardContentDialog({ results }: CardContentProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR') // Formata para dd/MM/yyyy
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="flex items-center">
        <CardTitle>
          <ShieldCheck className="h-20 w-20 text-emerald-500" />
        </CardTitle>
        <CardDescription className="text-2xl font-bold">
          Ponto Registrado com sucesso
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <p className="text-lg">Nome:</p>
            <p className="text-lg font-semibold">{results?.Nome}</p>
          </div>

          <div className="flex gap-2">
            <p className="text-lg">Código Ponto:</p>
            <p className="text-lg font-semibold">{results?.Codigo}</p>
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <p className="text-lg">Data:</p>
            <p className="text-lg font-semibold">
              {results?.Data ? formatDate(results.Data) : ''}
            </p>
          </div>

          <div className="flex gap-2">
            <p className="text-lg">Hora:</p>
            <p className="text-lg font-semibold">{results?.Hora}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
