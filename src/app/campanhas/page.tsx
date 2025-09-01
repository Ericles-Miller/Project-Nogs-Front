"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, Search, Filter, Heart, TrendingUp } from "lucide-react"

const categorias = [
  "Saúde",
  "Educação",
  "Meio Ambiente",
  "Assistência Social",
  "Emergência",
  "Cultura",
  "Esporte",
  "Animais",
]

const campanhas = [
  {
    id: 1,
    titulo: "Reforma da Escola Municipal",
    descricao: "Ajude a reformar a escola que atende 300 crianças da comunidade Vila Esperança.",
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
  },
  {
    id: 2,
    titulo: "Tratamento para Maria",
    descricao: "Maria, de 8 anos, precisa de cirurgia urgente. Sua família não tem condições de pagar.",
    categoria: "Saúde",
    meta: 25000,
    arrecadado: 18750,
    doadores: 89,
    diasRestantes: 7,
    organizacao: "Família Silva",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    status: "Ativa",
    urgente: true,
  },
  {
    id: 3,
    titulo: "Plantio de 1000 Árvores",
    descricao: "Campanha para plantar árvores nativas no Parque Municipal e combater o desmatamento.",
    categoria: "Meio Ambiente",
    meta: 15000,
    arrecadado: 12300,
    doadores: 156,
    diasRestantes: 30,
    organizacao: "Verde Vida BH",
    cidade: "Belo Horizonte",
    estado: "MG",
    status: "Ativa",
    urgente: false,
  },
  {
    id: 4,
    titulo: "Cesta Básica para Famílias",
    descricao: "Distribuição de cestas básicas para 100 famílias em situação de vulnerabilidade.",
    categoria: "Assistência Social",
    meta: 20000,
    arrecadado: 20000,
    doadores: 203,
    diasRestantes: 0,
    organizacao: "Ação Solidária RS",
    cidade: "Porto Alegre",
    estado: "RS",
    status: "Concluída",
    urgente: false,
  },
  {
    id: 5,
    titulo: "Biblioteca Comunitária",
    descricao: "Construção de uma biblioteca comunitária com 2000 livros para a comunidade.",
    categoria: "Educação",
    meta: 35000,
    arrecadado: 8750,
    doadores: 45,
    diasRestantes: 45,
    organizacao: "Ler é Crescer",
    cidade: "Salvador",
    estado: "BA",
    status: "Ativa",
    urgente: false,
  },
  {
    id: 6,
    titulo: "Abrigo para Animais",
    descricao: "Construção de um novo abrigo para cães e gatos abandonados com capacidade para 100 animais.",
    categoria: "Animais",
    meta: 80000,
    arrecadado: 24000,
    doadores: 78,
    diasRestantes: 60,
    organizacao: "Patinhas Carentes",
    cidade: "Curitiba",
    estado: "PR",
    status: "Ativa",
    urgente: false,
  },
]

export default function CampanhasPage() {
  const [filtros, setFiltros] = useState({
    busca: "",
    categoria: "Todas as categorias",
    status: "Todas",
  })

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }))
  }

  const campanhasFiltradas = campanhas.filter((campanha) => {
    const matchBusca =
      campanha.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      campanha.descricao.toLowerCase().includes(filtros.busca.toLowerCase())
    const matchCategoria = filtros.categoria === "Todas as categorias" || campanha.categoria === filtros.categoria
    const matchStatus = filtros.status === "Todas" || campanha.status === filtros.status

    return matchBusca && matchCategoria && matchStatus
  })

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor)
  }

  const calcularProgresso = (arrecadado: number, meta: number) => {
    return Math.min((arrecadado / meta) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">Campanhas de Doação</h1>
          <p className="text-lg text-muted-foreground">
            Contribua com causas importantes e ajude a transformar vidas na sua comunidade
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total Arrecadado</p>
                  <p className="text-2xl font-bold text-foreground">R$ 116.300</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Campanhas Ativas</p>
                  <p className="text-2xl font-bold text-foreground">5</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold">👥</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total de Doadores</p>
                  <p className="text-2xl font-bold text-foreground">698</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-600 font-bold">✓</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                  <p className="text-2xl font-bold text-foreground">1</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Busca
            </CardTitle>
            <CardDescription>Encontre campanhas específicas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="busca">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="busca"
                    placeholder="Título ou descrição..."
                    value={filtros.busca}
                    onChange={(e) => handleFiltroChange("busca", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria</Label>
                <Select value={filtros.categoria} onValueChange={(value) => handleFiltroChange("categoria", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas as categorias">Todas as categorias</SelectItem>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={filtros.status} onValueChange={(value) => handleFiltroChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas">Todas</SelectItem>
                    <SelectItem value="Ativa">Ativas</SelectItem>
                    <SelectItem value="Concluída">Concluídas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                {campanhasFiltradas.length} campanha{campanhasFiltradas.length !== 1 ? "s" : ""} encontrada
                {campanhasFiltradas.length !== 1 ? "s" : ""}
              </p>
              <Button
                variant="outline"
                onClick={() => setFiltros({ busca: "", categoria: "Todas as categorias", status: "Todas" })}
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Campanhas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campanhasFiltradas.map((campanha) => (
            <Card key={campanha.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{campanha.categoria}</Badge>
                  <div className="flex gap-2">
                    {campanha.urgente && (
                      <Badge variant="destructive" className="text-xs">
                        Urgente
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={
                        campanha.status === "Ativa"
                          ? "text-green-600 border-green-600"
                          : "text-blue-600 border-blue-600"
                      }
                    >
                      {campanha.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl">{campanha.titulo}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {campanha.cidade}, {campanha.estado}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{campanha.descricao}</p>

                <div className="space-y-4">
                  {/* Progresso */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progresso</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round(calcularProgresso(campanha.arrecadado, campanha.meta))}%
                      </span>
                    </div>
                    <Progress value={calcularProgresso(campanha.arrecadado, campanha.meta)} className="h-2" />
                  </div>

                  {/* Valores */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Arrecadado</p>
                      <p className="font-semibold text-primary">{formatarMoeda(campanha.arrecadado)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Meta</p>
                      <p className="font-semibold">{formatarMoeda(campanha.meta)}</p>
                    </div>
                  </div>

                  {/* Info adicional */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span>{campanha.doadores} doadores</span>
                    </div>
                    {campanha.status === "Ativa" && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{campanha.diasRestantes} dias restantes</span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>Organização:</strong> {campanha.organizacao}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link href={`/campanhas/${campanha.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Ver Detalhes
                    </Button>
                  </Link>
                  {campanha.status === "Ativa" && (
                    <Link href={`/campanhas/${campanha.id}`} className="flex-1">
                      <Button className="w-full">Doar Agora</Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {campanhasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Nenhuma campanha encontrada</p>
              <p>Tente ajustar os filtros de busca</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
