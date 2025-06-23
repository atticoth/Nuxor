"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GlassCard } from "../ui/glass-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "../../hooks/use-auth"
import { User, Camera, Save, X } from "lucide-react"

const businessTypes = ["Comércio", "Transporte", "Alimentação", "Serviços", "Construção", "Saúde", "Educação", "Outros"]

export function ProfileSettings() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    businessType: user?.businessType || "",
    phone: user?.phone || "",
    avatar: "",
  })

  const handleSave = () => {
    // Aqui você salvaria os dados no backend
    console.log("Salvando dados:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      businessType: user?.businessType || "",
      phone: user?.phone || "",
      avatar: "",
    })
    setIsEditing(false)
  }

  return (
    <GlassCard variant="premium" className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm">
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Perfil do Usuário</h3>
            <p className="text-purple-100 text-sm">Gerencie suas informações pessoais</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white/30">
              <AvatarImage src={formData.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
            <p className="text-white/70">{user?.businessType}</p>
            <p className="text-white/50 text-sm">{user?.email}</p>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Editar Perfil
            </Button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                  placeholder="Seu nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-white font-medium">
                  Tipo de Negócio
                </Label>
                <Select
                  value={formData.businessType}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}
                >
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Selecione o tipo" />
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
                <Label htmlFor="phone" className="text-white font-medium">
                  WhatsApp
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <Label className="text-white/70 text-sm">Nome</Label>
                <p className="text-white font-medium">{user?.name}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <Label className="text-white/70 text-sm">Email</Label>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <Label className="text-white/70 text-sm">Tipo de Negócio</Label>
                <p className="text-white font-medium">{user?.businessType}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10">
                <Label className="text-white/70 text-sm">WhatsApp</Label>
                <p className="text-white font-medium">{user?.phone || "Não informado"}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </GlassCard>
  )
}
