"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Calendar, Heart, ArrowLeft, Loader2, DollarSign, Users, Target, TrendingUp } from "lucide-react"
import { apiService } from "@/lib/api"

// Interface para a campanha detalhada
interface CampaignDetail {
  id: string
  title: string
  description: string
  goalAmount: number
  currentAmount: number
  startDate: string
  endDate: string
  status: string
  category: string
  ngoId: string
  createdAt: string
  numberOfDonations?: number
  ngo: {
    id: string
    organizationName: string
    cnpj: string
    description: string
    email: string
    city: string
    state: string
    causes: string[]
    areas: string[]
    skills: string[]
    preferredCauses: string[]
    projects: any[]
    campaigns: string[]
    createdAt: string
  }
}

// Interface para o formulário de doação
interface DonationForm {
  amount: number
  donorName: string
  donorEmail: string
  message: string
  anonymous: boolean
}

export default function CampaignDetailPage() {
  const params = useParams()
  const router = useRouter()
  const campaignId = params.id as string
  
  const [campaign, setCampaign] = useState<CampaignDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [donationForm, setDonationForm] = useState<DonationForm>({
    amount: 0,
    donorName: "",
    donorEmail: "",
    message: "",
    anonymous: false
  })
  const [isSubmittingDonation, setIsSubmittingDonation] = useState(false)

  useEffect(() => {
    if (campaignId) {
      fetchCampaignDetails()
    }
  }, [campaignId])

  const fetchCampaignDetails = async () => {
    try {
      setIsLoading(true)
      setError("")
      
      const response = await apiService.getCampaignById(campaignId)
      
      if (response.error) {
        setError(response.error)
        return
      }

      if (response.data) {
        console.log("Dados da campanha recebidos:", response.data)
        setCampaign(response.data)
      }
    } catch (err) {
      setError("Erro ao carregar detalhes da campanha. Tente novamente.")
      console.error("Erro ao buscar campanha:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDonationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!campaign) return
    
    try {
      setIsSubmittingDonation(true)
      
      const response = await fetch(`http://localhost:3333/api/campaigns/${campaignId}/donate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationForm),
      })

      if (response.ok) {
        alert("Doação realizada com sucesso! Obrigado pela sua contribuição.")
        setShowDonationForm(false)
        setDonationForm({
          amount: 0,
          donorName: "",
          donorEmail: "",
          message: "",
          anonymous: false
        })
        // Recarregar dados da campanha para atualizar valores
        fetchCampaignDetails()
      } else {
        const errorData = await response.json()
        alert(`Erro ao realizar doação: ${errorData.message || 'Tente novamente'}`)
      }
    } catch (error) {
      console.error("Erro ao doar:", error)
      alert("Erro ao realizar doação. Tente novamente.")
    } finally {
      setIsSubmittingDonation(false)
    }
  }

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor)
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR")
  }

  const calcularProgresso = () => {
    if (!campaign || !campaign.goalAmount || campaign.goalAmount === 0) return 0
    return (campaign.currentAmount / campaign.goalAmount) * 100
  }

  const calcularDiasRestantes = () => {
    if (!campaign || !campaign.endDate) return 0
    const hoje = new Date()
    const dataFim = new Date(campaign.endDate)
    const diffTime = dataFim.getTime() - hoje.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-gray-600">Carregando detalhes da campanha...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button
              variant="outline"
              onClick={() => router.back()}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-red-600 mb-4">
                    {error || "Campanha não encontrada"}
                  </p>
                  <Button onClick={fetchCampaignDetails}>
                    Tentar Novamente
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Campanhas
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal - Detalhes da Campanha */}
          <div className="lg:col-span-2 space-y-6">
            {/* Card Principal da Campanha */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl mb-2">{campaign.title}</CardTitle>
                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant={campaign.status === 'active' ? 'default' : campaign.status === 'completed' ? 'secondary' : 'destructive'}>
                        {campaign.status === 'active' ? 'Ativa' : campaign.status === 'completed' ? 'Concluída' : 'Cancelada'}
                      </Badge>
                      <Badge variant="outline">{campaign.category}</Badge>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowDonationForm(true)}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={campaign.status !== 'active'}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Doar Agora
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Descrição */}
                <div>
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-gray-700 leading-relaxed">{campaign.description}</p>
                </div>

                                 {/* Progresso da Campanha */}
                 <div>
                   <div className="flex items-center justify-between mb-2">
                     <h3 className="font-semibold">Progresso da Campanha</h3>
                     <span className="text-sm text-gray-600">
                       {formatarMoeda(campaign.currentAmount || 0)} de {formatarMoeda(campaign.goalAmount || 0)}
                     </span>
                   </div>
                   <Progress value={calcularProgresso()} className="h-3" />
                   <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                     <span>{calcularProgresso().toFixed(1)}% concluído</span>
                     <span>{campaign.numberOfDonations || 0} doadores</span>
                   </div>
                 </div>

                                 {/* Informações da ONG */}
                 {campaign.ngo && (
                   <div>
                     <h3 className="font-semibold mb-3">Organização Responsável</h3>
                     <Card className="bg-gray-50">
                       <CardContent className="pt-4">
                         <h4 className="font-medium text-lg mb-2">{campaign.ngo.organizationName || 'Nome não disponível'}</h4>
                         <p className="text-gray-600 mb-3">{campaign.ngo.description || 'Descrição não disponível'}</p>
                         <div className="grid grid-cols-2 gap-4 text-sm">
                           <div>
                             <span className="font-medium">Cidade:</span> {campaign.ngo.city || 'N/A'}, {campaign.ngo.state || 'N/A'}
                           </div>
                           <div>
                             <span className="font-medium">Email:</span> {campaign.ngo.email || 'Email não disponível'}
                           </div>
                         </div>
                         {campaign.ngo.causes && campaign.ngo.causes.length > 0 && (
                           <div className="mt-3">
                             <span className="font-medium text-sm">Causas:</span>
                             <div className="flex flex-wrap gap-2 mt-1">
                               {campaign.ngo.causes.map((cause, index) => (
                                 <Badge key={index} variant="outline" className="text-xs">
                                   {cause}
                                 </Badge>
                               ))}
                             </div>
                           </div>
                         )}
                       </CardContent>
                     </Card>
                   </div>
                 )}

                                 {/* Datas e Localização */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="flex items-center gap-3">
                     <Calendar className="h-5 w-5 text-gray-500" />
                     <div>
                       <p className="font-medium">Data de Início</p>
                       <p className="text-sm text-gray-600">{campaign.startDate ? formatarData(campaign.startDate) : 'Data não disponível'}</p>
                     </div>
                   </div>
                   <div className="flex items-center gap-3">
                     <Calendar className="h-5 w-5 text-gray-500" />
                     <div>
                       <p className="font-medium">Data de Término</p>
                       <p className="text-sm text-gray-600">{campaign.endDate ? formatarData(campaign.endDate) : 'Data não disponível'}</p>
                     </div>
                   </div>
                 </div>

                                 {campaign.status === 'active' && (
                   <div className="bg-blue-50 p-4 rounded-lg">
                     <div className="flex items-center gap-2 mb-2">
                       <Target className="h-5 w-5 text-blue-600" />
                       <span className="font-medium text-blue-800">Meta da Campanha</span>
                     </div>
                     <p className="text-blue-700">
                       Esta campanha precisa arrecadar {formatarMoeda((campaign.goalAmount || 0) - (campaign.currentAmount || 0))} 
                       para atingir sua meta. {calcularDiasRestantes() > 0 ? `Restam ${calcularDiasRestantes()} dias.` : 'Último dia!'}
                     </p>
                   </div>
                 )}
              </CardContent>
            </Card>
          </div>

          {/* Coluna Lateral - Estatísticas e Ações */}
          <div className="space-y-6">
            {/* Estatísticas Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <DollarSign className="h-5 w-5 text-green-600" />
                     <span>Arrecadado</span>
                   </div>
                   <span className="font-semibold">{formatarMoeda(campaign.currentAmount || 0)}</span>
                 </div>
                 
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <Target className="h-5 w-5 text-blue-600" />
                     <span>Meta</span>
                   </div>
                   <span className="font-semibold">{formatarMoeda(campaign.goalAmount || 0)}</span>
                 </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span>Doadores</span>
                  </div>
                  <span className="font-semibold">{campaign.numberOfDonations || 0}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                    <span>Progresso</span>
                  </div>
                  <span className="font-semibold">{calcularProgresso().toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>

            
          </div>
        </div>

        {/* Modal de Doação */}
        {showDonationForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Fazer Doação</CardTitle>
                <CardDescription>
                  Contribua para a campanha "{campaign.title}"
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleDonationSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="amount">Valor da Doação (R$)</Label>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      min="1"
                      value={donationForm.amount}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                      placeholder="50.00"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="donorName">Nome (opcional)</Label>
                    <Input
                      id="donorName"
                      value={donationForm.donorName}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, donorName: e.target.value }))}
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="donorEmail">Email</Label>
                    <Input
                      id="donorEmail"
                      type="email"
                      value={donationForm.donorEmail}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, donorEmail: e.target.value }))}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Mensagem (opcional)</Label>
                    <Textarea
                      id="message"
                      value={donationForm.message}
                      onChange={(e) => setDonationForm(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Deixe uma mensagem de apoio..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="anonymous"
                      checked={donationForm.anonymous}
                      onCheckedChange={(checked) => setDonationForm(prev => ({ ...prev, anonymous: checked as boolean }))}
                    />
                    <Label htmlFor="anonymous">Doação anônima</Label>
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowDonationForm(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      disabled={isSubmittingDonation || donationForm.amount <= 0}
                    >
                      {isSubmittingDonation ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4 mr-2" />
                          Doar
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
