"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useData } from "../../hooks/use-data"
import { UserPlus, Upload, X } from "lucide-react"

export function ModernClientForm() {
  const { addClient } = useData()
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    amount: "",
    dueDate: "",
    notes: "",
  })
  const [attachments, setAttachments] = useState<File[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    addClient({
      name: formData.name,
      contact: formData.contact,
      amount: Number.parseFloat(formData.amount),
      dueDate: formData.dueDate,
      status: "pending",
    })

    // Reset form
    setFormData({
      name: "",
      contact: "",
      amount: "",
      dueDate: "",
      notes: "",
    })
    setAttachments([])
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files))
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="border-0 shadow-xl bg-white">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <UserPlus className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Cadastrar Novo Cliente</h3>
            <p className="text-blue-100 text-sm">Adicione um cliente e defina o valor a receber</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-700 font-medium">
                Nome do Cliente *
              </Label>
              <Input
                id="name"
                placeholder="Nome completo ou empresa"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact" className="text-gray-700 font-medium">
                Contato *
              </Label>
              <Input
                id="contact"
                placeholder="WhatsApp, telefone ou email"
                value={formData.contact}
                onChange={(e) => setFormData((prev) => ({ ...prev, contact: e.target.value }))}
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-gray-700 font-medium">
                Valor a Receber (R$) *
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0,00"
                value={formData.amount}
                onChange={(e) => setFormData((prev) => ({ ...prev, amount: e.target.value }))}
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-gray-700 font-medium">
                Data de Vencimento *
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, dueDate: e.target.value }))}
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-gray-700 font-medium">
              Observações
            </Label>
            <Textarea
              id="notes"
              placeholder="Informações adicionais sobre o cliente ou serviço..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label className="text-gray-700 font-medium">Anexos (Contratos, Notas, etc.)</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
              <div className="text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="mt-2">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500 font-medium">Clique para fazer upload</span>
                    <span className="text-gray-500"> ou arraste arquivos aqui</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, DOC até 10MB cada</p>
              </div>
            </div>

            {/* Uploaded Files */}
            {attachments.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Arquivos selecionados:</p>
                {attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Cadastrar Cliente
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
