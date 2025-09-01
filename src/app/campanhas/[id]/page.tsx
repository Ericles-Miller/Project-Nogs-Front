"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Calendar,
  ArrowLeft,
  Heart,
  Building,
  Target,
  Users,
  TrendingUp,
  CheckCircle,
  Loader2,
} from "lucide-react"

// Dados mockados - em uma aplicação real, isso viria de uma API
const campanhas = [
  {
    id: 1,
    titulo: "Reforma da Escola Municipal",
    descricao: "Ajude a reformar a escola que atende 300 crianças da comunidade Vila Esperança.",
    descricaoCompleta:
      "A Escola Municipal Vila Esperança atende 300 crianças de famílias de baixa renda da região. O prédio, construído há mais de 30 anos, precisa urgentemente de reformas estruturais para garantir a segurança e o bem-estar dos alunos. As obras incluem: reforma do telhado, pintura geral, troca de pisos danificados, reforma dos banheiros, instalação de nova rede elétrica e criação de uma biblioteca. Com sua ajuda, podemos proporcionar um ambiente de aprendizado digno e seguro para essas crianças, contribuindo para um futuro melhor da nossa comunidade.",
    categoria: "Educação",
    meta: 50000,
    arrecadado: 32500,
    doadores: 127,
    diasRestantes: 15,
    organizacao: "Associação de Pais Vila Esperança",
    cidade: "São Paulo",
    estado: "SP",
    status: "Ativa",
    urgente: false,
    dataInicio: "01/02/2024",
    dataFim: "31/03/2024",
    endereco: "Rua das Flores, 456 - Vila Esperança, São Paulo - SP",
    contato: "contato@escolavilaesperanca.org.br",
    telefone: "(11) 9999-7777",
    beneficiarios: 300,
    impacto: "300 crianças terão um ambiente escolar seguro e adequado para aprender",
    itensNecessarios: [
      "Material de construção (R$ 25.000)",
      "Mão de obra especializada (R$ 15.000)",
      "Mobiliário escolar (R$ 7.000)",
      "Equipamentos de segurança (R$ 3.000)",
    ],
    doacoesRecentes: [
      { nome: "Maria Silva", valor: 500, data: "2024-03-10", mensagem: "Pela educação das nossas crianças!" },
      { nome: "João Santos", valor: 200, data: "2024-03-09", mensagem: "Toda criança merece estudar em segurança." },
      { nome: "Ana Costa", valor: 1000, data: "2024-03-08", mensagem: "Investir em educação é investir no futuro." },
    ],
  },
]

const valoresSugeridos = [50, 100, 200, 500, 1000]

