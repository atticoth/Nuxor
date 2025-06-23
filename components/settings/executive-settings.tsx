"use client"

import { useState } from "react"
import { ExecutiveCard } from "../ui/executive-card"
import { ProfessionalButton } from "../ui/professional-button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../../hooks/use-auth"
import { User, Shield, Building, Camera, Save, Eye, EyeOff, Check, X } from "lucide-react"

const businessTypes = ["Comércio", "Transporte", "Alimentação", "Serviços", "Construção", "Saúde", "Educação", "Outros"]

export function ExecutiveSettings() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState("profile")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    businessType: user?.businessType || "",
    phone: user?.phone || "",
    company: "",
    position: "",
  })

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })

  const [businessData, setBusinessData] = useState({
    companyName: "",
    cnpj: "",
    address: "",
    website: "",
    notifications: {
      email: true,
      whatsapp: true,
      reports: true,
    },
  })

  const sections = [
    { id: "profile", label: "Perfil Executivo", icon: User },
    { id: "security", label: "Segurança", icon: Shield },
    { id: "business", label: "Empresa", icon: Building },
  ]

  const passwordRequirements = [
    { text: "Pelo menos 8 caracteres", met: passwords.new.length >= 8 },
    { text: "Pelo menos uma letra maiúscula", met: /[A-Z]/.test(passwords.new) },
    { text: "Pelo menos uma letra minúscula", met: /[a-z]/.test(passwords.new) },
    { text: "Pelo menos um número", met: /\d/.test(passwords.new) },
  ]

  const handleSaveProfile = () => {
    console.log("Salvando perfil:", profileData)
    setIsEditingProfile(false)
  }

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) return
    if (!passwordRequirements.every((req) => req.met)) return

    console.log("Alterando senha...")
    setPasswords({ current: "", new: "", confirm: "" })
  }

  const renderProfileSection = () => (
    <ExecutiveCard elevated>
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Perfil Executivo</h3>
            <p className="text-blue-100 text-sm">Gerencie suas informações profissionais</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-blue-200">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl font-bold bg-blue-100 text-blue-700">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            {isEditingProfile && (
              <ProfessionalButton size="sm" className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full">
                <Camera className="w-4 h-4" />
              </ProfessionalButton>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-1">{user?.name}</h2>
            <p className="text-slate-600">{user?.businessType}</p>
            <p className="text-slate-500 text-sm">{user?.email}</p>
          </div>
          {!isEditingProfile && (
            <ProfessionalButton onClick={() => setIsEditingProfile(true)}>Editar Perfil</ProfessionalButton>
          )}
        </div>

        {isEditingProfile ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700 font-medium">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium">
                  Email Corporativo
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                  className="h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-slate-700 font-medium">
                  Setor de Atuação
                </Label>
                <Select
                  value={profileData.businessType}
                  onValueChange={(value) => setProfileData((prev) => ({ ...prev, businessType: value }))}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-700 font-medium">
                  Telefone Comercial
                </Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="h-12"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-700 font-medium">
                  Empresa
                </Label>
                <Input
                  id="company"
                  value={profileData.company}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, company: e.target.value }))}
                  className="h-12"
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position" className="text-slate-700 font-medium">
                  Cargo
                </Label>
                <Input
                  id="position"
                  value={profileData.position}
                  onChange={(e) => setProfileData((prev) => ({ ...prev, position: e.target.value }))}
                  className="h-12"
                  placeholder="Seu cargo na empresa"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <ProfessionalButton onClick={handleSaveProfile} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </ProfessionalButton>
              <ProfessionalButton variant="outline" onClick={() => setIsEditingProfile(false)} className="flex-1">
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </ProfessionalButton>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ExecutiveCard className="p-4">
              <Label className="text-slate-600 text-sm">Nome</Label>
              <p className="text-slate-900 font-medium">{user?.name}</p>
            </ExecutiveCard>
            <ExecutiveCard className="p-4">
              <Label className="text-slate-600 text-sm">Email</Label>
              <p className="text-slate-900 font-medium">{user?.email}</p>
            </ExecutiveCard>
            <ExecutiveCard className="p-4">
              <Label className="text-slate-600 text-sm">Setor</Label>
              <p className="text-slate-900 font-medium">{user?.businessType}</p>
            </ExecutiveCard>
            <ExecutiveCard className="p-4">
              <Label className="text-slate-600 text-sm">Telefone</Label>
              <p className="text-slate-900 font-medium">{user?.phone || "Não informado"}</p>
            </ExecutiveCard>
          </div>
        )}
      </CardContent>
    </ExecutiveCard>
  )

  const renderSecuritySection = () => (
    <ExecutiveCard elevated>
      <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Segurança da Conta</h3>
            <p className="text-amber-100 text-sm">Mantenha sua conta corporativa segura</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-slate-700 font-medium">
              Senha Atual
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPasswords.current ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                className="h-12 pr-12"
                placeholder="Digite sua senha atual"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
              >
                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-slate-700 font-medium">
              Nova Senha
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPasswords.new ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => setPasswords((prev) => ({ ...prev, new: e.target.value }))}
                className="h-12 pr-12"
                placeholder="Digite sua nova senha"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
              >
                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-slate-700 font-medium">
              Confirmar Nova Senha
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                className="h-12 pr-12"
                placeholder="Confirme sua nova senha"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
              >
                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {passwords.new && (
            <ExecutiveCard className="p-4 bg-slate-50">
              <h4 className="text-slate-700 font-medium mb-3">Requisitos da Senha:</h4>
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {req.met ? <Check className="w-4 h-4 text-emerald-600" /> : <X className="w-4 h-4 text-red-500" />}
                    <span className={`text-sm ${req.met ? "text-emerald-600" : "text-slate-600"}`}>{req.text}</span>
                  </div>
                ))}
              </div>
            </ExecutiveCard>
          )}

          <ProfessionalButton
            onClick={handleChangePassword}
            className="w-full"
            disabled={!passwordRequirements.every((req) => req.met) || passwords.new !== passwords.confirm}
          >
            <Shield className="w-4 h-4 mr-2" />
            Alterar Senha
          </ProfessionalButton>
        </form>
      </CardContent>
    </ExecutiveCard>
  )

  const renderBusinessSection = () => (
    <ExecutiveCard elevated>
      <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <CardTitle className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Configurações Empresariais</h3>
            <p className="text-emerald-100 text-sm">Dados da sua organização</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-slate-700 font-medium">
              Razão Social
            </Label>
            <Input
              id="companyName"
              value={businessData.companyName}
              onChange={(e) => setBusinessData((prev) => ({ ...prev, companyName: e.target.value }))}
              className="h-12"
              placeholder="Nome da empresa"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cnpj" className="text-slate-700 font-medium">
              CNPJ
            </Label>
            <Input
              id="cnpj"
              value={businessData.cnpj}
              onChange={(e) => setBusinessData((prev) => ({ ...prev, cnpj: e.target.value }))}
              className="h-12"
              placeholder="00.000.000/0000-00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-slate-700 font-medium">
            Endereço Comercial
          </Label>
          <Textarea
            id="address"
            value={businessData.address}
            onChange={(e) => setBusinessData((prev) => ({ ...prev, address: e.target.value }))}
            className="resize-none"
            rows={3}
            placeholder="Endereço completo da empresa"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-slate-700 font-medium">
            Website Corporativo
          </Label>
          <Input
            id="website"
            value={businessData.website}
            onChange={(e) => setBusinessData((prev) => ({ ...prev, website: e.target.value }))}
            className="h-12"
            placeholder="https://www.empresa.com.br"
          />
        </div>

        <div className="space-y-4">
          <Label className="text-slate-700 font-medium">Preferências de Notificação</Label>
          <ExecutiveCard className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-900 font-medium">Relatórios por Email</p>
                <p className="text-slate-600 text-sm">Receber relatórios executivos mensais</p>
              </div>
              <Switch
                checked={businessData.notifications.email}
                onCheckedChange={(checked) =>
                  setBusinessData((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, email: checked },
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-900 font-medium">Alertas WhatsApp</p>
                <p className="text-slate-600 text-sm">Notificações de vencimentos e alertas</p>
              </div>
              <Switch
                checked={businessData.notifications.whatsapp}
                onCheckedChange={(checked) =>
                  setBusinessData((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, whatsapp: checked },
                  }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-900 font-medium">Relatórios Automáticos</p>
                <p className="text-slate-600 text-sm">Gerar relatórios executivos automaticamente</p>
              </div>
              <Switch
                checked={businessData.notifications.reports}
                onCheckedChange={(checked) =>
                  setBusinessData((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, reports: checked },
                  }))
                }
              />
            </div>
          </ExecutiveCard>
        </div>

        <ProfessionalButton className="w-full">
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações Empresariais
        </ProfessionalButton>
      </CardContent>
    </ExecutiveCard>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Configurações Executivas</h1>
        <p className="text-slate-600 text-lg">Gerencie sua conta e preferências corporativas</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <ExecutiveCard className="p-6">
            <CardContent className="p-0 space-y-2">
              {sections.map((section) => (
                <ProfessionalButton
                  key={section.id}
                  variant={activeSection === section.id ? "primary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection(section.id)}
                >
                  <section.icon className="mr-3 h-5 w-5" />
                  {section.label}
                </ProfessionalButton>
              ))}
            </CardContent>
          </ExecutiveCard>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeSection === "profile" && renderProfileSection()}
          {activeSection === "security" && renderSecuritySection()}
          {activeSection === "business" && renderBusinessSection()}
        </div>
      </div>
    </div>
  )
}
