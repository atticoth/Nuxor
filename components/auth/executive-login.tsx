"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExecutiveCard } from "../ui/executive-card"
import { ProfessionalButton } from "../ui/professional-button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../../hooks/use-auth"
import { Building2, Shield, TrendingUp, Users, Eye, EyeOff } from "lucide-react"

const businessTypes = ["Comércio", "Transporte", "Alimentação", "Serviços", "Construção", "Saúde", "Educação", "Outros"]

export function ExecutiveLogin() {
  const { login, register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    businessType: "",
    phone: "",
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(loginData.email, loginData.password)
    if (!success) {
      setError("Email ou senha incorretos")
    }
    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await register({
      name: registerData.name,
      email: registerData.email,
      businessType: registerData.businessType,
      phone: registerData.phone,
    })

    if (!success) {
      setError("Erro ao criar conta")
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900">Expensive Tracker</h1>
                <p className="text-xl text-slate-600">Gestão Financeira Empresarial</p>
              </div>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">
              Plataforma profissional para controle financeiro empresarial com relatórios executivos e análises
              avançadas.
            </p>
          </div>

          <div className="grid gap-6">
            <ExecutiveCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Relatórios Executivos</h3>
                  <p className="text-slate-600">Dashboards profissionais com métricas de performance</p>
                </div>
              </div>
            </ExecutiveCard>

            <ExecutiveCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Gestão de Clientes</h3>
                  <p className="text-slate-600">Controle completo de recebíveis e relacionamento</p>
                </div>
              </div>
            </ExecutiveCard>

            <ExecutiveCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 text-lg">Segurança Corporativa</h3>
                  <p className="text-slate-600">Proteção de dados com padrões empresariais</p>
                </div>
              </div>
            </ExecutiveCard>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <ExecutiveCard elevated className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Acesso Executivo</CardTitle>
                <p className="text-blue-100 mt-2">Entre na sua conta corporativa</p>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100">
                  <TabsTrigger value="login" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                  >
                    Cadastrar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700 font-medium">
                        Email Corporativo
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@empresa.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                        className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-700 font-medium">
                        Senha
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                          className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500 pr-12"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}
                    <ProfessionalButton type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Acessar Plataforma"}
                    </ProfessionalButton>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-medium">
                        Nome Completo
                      </Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={registerData.name}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                        className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-slate-700 font-medium">
                        Email Corporativo
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@empresa.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                        className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-slate-700 font-medium">
                        Senha
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Crie uma senha segura"
                        value={registerData.password}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                        className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                      <p className="text-xs text-slate-500">Use qualquer senha para este protótipo</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-type" className="text-slate-700 font-medium">
                        Setor de Atuação
                      </Label>
                      <Select
                        value={registerData.businessType}
                        onValueChange={(value) => setRegisterData((prev) => ({ ...prev, businessType: value }))}
                      >
                        <SelectTrigger className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Selecione o setor" />
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
                        placeholder="(11) 3000-0000"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                      </div>
                    )}
                    <ProfessionalButton type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "Criando conta..." : "Criar Conta Corporativa"}
                    </ProfessionalButton>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </ExecutiveCard>
        </div>
      </div>
    </div>
  )
}