export default function CampanhaDetalhePage() {
  const params = useParams()
  const [valorDoacao, setValorDoacao] = useState("")
  const [dadosDoador, setDadosDoador] = useState({
    nome: "",
    email: "",
    mensagem: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [mostrarFormulario, setMostrarFormulario] = useState(false)

  const campanha = campanhas.find((c) => c.id === Number(params.id))

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor)
  }

  const calcularProgresso = (arrecadado: number, meta: number) => {
    return Math.min((arrecadado / meta) * 100, 100)
  }

  const handleValorSugerido = (valor: number) => {
    setValorDoacao(valor.toString())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDadosDoador((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitDoacao = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess("")

    // Validação básica
    if (!valorDoacao || !dadosDoador.nome || !dadosDoador.email) {
      alert("Por favor, preencha todos os campos obrigatórios.")
      setIsLoading(false)
      return
    }

    if (Number(valorDoacao) < 10) {
      alert("O valor mínimo para doação é R$ 10,00.")
      setIsLoading(false)
      return
    }

    try {
      // Simular processamento da doação
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setSuccess(
        `Doação de ${formatarMoeda(Number(valorDoacao))} realizada com sucesso! Obrigado por contribuir com esta causa.`,
      )
      setMostrarFormulario(false)
      setValorDoacao("")
      setDadosDoador({ nome: "", email: "", mensagem: "" })
    } catch (error) {
      alert("Erro ao processar doação. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!campanha) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Campanha não encontrada</h1>
            <Link href="/campanhas">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar às Campanhas
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/campanhas" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar às Campanhas
          </Link>
        </div>

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {/* Header da Campanha */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="text-sm">
                {campanha.categoria}
              </Badge>
              {campanha.urgente && (
                <Badge variant="destructive" className="text-xs">
                  Urgente
                </Badge>
              )}
              <Badge variant="outline" className="text-green-600 border-green-600">
                {campanha.status}
              </Badge>
            </div>
          </div>

          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">{campanha.titulo}</h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>
                {campanha.cidade}, {campanha.estado}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{campanha.organizacao}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{campanha.doadores} doadores</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{campanha.diasRestantes} dias restantes</span>
            </div>
          </div>

          {/* Progresso da Campanha */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Progresso da Arrecadação</h3>
                    <span className="text-2xl font-bold text-primary">
                      {Math.round(calcularProgresso(campanha.arrecadado, campanha.meta))}%
                    </span>
                  </div>
                  <Progress value={calcularProgresso(campanha.arrecadado, campanha.meta)} className="h-3 mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Arrecadado</p>
                      <p className="text-2xl font-bold text-primary">{formatarMoeda(campanha.arrecadado)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Meta</p>
                      <p className="text-2xl font-bold">{formatarMoeda(campanha.meta)}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  {!mostrarFormulario ? (
                    <Button size="lg" onClick={() => setMostrarFormulario(true)} className="w-full">
                      <Heart className="mr-2 h-5 w-5" />
                      Fazer Doação
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => setMostrarFormulario(false)} className="w-full">
                      Cancelar Doação
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Formulário de Doação */}
            {mostrarFormulario && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Fazer uma Doação
                  </CardTitle>
                  <CardDescription>Preencha os dados abaixo para contribuir com esta campanha</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitDoacao} className="space-y-6">
                    {/* Valores Sugeridos */}
                    <div className="space-y-3">
                      <Label>Valor da Doação</Label>
                      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                        {valoresSugeridos.map((valor) => (
                          <Button
                            key={valor}
                            type="button"
                            variant={valorDoacao === valor.toString() ? "default" : "outline"}
                            onClick={() => handleValorSugerido(valor)}
                            className="text-sm"
                          >
                            R$ {valor}
                          </Button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-muted-foreground">R$</span>
                        <Input
                          type="number"
                          placeholder="Outro valor"
                          value={valorDoacao}
                          onChange={(e) => setValorDoacao(e.target.value)}
                          className="pl-10"
                          min="10"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>

                    {/* Dados do Doador */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo *</Label>
                        <Input
                          id="nome"
                          name="nome"
                          value={dadosDoador.nome}
                          onChange={handleInputChange}
                          placeholder="Seu nome completo"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={dadosDoador.email}
                          onChange={handleInputChange}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                      <Textarea
                        id="mensagem"
                        name="mensagem"
                        value={dadosDoador.mensagem}
                        onChange={handleInputChange}
                        placeholder="Deixe uma mensagem de apoio..."
                        rows={3}
                      />
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processando Doação...
                        </>
                      ) : (
                        <>
                          <Heart className="mr-2 h-4 w-4" />
                          Doar {valorDoacao ? formatarMoeda(Number(valorDoacao)) : ""}
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Descrição */}
            <Card>
              <CardHeader>
                <CardTitle>Sobre a Campanha</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{campanha.descricaoCompleta}</p>
              </CardContent>
            </Card>

            {/* Itens Necessários */}
            <Card>
              <CardHeader>
                <CardTitle>Como o Dinheiro Será Usado</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {campanha.itensNecessarios.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Target className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Doações Recentes */}
            <Card>
              <CardHeader>
                <CardTitle>Doações Recentes</CardTitle>
                <CardDescription>Veja quem está apoiando esta causa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campanha.doacoesRecentes.map((doacao, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium">{doacao.nome}</span>
                        <span className="text-primary font-semibold">{formatarMoeda(doacao.valor)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{doacao.mensagem}</p>
                      <p className="text-xs text-muted-foreground">{doacao.data}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Informações da Campanha */}
            <Card>
              <CardHeader>
                <CardTitle>Informações da Campanha</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Período</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {campanha.dataInicio} até {campanha.dataFim}
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Endereço</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{campanha.endereco}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Beneficiários</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{campanha.beneficiarios} pessoas</p>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Contato</span>
                  <p className="text-sm text-muted-foreground mt-1">{campanha.contato}</p>
                  <p className="text-sm text-muted-foreground">{campanha.telefone}</p>
                </div>
              </CardContent>
            </Card>

            {/* Impacto */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Impacto Esperado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{campanha.impacto}</p>
              </CardContent>
            </Card>

            {/* Compartilhar */}
            <Card>
              <CardHeader>
                <CardTitle>Compartilhe esta Campanha</CardTitle>
                <CardDescription>Ajude a divulgar esta causa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    WhatsApp
                  </Button>
                  <Button variant="outline" size="sm">
                    Copiar Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
