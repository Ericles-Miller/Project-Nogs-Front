"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  FolderOpen,
  Gift,
  TrendingUp,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Calendar,
  MapPin,
  Clock,
  Heart,
  Building,
  Shield,
} from "lucide-react"

// Dados mockados para o painel administrativo
const estatisticasGerais = {
  totalUsuarios: 2847,
  usuariosAtivos: 1923,
  totalProjetos: 156,
  projetosAtivos: 89,
  totalCampanhas: 47,
  campanhasAtivas: 23,
  valorArrecadado: 487650,
  horasVoluntariado: 12450,
}

const usuarios = [
  {
    id: 1,
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    cidade: "São Paulo",
    estado: "SP",
    dataIngresso: "2024-01-15",
    status: "Ativo",
    projetos: 3,
    horas: 24,
    doacoes: 5,
  },
  {
    id: 2,
    nome: "João Santos",
    email: "joao.santos@email.com",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    dataIngresso: "2024-02-03",
    status: "Ativo",
    projetos: 2,
    horas: 16,
    doacoes: 3,
  },
  {
    id: 3,
    nome: "Ana Costa",
    email: "ana.costa@email.com",
    cidade: "Belo Horizonte",
    estado: "MG",
    dataIngresso: "2024-01-28",
    status: "Inativo",
    projetos: 1,
    horas: 8,
    doacoes: 2,
  },
  {
    id: 4,
    nome: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    cidade: "Salvador",
    estado: "BA",
    dataIngresso: "2024-03-01",
    status: "Ativo",
    projetos: 4,
    horas: 32,
    doacoes: 7,
  },
]

const projetos = [
  {
    id: 1,
    titulo: "Educação para Todos",
    organizacao: "Instituto Educar",
    categoria: "Educação",
    cidade: "São Paulo",
    estado: "SP",
    status: "Ativo",
    voluntarios: 12,
    maxVoluntarios: 20,
    dataCriacao: "2024-02-01",
    dataInicio: "2024-02-15",
    dataFim: "2024-12-15",
  },
  {
    id: 2,
    titulo: "Alimentação Solidária",
    organizacao: "Ação Solidária RJ",
    categoria: "Assistência Social",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    status: "Ativo",
    voluntarios: 8,
    maxVoluntarios: 15,
    dataCriacao: "2024-01-20",
    dataInicio: "2024-02-01",
    dataFim: "2024-11-30",
  },
  {
    id: 3,
    titulo: "Preservação Ambiental",
    organizacao: "Verde Vida BH",
    categoria: "Meio Ambiente",
    cidade: "Belo Horizonte",
    estado: "MG",
    status: "Pendente",
    voluntarios: 0,
    maxVoluntarios: 25,
    dataCriacao: "2024-03-10",
    dataInicio: "2024-03-20",
    dataFim: "2024-09-20",
  },
]

const campanhas = [
  {
    id: 1,
    titulo: "Reforma da Escola Municipal",
    organizacao: "Associação de Pais Vila Esperança",
    categoria: "Educação",
    meta: 50000,
    arrecadado: 32500,
    doadores: 127,
    status: "Ativa",
    dataCriacao: "2024-02-01",
    dataFim: "2024-03-31",
  },
  {
    id: 2,
    titulo: "Tratamento para Maria",
    organizacao: "Família Silva",
    categoria: "Saúde",
    meta: 25000,
    arrecadado: 18750,
    doadores: 89,
    status: "Ativa",
    dataCriacao: "2024-02-15",
    dataFim: "2024-03-20",
  },
  {
    id: 3,
    titulo: "Biblioteca Comunitária",
    organizacao: "Ler é Crescer",
    categoria: "Educação",
    meta: 35000,
    arrecadado: 8750,
    doadores: 45,
    status: "Pendente",
    dataCriacao: "2024-03-05",
    dataFim: "2024-04-30",
  },
]

