"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeCard } from "../ui/theme-card"
import { ThemeButton } from "../ui/theme-button"
import { ThemeToggle } from "../ui/theme-toggle"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "../../hooks/use-auth"
import { Building2, Shield, TrendingUp, Users, Eye, EyeOff, Zap } from "lucide-react"

const businessTypes = ["Comércio", "Transporte", "Alimentação", "Serviços", "Construção", "Saúde", "Educação", "Outros"]

export function ThemedLogin() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-cyan-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 transition-colors duration-300">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Expensive Tracker</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">Gestão Financeira Inteligente</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Plataforma moderna para controle financeiro empresarial com design adaptativo e experiência otimizada.
            </p>
          </div>

          <div className="grid gap-6">
            <ThemeCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-cyan-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Dashboard Inteligente</h3>
                  <p className="text-gray-600 dark:text-gray-300">Métricas em tempo real com visualização adaptativa</p>
                </div>
              </div>
            </ThemeCard>

            <ThemeCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Gestão Completa</h3>
                  <p className="text-gray-600 dark:text-gray-300">Controle total de clientes e recebíveis</p>
                </div>
              </div>
            </ThemeCard>

            <ThemeCard className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-lg">Tema Adaptativo</h3>
                  <p className="text-gray-600 dark:text-gray-300">Interface que se adapta às suas preferências</p>
                </div>
              </div>
            </ThemeCard>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          <ThemeCard elevated className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Acesso à Plataforma</CardTitle>
                <p className="text-cyan-100 mt-2">Entre na sua conta ou crie uma nova</p>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 dark:bg-slate-800">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                  >
                    Entrar
                  </TabsTrigger>
                  <TabsTrigger
                    value="register"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                  >
                    Cadastrar
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={loginData.email}
                        onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                        className="h-12 border-gray-300 dark:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">
                        Senha
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={loginData.password}
                          onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                          className="h-12 border-gray-300 dark:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white pr-12"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                      </div>
                    )}
                    <ThemeButton type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "Entrando..." : "Acessar Plataforma"}
                    </ThemeButton>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 font-medium">
                        Nome Completo
                      </Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={registerData.name}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, name: e.target.value }))}
                        className="h-12 border-gray-300 dark:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email" className="text-gray-700 dark:text-gray-300 font-medium">
                        Email
                      </Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={registerData.email}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, email: e.target.value }))}
                        className="h-12 border-gray-300 dark:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password" className="text-gray-700 dark:text-gray-300 font-medium">
                        Senha
                      </Label>
                      <Input
                        id="register-password"
                        type="password"
                        placeholder="Crie uma senha segura"
                        value={registerData.password}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, password: e.target.value }))}
                        className="h-12 border-gray-300 dark:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white"
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">Use qualquer senha para este protótipo</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="business-type" className="text-gray-700 dark:text-gray-300 font-medium">
                        Setor de Atuação
                      </Label>
                      <Select
                        value={registerData.businessType}
                        onValueChange={(value) => setRegisterData((prev) => ({ ...prev, businessType: value }))}
                      >
                        <SelectTrigger className="h-12 border-gray-300 dark:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white">
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
                      <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium">
                        Telefone
                      </Label>
                      <Input
                        id="phone"
                        placeholder="(11) 99999-9999"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="h-12 border-gray-300 dark:border-slate-600 focus:border-cyan-500 focus:ring-cyan-500 dark:bg-slate-800 dark:text-white"
                      />
                    </div>
                    {error && (
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                      </div>
                    )}
                    <ThemeButton type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? "Criando conta..." : "Criar Conta"}
                    </ThemeButton>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </ThemeCard>
        </div>
      </div>
    </div>
  )
}
