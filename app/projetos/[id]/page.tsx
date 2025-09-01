"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, Users, ArrowLeft, CheckCircle, Building, Calendar, Target, Heart, Loader2 } from "lucide-react"

// Dados mockados - em uma aplicação real, isso viria de uma API
const projetos = [
  {
    id: 1,
    titulo: "Educação para Todos",
    descricao: "Projeto de alfabetização para adultos em comunidades carentes. Precisamos de professores voluntários.",
    descricaoCompleta:
      "O projeto Educação para Todos tem como objetivo combater o analfabetismo em comunidades carentes da região metropolitana de São Paulo. Oferecemos aulas de alfabetização para adultos que não tiveram oportunidade de estudar na idade adequada. As aulas acontecem aos sábados, em um ambiente acolhedor e respeitoso, onde cada aluno é tratado com dignidade e carinho. Nossos voluntários recebem treinamento adequado e material didático para desenvolver as atividades. Além da alfabetização básica, também oferecemos noções de matemática e cidadania.",
    cidade: "São Paulo",
    estado: "SP",
    causa: "Educação",
    horasSemana: "4h/semana",
    voluntarios: 12,
    maxVoluntarios: 20,
    requisitos: ["Ensino médio completo", "Paciência para ensinar", "Disponibilidade aos sábados"],
    organizacao: "Instituto Educar",
    status: "Ativo",
    dataInicio: "15/03/2024",
    dataFim: "15/12/2024",
    endereco: "Rua das Flores, 123 - Vila Esperança, São Paulo - SP",
    contato: "contato@institutoeducar.org.br",
    telefone: "(11) 9999-8888",
    beneficiarios: 45,
    impacto: "Já alfabetizamos mais de 200 pessoas desde o início do projeto",
    atividades: [
      "Aulas de alfabetização básica",
      "Ensino de matemática fundamental",
      "Atividades de cidadania",
      "Acompanhamento individual dos alunos",
      "Eventos culturais e educativos",
    ],
  },
]

export default function ProjetoDetalhePage() {
  const params = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [inscrito, setInscrito] = useState(false)
  const [success, setSuccess] = useState("")

  const projeto = projetos.find((p) => p.id === Number(params.id))

  const handleInscricao = async () => {
    setIsLoading(true)
    setSuccess("")

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setInscrito(true)
      setSuccess("Inscrição realizada com sucesso! Você receberá mais informações por email.")
    } catch (error) {
      console.error("Erro na inscrição:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!projeto) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Projeto não encontrado</h1>
            <Link href="/projetos">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar aos Projetos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/projetos" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar aos Projetos
          </Link>
        </div>

        {/* Header do Projeto */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                {projeto.causa}
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {projeto.status}
              </Badge>
            </div>
          </div>

          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">{projeto.titulo}</h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                {projeto.cidade}, {projeto.estado}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{projeto.organizacao}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>
                {projeto.voluntarios}/{projeto.maxVoluntarios} voluntários
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{projeto.horasSemana}</span>
            </div>
          </div>
        </div>

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Descrição */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre o Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{projeto.descricaoCompleta}</p>
              </CardContent>
            </Card>

            {/* Atividades */}
            <Card>
              <CardHeader>
                <CardTitle>Atividades Desenvolvidas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {projeto.atividades.map((atividade, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{atividade}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Requisitos */}
            <Card>
              <CardHeader>
                <CardTitle>Requisitos para Participar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {projeto.requisitos.map((requisito, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{requisito}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card de Inscrição */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Participar do Projeto
                </CardTitle>
                <CardDescription>Faça parte desta iniciativa transformadora</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso de Voluntários</span>
                    <span>
                      {projeto.voluntarios}/{projeto.maxVoluntarios}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(projeto.voluntarios / projeto.maxVoluntarios) * 100}%` }}
                    />
                  </div>
                </div>

                {inscrito ? (
                  <Button disabled className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Inscrito com Sucesso
                  </Button>
                ) : (
                  <Button onClick={handleInscricao} disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Inscrevendo...
                      </>
                    ) : (
                      <>
                        <Heart className="mr-2 h-4 w-4" />
                        Quero Participar
                      </>
                    )}
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Informações do Projeto */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Projeto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Período</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {projeto.dataInicio} até {projeto.dataFim}
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Endereço</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{projeto.endereco}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Beneficiários</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{projeto.beneficiarios} pessoas atendidas</p>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Contato</span>
                  <p className="text-sm text-muted-foreground mt-1">{projeto.contato}</p>
                  <p className="text-sm text-muted-foreground">{projeto.telefone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Impacto */}
            <Card>
              <CardHeader>
                <CardTitle>Nosso Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{projeto.impacto}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