export default function AdminPage() {
  const [filtroUsuarios, setFiltroUsuarios] = useState("")
  const [filtroStatusUsuarios, setFiltroStatusUsuarios] = useState("Todos")
  const [filtroProjetos, setFiltroProjetos] = useState("")
  const [filtroStatusProjetos, setFiltroStatusProjetos] = useState("Todos")
  const [filtroCampanhas, setFiltroCampanhas] = useState("")
  const [filtroStatusCampanhas, setFiltroStatusCampanhas] = useState("Todos")

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor)
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR")
  }

  const usuariosFiltrados = usuarios.filter((usuario) => {
    const matchNome = usuario.nome.toLowerCase().includes(filtroUsuarios.toLowerCase())
    const matchStatus = filtroStatusUsuarios === "Todos" || usuario.status === filtroStatusUsuarios
    return matchNome && matchStatus
  })

  const projetosFiltrados = projetos.filter((projeto) => {
    const matchTitulo = projeto.titulo.toLowerCase().includes(filtroProjetos.toLowerCase())
    const matchStatus = filtroStatusProjetos === "Todos" || projeto.status === filtroStatusProjetos
    return matchTitulo && matchStatus
  })

  const campanhasFiltradas = campanhas.filter((campanha) => {
    const matchTitulo = campanha.titulo.toLowerCase().includes(filtroCampanhas.toLowerCase())
    const matchStatus = filtroStatusCampanhas === "Todos" || campanha.status === filtroStatusCampanhas
    return matchTitulo && matchStatus
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-playfair font-bold text-3xl md:text-4xl text-foreground">Painel Administrativo</h1>
            <p className="text-lg text-muted-foreground">Gerencie usuários, projetos e campanhas da plataforma</p>
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total de Usuários</p>
                  <p className="text-2xl font-bold text-foreground">
                    {estatisticasGerais.totalUsuarios.toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600">{estatisticasGerais.usuariosAtivos} ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FolderOpen className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Total de Projetos</p>
                  <p className="text-2xl font-bold text-foreground">{estatisticasGerais.totalProjetos}</p>
                  <p className="text-xs text-green-600">{estatisticasGerais.projetosAtivos} ativos</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Valor Arrecadado</p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatarMoeda(estatisticasGerais.valorArrecadado)}
                  </p>
                  <p className="text-xs text-green-600">{estatisticasGerais.campanhasAtivas} campanhas ativas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-muted-foreground">Horas Voluntárias</p>
                  <p className="text-2xl font-bold text-foreground">
                    {estatisticasGerais.horasVoluntariado.toLocaleString()}h
                  </p>
                  <p className="text-xs text-green-600">Este mês: +1.2k horas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Gerenciamento */}
        <Tabs defaultValue="usuarios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="usuarios">Usuários</TabsTrigger>
            <TabsTrigger value="projetos">Projetos</TabsTrigger>
            <TabsTrigger value="campanhas">Campanhas</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          {/* Tab Usuários */}
          <TabsContent value="usuarios" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Gerenciar Usuários
                    </CardTitle>
                    <CardDescription>Visualize e gerencie todos os usuários da plataforma</CardDescription>
                  </div>
                  <Button>
                    <Users className="mr-2 h-4 w-4" />
                    Adicionar Usuário
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filtros */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar por nome ou email..."
                        value={filtroUsuarios}
                        onChange={(e) => setFiltroUsuarios(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filtroStatusUsuarios} onValueChange={setFiltroStatusUsuarios}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos os Status</SelectItem>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Inativo">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tabela de Usuários */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Usuário</TableHead>
                        <TableHead>Localização</TableHead>
                        <TableHead>Data de Ingresso</TableHead>
                        <TableHead>Atividade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usuariosFiltrados.map((usuario) => (
                        <TableRow key={usuario.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{usuario.nome}</div>
                              <div className="text-sm text-muted-foreground">{usuario.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                {usuario.cidade}, {usuario.estado}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{formatarData(usuario.dataIngresso)}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{usuario.projetos} projetos</div>
                              <div className="text-muted-foreground">
                                {usuario.horas}h • {usuario.doacoes} doações
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={usuario.status === "Ativo" ? "default" : "secondary"}>
                              {usuario.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Projetos */}
          <TabsContent value="projetos" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="h-5 w-5" />
                      Gerenciar Projetos
                    </CardTitle>
                    <CardDescription>Aprove, edite e monitore todos os projetos</CardDescription>
                  </div>
                  <Button>
                    <FolderOpen className="mr-2 h-4 w-4" />
                    Novo Projeto
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filtros */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar projetos..."
                        value={filtroProjetos}
                        onChange={(e) => setFiltroProjetos(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filtroStatusProjetos} onValueChange={setFiltroStatusProjetos}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos os Status</SelectItem>
                      <SelectItem value="Ativo">Ativo</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Concluído">Concluído</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tabela de Projetos */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Projeto</TableHead>
                        <TableHead>Organização</TableHead>
                        <TableHead>Localização</TableHead>
                        <TableHead>Voluntários</TableHead>
                        <TableHead>Período</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projetosFiltrados.map((projeto) => (
                        <TableRow key={projeto.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{projeto.titulo}</div>
                              <Badge variant="outline" className="mt-1">
                                {projeto.categoria}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Building className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{projeto.organizacao}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">
                                {projeto.cidade}, {projeto.estado}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {projeto.voluntarios}/{projeto.maxVoluntarios}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div>{formatarData(projeto.dataInicio)}</div>
                              <div className="text-muted-foreground">até {formatarData(projeto.dataFim)}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                projeto.status === "Ativo"
                                  ? "default"
                                  : projeto.status === "Pendente"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {projeto.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {projeto.status === "Pendente" && (
                                <>
                                  <Button variant="ghost" size="sm" className="text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600">
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Campanhas */}
          <TabsContent value="campanhas" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="h-5 w-5" />
                      Gerenciar Campanhas
                    </CardTitle>
                    <CardDescription>Monitore e gerencie campanhas de doação</CardDescription>
                  </div>
                  <Button>
                    <Gift className="mr-2 h-4 w-4" />
                    Nova Campanha
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filtros */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar campanhas..."
                        value={filtroCampanhas}
                        onChange={(e) => setFiltroCampanhas(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filtroStatusCampanhas} onValueChange={setFiltroStatusCampanhas}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos os Status</SelectItem>
                      <SelectItem value="Ativa">Ativa</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                      <SelectItem value="Concluída">Concluída</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tabela de Campanhas */}
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campanha</TableHead>
                        <TableHead>Organização</TableHead>
                        <TableHead>Progresso</TableHead>
                        <TableHead>Doadores</TableHead>
                        <TableHead>Prazo</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campanhasFiltradas.map((campanha) => (
                        <TableRow key={campanha.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{campanha.titulo}</div>
                              <Badge variant="outline" className="mt-1">
                                {campanha.categoria}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Building className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{campanha.organizacao}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{formatarMoeda(campanha.arrecadado)}</div>
                              <div className="text-muted-foreground">
                                de {formatarMoeda(campanha.meta)} (
                                {Math.round((campanha.arrecadado / campanha.meta) * 100)}%)
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3 text-muted-foreground" />
                              <span className="text-sm">{campanha.doadores}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-muted-foreground" />
                                <span>{formatarData(campanha.dataFim)}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                campanha.status === "Ativa"
                                  ? "default"
                                  : campanha.status === "Pendente"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {campanha.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {campanha.status === "Pendente" && (
                                <>
                                  <Button variant="ghost" size="sm" className="text-green-600">
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600">
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Relatórios */}
          <TabsContent value="relatorios" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Crescimento de Usuários
                  </CardTitle>
                  <CardDescription>Novos usuários nos últimos 6 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Janeiro 2024</span>
                      <span className="font-semibold">+234 usuários</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fevereiro 2024</span>
                      <span className="font-semibold">+312 usuários</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Março 2024</span>
                      <span className="font-semibold">+189 usuários</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Arrecadação Mensal
                  </CardTitle>
                  <CardDescription>Valores arrecadados por mês</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Janeiro 2024</span>
                      <span className="font-semibold">R$ 125.430</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Fevereiro 2024</span>
                      <span className="font-semibold">R$ 198.720</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Março 2024</span>
                      <span className="font-semibold">R$ 163.500</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5" />
                    Projetos por Categoria
                  </CardTitle>
                  <CardDescription>Distribuição de projetos ativos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Educação</span>
                      <span className="font-semibold">32 projetos</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Assistência Social</span>
                      <span className="font-semibold">28 projetos</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Meio Ambiente</span>
                      <span className="font-semibold">18 projetos</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Saúde</span>
                      <span className="font-semibold">11 projetos</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Alertas do Sistema
                  </CardTitle>
                  <CardDescription>Itens que precisam de atenção</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>3 projetos aguardando aprovação há mais de 7 dias</AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>2 campanhas próximas do prazo final sem atingir a meta</AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>15 usuários inativos há mais de 30 dias</AlertDescription>
                    </Alert>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
