"use client"

import { useState } from "react"
import type { OCRResult } from "../types/advanced"

export function useOCR() {
  const [isProcessing, setIsProcessing] = useState(false)

  const processImage = async (file: File): Promise<OCRResult | null> => {
    setIsProcessing(true)

    // Simular processamento OCR
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simular resultado baseado no nome do arquivo ou conteúdo
    const mockResults: OCRResult[] = [
      {
        amount: 45.9,
        date: new Date().toISOString().split("T")[0],
        category: "Combustível",
        establishment: "Posto Shell",
        confidence: 0.95,
      },
      {
        amount: 125.5,
        date: new Date().toISOString().split("T")[0],
        category: "Alimentação",
        establishment: "Restaurante do João",
        confidence: 0.88,
      },
      {
        amount: 89.99,
        date: new Date().toISOString().split("T")[0],
        category: "Compra de Mercadoria",
        establishment: "Atacadão",
        confidence: 0.92,
      },
    ]

    const result = mockResults[Math.floor(Math.random() * mockResults.length)]
    setIsProcessing(false)

    return result
  }

  return { processImage, isProcessing }
}
