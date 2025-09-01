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
import { MapPin, Clock, Users, Search, Filter } from "lucide-react"

const causas = [
  "Educação",
  "Saúde",
  "Meio Ambiente",
  "Assistência Social",
  "Cultura",
  "Esporte",
  "Direitos Humanos",
  "Animais",
]

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

const projetos = [
  {
    id: 1,
    titulo: "Educação para Todos",
    descricao: "Projeto de alfabetização para adultos em comunidades carentes. Precisamos de professores voluntários.",
    cidade: "São Paulo",
    estado: "SP",
    causa: "Educação",
    horasSemana: "4h/semana",
    voluntarios: 12,
    maxVoluntarios: 20,
    requisitos: ["Ensino médio completo", "Paciência para ensinar", "Disponibilidade aos sábados"],
    organizacao: "Instituto Educar",
    status: "Ativo",
  },
  {
    id: 2,
    titulo: "Alimentação Solidária",
    descricao: "Distribuição de refeições para pessoas em situação de rua. Ajude na preparação e distribuição.",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    causa: "Assistência Social",
    horasSemana: "6h/semana",
    voluntarios: 8,
    maxVoluntarios: 15,
    requisitos: ["Maior de 16 anos", "Disponibilidade aos domingos", "Disposição para trabalho em equipe"],
    organizacao: "Ação Solidária RJ",
    status: "Ativo",
  },
  {
    id: 3,
    titulo: "Preservação Ambiental",
    descricao: "Plantio de árvores e limpeza de parques urbanos. Contribua para um meio ambiente mais saudável.",
    cidade: "Belo Horizonte",
    estado: "MG",
    causa: "Meio Ambiente",
    horasSemana: "3h/semana",
    voluntarios: 15,
    maxVoluntarios: 25,
    requisitos: ["Disposição física", "Amor pela natureza", "Disponibilidade aos sábados"],
    organizacao: "Verde Vida BH",
    status: "Ativo",
  },
  {
    id: 4,
    titulo: "Apoio a Idosos",
    descricao: "Companhia e atividades recreativas para idosos em asilos. Leve alegria e carinho para quem precisa.",
    cidade: "Porto Alegre",
    estado: "RS",
    causa: "Assistência Social",
    horasSemana: "2h/semana",
    voluntarios: 6,
    maxVoluntarios: 12,
    requisitos: ["Paciência", "Empatia", "Disponibilidade flexível"],
    organizacao: "Cuidar RS",
    status: "Ativo",
  },
  {
    id: 5,
    titulo: "Biblioteca Comunitária",
    descricao: "Organização e manutenção de biblioteca em comunidade carente. Ajude a promover o acesso à leitura.",
    cidade: "Salvador",
    estado: "BA",
    causa: "Educação",
    horasSemana: "5h/semana",
    voluntarios: 4,
    maxVoluntarios: 8,
    requisitos: ["Amor pelos livros", "Organização", "Conhecimento básico de informática"],
    organizacao: "Ler é Crescer",
    status: "Ativo",
  },
  {
    id: 6,
    titulo: "Cuidado Animal",
    descricao: "Cuidados com animais abandonados em ONG. Ajude na alimentação, limpeza e socialização.",
    cidade: "Curitiba",
    estado: "PR",
    causa: "Animais",
    horasSemana: "4h/semana",
    voluntarios: 10,
    maxVoluntarios: 18,
    requisitos: ["Amor pelos animais", "Não ter medo de cães e gatos", "Disponibilidade aos fins de semana"],
    organizacao: "Patinhas Carentes",
    status: "Ativo",
  },
]

export default function ProjetosPage() {
  const [filtros, setFiltros] = useState({
    busca: "",
    cidade: "",
    estado: "Todos os estados",
    causa: "Todas as causas",
  })

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor }))
  }

  const projetosFiltrados = projetos.filter((projeto) => {
    const matchBusca =
      projeto.titulo.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      projeto.descricao.toLowerCase().includes(filtros.busca.toLowerCase())
    const matchCidade = !filtros.cidade || projeto.cidade.toLowerCase().includes(filtros.cidade.toLowerCase())
    const matchEstado = filtros.estado === "Todos os estados" || projeto.estado === filtros.estado
    const matchCausa = filtros.causa === "Todas as causas" || projeto.causa === filtros.causa

    return matchBusca && matchCidade && matchEstado && matchCausa
  })

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                {projetosFiltrados.length} projeto{projetosFiltrados.length !== 1 ? "s" : ""} encontrado
                {projetosFiltrados.length !== 1 ? "s" : ""}
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  setFiltros({ busca: "", cidade: "", estado: "Todos os estados", causa: "Todas as causas" })
                }
              >
                Limpar Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetosFiltrados.map((projeto) => (
            <Card key={projeto.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary">{projeto.causa}</Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {projeto.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl">{projeto.titulo}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {projeto.cidade}, {projeto.estado}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{projeto.descricao}</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{projeto.horasSemana}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {projeto.voluntarios}/{projeto.maxVoluntarios} voluntários
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(projeto.voluntarios / projeto.maxVoluntarios) * 100}%` }}
                    />
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>Organização:</strong> {projeto.organizacao}
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

        {projetosFiltrados.length === 0 && (
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
