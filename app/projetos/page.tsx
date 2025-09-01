"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Search, Filter, Loader2, Calendar } from "lucide-react"
import { apiService } from "@/lib/api"

// Interface para o projeto do backend
interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  cause: string;
  startDate: string;
  endDate: string;
  maxVolunteers: number;
  status: string;
  ngoId: string;
  createdAt: string;
  updatedAt: string;
}

const causas = [
  "Educação",
  "Saúde",
  "Meio ambiente",
  "Assistência Social",
  "Cultura",
  "Esporte",
  "Direitos Humanos",
  "Animais",
  "Combate à Fome",
  "Tecnologia",
  "Religião"
]

const statusOptions = [
  "open",
  "closed",
  "in_progress",
  "completed"
]

const estados = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
]

export default function ProjetosPage() {
  const [projetos, setProjetos] = useState<Project[]>([])
  const [projetosFiltrados, setProjetosFiltrados] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [filtros, setFiltros] = useState({
    busca: "",
    cidade: "",
    estado: "Todos os estados",
    causa: "Todas as causas",
    status: "Todos os status"
  })

  // Buscar projetos da API
  useEffect(() => {
    fetchProjetos()
  }, [])

  const fetchProjetos = async () => {
    try {
      setIsLoading(true)
      setError("")
      
      // Pegar token do localStorage se disponível
      const token = localStorage.getItem('auth_token')
      
      const response = await apiService.getProjects(token || undefined)
      
      if (response.error) {
        setError(response.error)
        return
      }

      if (response.data) {
        setProjetos(response.data)
        setProjetosFiltrados(response.data)
      }
    } catch (err) {
      setError("Erro ao carregar projetos. Tente novamente.")
      console.error("Erro ao buscar projetos:", err)
    } finally {
      setIsLoading(false)
    }
  }

  // Aplicar filtros
  useEffect(() => {
    const projetosFiltrados = projetos.filter((projeto) => {
      const matchBusca =
        projeto.title.toLowerCase().includes(filtros.busca.toLowerCase()) ||
        projeto.description.toLowerCase().includes(filtros.busca.toLowerCase())
      
      const matchCidade = !filtros.cidade || 
        projeto.location.toLowerCase().includes(filtros.cidade.toLowerCase())
      
      const matchEstado = filtros.estado === "Todos os estados" || 
        projeto.location.includes(filtros.estado)
      
      const matchCausa = filtros.causa === "Todas as causas" || 
        projeto.cause === filtros.causa
      
      const matchStatus = filtros.status === "Todos os status" || 
        projeto.status === filtros.status

      return matchBusca && matchCidade && matchEstado && matchCausa && matchStatus
    })

    setProjetosFiltrados(projetosFiltrados)
  }, [projetos, filtros])

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }))
  }

  const limparFiltros = () => {
    setFiltros({
      busca: "",
      cidade: "",
      estado: "Todos os estados",
      causa: "Todas as causas",
      status: "Todos os status"
    })
  }

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString('pt-BR')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'closed':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'completed':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Aberto'
      case 'closed':
        return 'Fechado'
      case 'in_progress':
        return 'Em Andamento'
      case 'completed':
        return 'Concluído'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-lg text-muted-foreground">Carregando projetos...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">
            Projetos de Voluntariado
          </h1>
          <p className="text-lg text-muted-foreground">
            Encontre projetos que combinam com você e faça a diferença na sua comunidade
          </p>
        </div>

        {/* Filtros */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros de Busca
            </CardTitle>
            <CardDescription>Use os filtros para encontrar projetos específicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
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
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  placeholder="Digite a cidade..."
                  value={filtros.cidade}
                  onChange={(e) => handleFiltroChange("cidade", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select value={filtros.estado} onValueChange={(value) => handleFiltroChange("estado", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos os estados">Todos os estados</SelectItem>
                    {estados.map((estado) => (
                      <SelectItem key={estado} value={estado}>
                        {estado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="causa">Causa</Label>
                <Select value={filtros.causa} onValueChange={(value) => handleFiltroChange("causa", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a causa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todas as causas">Todas as causas</SelectItem>
                    {causas.map((causa) => (
                      <SelectItem key={causa} value={causa}>
                        {causa}
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
                    <SelectItem value="Todos os status">Todos os status</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {getStatusText(status)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                {projetosFiltrados.length} projeto{projetosFiltrados.length !== 1 ? "s" : ""} encontrado
                {projetosFiltrados.length !== 1 ? "s" : ""}
              </p>
              <Button variant="outline" onClick={limparFiltros}>
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mensagem de erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchProjetos}
              className="mt-2"
            >
              Tentar Novamente
            </Button>
          </div>
        )}

        {/* Lista de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetosFiltrados.map((projeto) => (
            <Card key={projeto.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{projeto.cause}</Badge>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(projeto.status)}
                  >
                    {getStatusText(projeto.status)}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{projeto.title}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {projeto.location}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{projeto.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatarData(projeto.startDate)} - {formatarData(projeto.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Máx: {projeto.maxVolunteers} voluntários
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>Criado em:</strong> {formatarData(projeto.createdAt)}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link href={`/projetos/${projeto.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      Ver Detalhes
                    </Button>
                  </Link>
                  <Link href={`/projetos/${projeto.id}`} className="flex-1">
                    <Button className="w-full">Participar</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projetosFiltrados.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Nenhum projeto encontrado</p>
              <p>Tente ajustar os filtros de busca</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
