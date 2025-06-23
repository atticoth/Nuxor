"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useData } from "../../hooks/use-data"
import { OCRScanner } from "../ui/ocr-scanner"
import { Receipt, Camera, Sparkles, MapPin } from "lucide-react"
import type { OCRResult } from "../../types/advanced"

const expenseCategories = [
  "Combustível",
  "Manutenção",
  "Compra de Mercadoria",
  "Aluguel",
  "Energia Elétrica",
  "Água",
  "Internet/Telefone",
  "Marketing",
  "Alimentação",
  "Transporte",
  "Outros",
]

const smartSuggestions = [
  { category: "Combustível", keywords: ["posto", "gasolina", "etanol", "diesel"] },
  { category: "Alimentação", keywords: ["restaurante", "lanchonete", "padaria", "mercado"] },
  { category: "Manutenção", keywords: ["oficina", "peças", "reparo", "conserto"] },
]

export function SmartExpenseForm() {
  const { addExpense } = useData()
  const [showScanner, setShowScanner] = useState(false)
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    amount: "",
    description: "",
    category: "",
    location: "",
  })
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addExpense({
      date: formData.date,
      amount: Number.parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
    })

    // Reset form
    setFormData({
      date: new Date().toISOString().split("T")[0],
      amount: "",
      description: "",
      category: "",
      location: "",
    })
    setSuggestions([])
  }

  const handleDescriptionChange = (description: string) => {
    setFormData((prev) => ({ ...prev, description }))

    // Smart category suggestions
    const newSuggestions: string[] = []
    smartSuggestions.forEach((suggestion) => {
      if (suggestion.keywords.some((keyword) => description.toLowerCase().includes(keyword.toLowerCase()))) {
        newSuggestions.push(suggestion.category)
      }
    })
    setSuggestions([...new Set(newSuggestions)])
  }

  const handleOCRResult = (result: OCRResult) => {
    setFormData((prev) => ({
      ...prev,
      amount: result.amount.toString(),
      date: result.date,
      description: `${result.establishment} - Nota Fiscal`,
      category: result.category,
    }))
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: `${position.coords.latitude}, ${position.coords.longitude}`,
          }))
        },
        (error) => {
          console.error("Erro ao obter localização:", error)
        },
      )
    }
  }

  return (
    <>
      <Card className="border-0 shadow-xl bg-white">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Receipt className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Lançar Despesa Inteligente</h3>
              <p className="text-green-100 text-sm">Use IA para categorizar automaticamente</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          {/* Quick Actions */}
          <div className="flex gap-3 mb-6">
            <Button type="button" variant="outline" onClick={() => setShowScanner(true)} className="flex-1">
              <Camera className="w-4 h-4 mr-2" />
              Escanear Nota
            </Button>
            <Button type="button" variant="outline" onClick={getCurrentLocation} className="flex-1">
              <MapPin className="w-4 h-4 mr-2" />
              Usar Localização
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-700 font-medium">
                  Data *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                  className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-gray-700 font-medium">
                  Valor (R$) *
                </Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  value={formData.amount}
                  onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                  className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700 font-medium">
                Descrição *
              </Label>
              <Input
                id="description"
                placeholder="Descreva a despesa (ex: Abastecimento no Posto Shell)"
                value={formData.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                required
              />

              {/* Smart Suggestions */}
              {suggestions.length > 0 && (
                <div className="flex items-center gap-2 mt-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-600">Sugestões:</span>
                  {suggestions.map((suggestion) => (
                    <Badge
                      key={suggestion}
                      variant="outline"
                      className="cursor-pointer hover:bg-green-50 hover:border-green-300"
                      onClick={() => setFormData((prev) => ({ ...prev, category: suggestion }))}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-700 font-medium">
                Categoria *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
              >
                <SelectTrigger className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.location && (
              <div className="space-y-2">
                <Label className="text-gray-700 font-medium">Localização</Label>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Localização capturada</span>
                  <Badge variant="secondary">GPS</Badge>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-200"
            >
              <Receipt className="w-4 h-4 mr-2" />
              Lançar Despesa
            </Button>
          </form>
        </CardContent>
      </Card>

      {showScanner && <OCRScanner onResult={handleOCRResult} onClose={() => setShowScanner(false)} />}
    </>
  )
}
