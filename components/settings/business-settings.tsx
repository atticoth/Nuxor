"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { GlassCard } from "../ui/glass-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Save, Plus, Trash2 } from "lucide-react"

interface BusinessData {
  companyName: string
  cnpj: string
  address: string
  description: string
  website: string
  socialMedia: { platform: string; url: string }[]
  notifications: {
    email: boolean
    whatsapp: boolean
    push: boolean
  }
}

export function BusinessSettings() {
  const [businessData, setBusinessData] = useState<BusinessData>({
    companyName: "",
    cnpj: "",
    address: "",
    description: "",
    website: "",
    socialMedia: [{ platform: "Instagram", url: "" }],
    notifications: {
      email: true,
      whatsapp: true,
      push: false,
    },
  })

  const handleSave = () => {
    console.log("Salvando dados do negócio:", businessData)
  }

  const addSocialMedia = () => {
    setBusinessData((prev) => ({
      ...prev,
      socialMedia: [...prev.socialMedia, { platform: "", url: "" }],
    }))
  }

  const removeSocialMedia = (index: number) => {
    setBusinessData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.filter((_, i) => i !== index),
    }))
  }

  const updateSocialMedia = (index: number, field: "platform" | "url", value: string) => {
    setBusinessData((prev) => ({
      ...prev,
      socialMedia: prev.socialMedia.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }))
  }

  return (
    <GlassCard variant="success" className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm">
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Dados do Negócio</h3>
            <p className="text-green-100 text-sm">Configure as informações da sua empresa</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-white font-medium">
              Nome da Empresa
            </Label>
            <Input
              id="companyName"
              value={businessData.companyName}
              onChange={(e) => setBusinessData((prev) => ({ ...prev, companyName: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
              placeholder="Nome da sua empresa"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cnpj" className="text-white font-medium">
              CNPJ (opcional)
            </Label>
            <Input
              id="cnpj"
              value={businessData.cnpj}
              onChange={(e) => setBusinessData((prev) => ({ ...prev, cnpj: e.target.value }))}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
              placeholder="00.000.000/0000-00"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address" className="text-white font-medium">
            Endereço
          </Label>
          <Input
            id="address"
            value={businessData.address}
            onChange={(e) => setBusinessData((prev) => ({ ...prev, address: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
            placeholder="Endereço completo da empresa"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white font-medium">
            Descrição do Negócio
          </Label>
          <Textarea
            id="description"
            value={businessData.description}
            onChange={(e) => setBusinessData((prev) => ({ ...prev, description: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
            placeholder="Descreva seu negócio, produtos ou serviços..."
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-white font-medium">
            Website
          </Label>
          <Input
            id="website"
            value={businessData.website}
            onChange={(e) => setBusinessData((prev) => ({ ...prev, website: e.target.value }))}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
            placeholder="https://seusite.com.br"
          />
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-white font-medium">Redes Sociais</Label>
            <Button
              type="button"
              onClick={addSocialMedia}
              size="sm"
              className="bg-white/10 hover:bg-white/20 border-white/20"
            >
              <Plus className="w-4 h-4 mr-1" />
              Adicionar
            </Button>
          </div>
          {businessData.socialMedia.map((social, index) => (
            <div key={index} className="flex gap-3">
              <Input
                value={social.platform}
                onChange={(e) => updateSocialMedia(index, "platform", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 w-32"
                placeholder="Plataforma"
              />
              <Input
                value={social.url}
                onChange={(e) => updateSocialMedia(index, "url", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 flex-1"
                placeholder="URL do perfil"
              />
              <Button
                type="button"
                onClick={() => removeSocialMedia(index)}
                size="sm"
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <Label className="text-white font-medium">Notificações</Label>
          <div className="space-y-4 p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Email</p>
                <p className="text-white/70 text-sm">Receber notificações por email</p>
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
                <p className="text-white font-medium">WhatsApp</p>
                <p className="text-white/70 text-sm">Receber lembretes via WhatsApp</p>
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
                <p className="text-white font-medium">Push</p>
                <p className="text-white/70 text-sm">Notificações push no navegador</p>
              </div>
              <Switch
                checked={businessData.notifications.push}
                onCheckedChange={(checked) =>
                  setBusinessData((prev) => ({
                    ...prev,
                    notifications: { ...prev.notifications, push: checked },
                  }))
                }
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Configurações
        </Button>
      </CardContent>
    </GlassCard>
  )
}
