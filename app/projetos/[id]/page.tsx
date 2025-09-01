"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { MapPin, Clock, Users, ArrowLeft, CheckCircle, Building, Calendar, Target, Heart, Loader2, AlertCircle } from "lucide-react"
import { apiService } from "@/lib/api"

// Interfaces para os dados do backend
interface Ngo {
  id: string;
  organizationName: string;
  cnpj: string;
  description: string;
  email: string;
  city: string;
  state: string;
  causes: string[];
  areas: string[];
  skills: string[];
  preferredCauses: string[];
  projects: string[];
  campaigns: Array<{
    id: string;
    title: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
    startDate: string;
    endDate: string;
    status: string;
    ngo: string;
    ngoId: string;
    createdAt: string;
  }>;
  createdAt: string;
}

interface Enrollment {
  id: string;
  volunteer: {
    id: string;
    name: string;
    email: string;
    city: string;
    state: string;
    userType: string;
    skills: string[];
    experience: string;
    preferredCauses: string[];
    projects: string[];
    campaigns: string[];
    enrollments: string[];
    ratingsGiven: string[];
    donations: string[];
    createdAt: string;
  };
  volunteerId: string;
  project: string;
  projectId: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectDetail {
  id: string;
  title: string;
  description: string;
  location: string;
  cause: string;
  startDate: string;
  endDate: string;
  maxVolunteers: number;
  status: string;
  ngo: Ngo;
  ngoId: string;
  enrollments: Enrollment[];
  createdAt: string;
  updatedAt: string;
}

// Array vazio - será preenchido pela API
const projetos: ProjectDetail[] = []

export default function ProjetoDetalhePage() {
  const params = useParams()
  const [projeto, setProjeto] = useState<ProjectDetail | null>(null)
  const [ngoData, setNgoData] = useState<Ngo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [inscrito, setInscrito] = useState(false)
  const [success, setSuccess] = useState("")

  // Buscar detalhes do projeto da API
  useEffect(() => {
    if (params.id) {
      fetchProjetoDetalhes(params.id as string)
    }
  }, [params.id])

  const fetchProjetoDetalhes = async (projectId: string) => {
    try {
      setIsLoading(true)
      setError("")
      
      // Pegar token do localStorage se disponível
      const token = localStorage.getItem('auth_token')
      
      const response = await apiService.getProjectById(projectId, token || undefined)
      
      if (response.error) {
        setError(response.error)
        return
      }

      if (response.data) {
        setProjeto(response.data)
        
        // Se o projeto tem ngoId, buscar dados da ONG
        if (response.data.ngoId) {
          await fetchNgoData(response.data.ngoId, token || undefined)
        }
      }
    } catch (err) {
      setError("Erro ao carregar detalhes do projeto. Tente novamente.")
      console.error("Erro ao buscar projeto:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchNgoData = async (ngoId: string, token?: string) => {
    try {
      const ngoResponse = await apiService.getNgoById(ngoId, token || undefined)
      
      if (ngoResponse.error) {
        console.warn("Erro ao buscar dados da ONG:", ngoResponse.error)
        return
      }

      if (ngoResponse.data) {
        setNgoData(ngoResponse.data)
      }
    } catch (err) {
      console.warn("Erro ao buscar dados da ONG:", err)
    }
  }

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-lg text-muted-foreground">Carregando detalhes do projeto...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h1 className="text-2xl font-bold text-foreground mb-4">Erro ao carregar projeto</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <div className="space-x-4">
              <Button onClick={() => fetchProjetoDetalhes(params.id as string)}>
                Tentar Novamente
              </Button>
              <Link href="/projetos">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar aos Projetos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
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
                {projeto.cause}
              </Badge>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {projeto.status}
              </Badge>
            </div>
          </div>

          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-foreground mb-4">{projeto.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{projeto.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span>{ngoData?.organizationName || projeto.ngo?.organizationName || 'ONG não informada'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>
                {projeto.enrollments?.length || 0}/{projeto.maxVolunteers} voluntários
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(projeto.startDate).toLocaleDateString('pt-BR')} - {new Date(projeto.endDate).toLocaleDateString('pt-BR')}</span>
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
                <p className="text-muted-foreground leading-relaxed">{projeto.description}</p>
              </CardContent>
            </Card>

            {/* Informações da ONG */}
            {(ngoData || projeto.ngo) && (
              <Card>
                <CardHeader>
                  <CardTitle>Organização Responsável</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <strong className="text-foreground">Nome:</strong> {ngoData?.organizationName || projeto.ngo?.organizationName}
                    </div>
                    {(ngoData?.description || projeto.ngo?.description) && (
                      <div>
                        <strong className="text-foreground">Descrição:</strong> {ngoData?.description || projeto.ngo?.description}
                      </div>
                    )}
                    <div>
                      <strong className="text-foreground">Localização:</strong> {ngoData?.city || projeto.ngo?.city}, {ngoData?.state || projeto.ngo?.state}
                    </div>
                    <div>
                      <strong className="text-foreground">Email:</strong> {ngoData?.email || projeto.ngo?.email}
                    </div>
                    {ngoData?.cnpj && (
                      <div>
                        <strong className="text-foreground">CNPJ:</strong> {ngoData.cnpj}
                      </div>
                    )}
                    {ngoData?.causes && ngoData.causes.length > 0 && (
                      <div>
                        <strong className="text-foreground">Causas:</strong> {ngoData.causes.join(', ')}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Voluntários Inscritos */}
            {projeto.enrollments && projeto.enrollments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Voluntários Inscritos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {projeto.enrollments.slice(0, 5).map((enrollment) => (
                      <div key={enrollment.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span className="font-medium">{enrollment.volunteer.name}</span>
                        <Badge variant="outline">{enrollment.status}</Badge>
                      </div>
                    ))}
                    {projeto.enrollments.length > 5 && (
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        +{projeto.enrollments.length - 5} outros voluntários
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
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
                      {projeto.enrollments?.length || 0}/{projeto.maxVolunteers}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${((projeto.enrollments?.length || 0) / projeto.maxVolunteers) * 100}%` }}
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
                    {new Date(projeto.startDate).toLocaleDateString('pt-BR')} até {new Date(projeto.endDate).toLocaleDateString('pt-BR')}
                  </p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Localização</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{projeto.location}</p>
                </div>

                <Separator />

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Voluntários</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{projeto.enrollments?.length || 0} inscritos</p>
                </div>

                <Separator />

                <div>
                  <span className="font-medium">Contato</span>
                  <p className="text-sm text-muted-foreground mt-1">{ngoData?.email || projeto.ngo?.email || 'Email não informado'}</p>
                  <p className="text-sm text-muted-foreground">{ngoData?.city || projeto.ngo?.city}, {ngoData?.state || projeto.ngo?.state}</p>
                </div>
              </CardContent>
            </Card>

            {/* Informações do Projeto */}
            <Card>
              <CardHeader>
                <CardTitle>Informações do Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>
                    <strong className="text-foreground">ID:</strong> {projeto.id}
                  </div>
                  <div>
                    <strong className="text-foreground">Criado em:</strong> {new Date(projeto.createdAt).toLocaleDateString('pt-BR')}
                  </div>
                  <div>
                    <strong className="text-foreground">Última atualização:</strong> {new Date(projeto.updatedAt).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

