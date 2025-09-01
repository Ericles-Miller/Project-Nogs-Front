"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Calendar, Edit, Save, X, CheckCircle, Loader2 } from "lucide-react"

const estados = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

// Dados mockados do usuário
const dadosIniciais = {
  nome: "Maria Silva",
  email: "maria.silva@email.com",
  cidade: "São Paulo",
  estado: "SP",
  biografia:
    "Apaixonada por educação e voluntariado. Acredito que pequenas ações podem gerar grandes transformações na sociedade. Trabalho como professora há 10 anos e dedico meu tempo livre para ajudar comunidades carentes.",
  telefone: "(11) 99999-8888",
  dataIngresso: "Janeiro 2024",
  avatar: "/diverse-female-avatars.png",
}

const estatisticasPerfil = {
  horasVoluntariado: 48,
  projetosParticipados: 7,
  doacoesRealizadas: 8,
  pessoasImpactadas: 127,
}

const interessesDisponiveis = [
  "Educação",
  "Saúde",
  "Meio Ambiente",
  "Assistência Social",
  "Cultura",
  "Esporte",
  "Direitos Humanos",
  "Animais",
  "Tecnologia",
  "Arte",
]

export default function PerfilPage() {
  const [dadosUsuario, setDadosUsuario] = useState(dadosIniciais)
  const [interessesSelecionados, setInteressesSelecionados] = useState([
    "Educação",
    "Meio Ambiente",
    "Assistência Social",
  ])
  const [modoEdicao, setModoEdicao] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDadosUsuario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setDadosUsuario((prev) => ({ ...prev, [name]: value }))
  }

  const toggleInteresse = (interesse: string) => {
    setInteressesSelecionados((prev) =>
      prev.includes(interesse) ? prev.filter((i) => i !== interesse) : [...prev, interesse],
    )
  }

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccess("")

    try {
      // Simular chamada de API
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess("Perfil atualizado com sucesso!")
      setModoEdicao(false)
    } catch (error) {
      console.error("Erro ao salvar perfil:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelar = () => {
    setDadosUsuario(dadosIniciais)
    setModoEdicao(false)
    setSuccess("")
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/dashboard" className="inline-flex items-center text-primary hover:text-primary/80 font-medium">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Link>
        </div>

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar - Informações Básicas */}
          <div className="space-y-6">
            {/* Card do Perfil */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={dadosUsuario.avatar || "/placeholder.svg"} alt={dadosUsuario.nome} />
                    <AvatarFallback className="text-lg">
                      {dadosUsuario.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-playfair font-bold text-xl text-foreground mb-1">{dadosUsuario.nome}</h2>
                  <p className="text-muted-foreground mb-2">{dadosUsuario.email}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {dadosUsuario.cidade}, {dadosUsuario.estado}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Membro desde {dadosUsuario.dataIngresso}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card>
              <CardHeader>
                <CardTitle>Suas Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Horas Voluntárias</span>
                  <span className="font-semibold">{estatisticasPerfil.horasVoluntariado}h</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Projetos Participados</span>
                  <span className="font-semibold">{estatisticasPerfil.projetosParticipados}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Doações Realizadas</span>
                  <span className="font-semibold">{estatisticasPerfil.doacoesRealizadas}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pessoas Impactadas</span>
                  <span className="font-semibold">{estatisticasPerfil.pessoasImpactadas}</span>
                </div>
              </CardContent>
            </Card>

            {/* Interesses */}
            <Card>
              <CardHeader>
                <CardTitle>Áreas de Interesse</CardTitle>
                <CardDescription>Causas que você tem interesse em apoiar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {interessesSelecionados.map((interesse) => (
                    <Badge key={interesse} variant="secondary">
                      {interesse}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conteúdo Principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Informações Pessoais */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Informações Pessoais</CardTitle>
                    <CardDescription>Gerencie suas informações de perfil</CardDescription>
                  </div>
                  {!modoEdicao ? (
                    <Button onClick={() => setModoEdicao(true)} variant="outline">
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleCancelar} variant="outline" size="sm">
                        <X className="mr-2 h-4 w-4" />
                        Cancelar
                      </Button>
                      <Button onClick={handleSalvar} disabled={isLoading} size="sm">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Salvar
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSalvar} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        name="nome"
                        value={dadosUsuario.nome}
                        onChange={handleInputChange}
                        disabled={!modoEdicao}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={dadosUsuario.email}
                        onChange={handleInputChange}
                        disabled={!modoEdicao}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={dadosUsuario.telefone}
                      onChange={handleInputChange}
                      disabled={!modoEdicao}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade</Label>
                      <Input
                        id="cidade"
                        name="cidade"
                        value={dadosUsuario.cidade}
                        onChange={handleInputChange}
                        disabled={!modoEdicao}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado</Label>
                      <Select
                        value={dadosUsuario.estado}
                        onValueChange={(value) => handleSelectChange("estado", value)}
                        disabled={!modoEdicao}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado" />
                        </SelectTrigger>
                        <SelectContent>
                          {estados.map((estado) => (
                            <SelectItem key={estado} value={estado}>
                              {estado}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="biografia">Biografia</Label>
                    <Textarea
                      id="biografia"
                      name="biografia"
                      value={dadosUsuario.biografia}
                      onChange={handleInputChange}
                      disabled={!modoEdicao}
                      rows={4}
                      placeholder="Conte um pouco sobre você e suas motivações para o voluntariado..."
                    />
                  </div>

                  {modoEdicao && (
                    <div className="space-y-3">
                      <Label>Áreas de Interesse</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {interessesDisponiveis.map((interesse) => (
                          <Button
                            key={interesse}
                            type="button"
                            variant={interessesSelecionados.includes(interesse) ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleInteresse(interesse)}
                            className="justify-start"
                          >
                            {interesse}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Configurações de Conta */}
            <Card>
              <CardHeader>
                <CardTitle>Configurações de Conta</CardTitle>
                <CardDescription>Gerencie suas preferências e segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Alterar Senha</h3>
                    <p className="text-sm text-muted-foreground">Atualize sua senha para manter sua conta segura</p>
                  </div>
                  <Button variant="outline">Alterar</Button>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Notificações por Email</h3>
                    <p className="text-sm text-muted-foreground">Receba atualizações sobre projetos e campanhas</p>
                  </div>
                  <Button variant="outline">Configurar</Button>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">Privacidade</h3>
                    <p className="text-sm text-muted-foreground">Controle quem pode ver suas informações</p>
                  </div>
                  <Button variant="outline">Gerenciar</Button>
                </div>

                <div className="flex justify-between items-center p-4 border rounded-lg border-red-200">
                  <div>
                    <h3 className="font-medium text-red-600">Excluir Conta</h3>
                    <p className="text-sm text-muted-foreground">Remover permanentemente sua conta e dados</p>
                  </div>
                  <Button variant="destructive">Excluir</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
