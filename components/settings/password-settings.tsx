"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GlassCard } from "../ui/glass-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, Check, X } from "lucide-react"

export function PasswordSettings() {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const passwordRequirements = [
    { text: "Pelo menos 8 caracteres", met: passwords.new.length >= 8 },
    { text: "Pelo menos uma letra maiúscula", met: /[A-Z]/.test(passwords.new) },
    { text: "Pelo menos uma letra minúscula", met: /[a-z]/.test(passwords.new) },
    { text: "Pelo menos um número", met: /\d/.test(passwords.new) },
    { text: "Pelo menos um caractere especial", met: /[!@#$%^&*(),.?":{}|<>]/.test(passwords.new) },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (passwords.new !== passwords.confirm) {
      setMessage({ type: "error", text: "As senhas não coincidem" })
      return
    }

    if (!passwordRequirements.every((req) => req.met)) {
      setMessage({ type: "error", text: "A senha não atende aos requisitos de segurança" })
      return
    }

    // Aqui você faria a validação da senha atual e salvaria a nova
    console.log("Alterando senha...")
    setMessage({ type: "success", text: "Senha alterada com sucesso!" })
    setPasswords({ current: "", new: "", confirm: "" })
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <GlassCard variant="warning" className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-600/20 to-red-600/20 backdrop-blur-sm">
        <CardTitle className="flex items-center gap-3 text-white">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Segurança da Conta</h3>
            <p className="text-orange-100 text-sm">Altere sua senha para manter sua conta segura</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="current-password" className="text-white font-medium">
              Senha Atual
            </Label>
            <div className="relative">
              <Input
                id="current-password"
                type={showPasswords.current ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 pr-12"
                placeholder="Digite sua senha atual"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-password" className="text-white font-medium">
              Nova Senha
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPasswords.new ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => setPasswords((prev) => ({ ...prev, new: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 pr-12"
                placeholder="Digite sua nova senha"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password" className="text-white font-medium">
              Confirmar Nova Senha
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showPasswords.confirm ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 pr-12"
                placeholder="Confirme sua nova senha"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Password Requirements */}
          {passwords.new && (
            <div className="p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-3">Requisitos da Senha:</h4>
              <div className="space-y-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {req.met ? <Check className="w-4 h-4 text-green-400" /> : <X className="w-4 h-4 text-red-400" />}
                    <span className={`text-sm ${req.met ? "text-green-400" : "text-white/70"}`}>{req.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {message && (
            <Alert
              className={`${message.type === "success" ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}`}
            >
              <AlertDescription className={message.type === "success" ? "text-green-400" : "text-red-400"}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            disabled={!passwordRequirements.every((req) => req.met) || passwords.new !== passwords.confirm}
          >
            <Shield className="w-4 h-4 mr-2" />
            Alterar Senha
          </Button>
        </form>
      </CardContent>
    </GlassCard>
  )
}
