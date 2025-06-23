"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useOCR } from "../../hooks/use-ocr"
import { Camera, Upload, X, Check, AlertCircle } from "lucide-react"
import type { OCRResult } from "../../types/advanced"

interface OCRScannerProps {
  onResult: (result: OCRResult) => void
  onClose: () => void
}

export function OCRScanner({ onResult, onClose }: OCRScannerProps) {
  const [dragActive, setDragActive] = useState(false)
  const [result, setResult] = useState<OCRResult | null>(null)
  const { processImage, isProcessing } = useOCR()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    if (file.type.startsWith("image/")) {
      const ocrResult = await processImage(file)
      if (ocrResult) {
        setResult(ocrResult)
      }
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleAccept = () => {
    if (result) {
      onResult(result)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Scanner de Nota Fiscal
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {!result && !isProcessing && (
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600 mb-4">Arraste uma foto da nota fiscal ou clique para selecionar</p>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Selecionar Arquivo
              </Button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
            </div>
          )}

          {isProcessing && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Processando imagem...</p>
              <p className="text-sm text-gray-500">Extraindo dados da nota fiscal</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                <span className="font-medium">Dados extraídos com sucesso!</span>
                <Badge variant="outline" className="ml-auto">
                  {Math.round(result.confidence * 100)}% confiança
                </Badge>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Valor:</span>
                  <span className="font-semibold">
                    {result.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-semibold">{new Date(result.date).toLocaleDateString("pt-BR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categoria:</span>
                  <span className="font-semibold">{result.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estabelecimento:</span>
                  <span className="font-semibold">{result.establishment}</span>
                </div>
              </div>

              {result.confidence < 0.9 && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800">Verificar dados</p>
                    <p className="text-yellow-700">
                      A confiança está baixa. Verifique se os dados estão corretos antes de confirmar.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setResult(null)} className="flex-1">
                  Tentar Novamente
                </Button>
                <Button onClick={handleAccept} className="flex-1">
                  Confirmar Dados
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
