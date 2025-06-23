export interface Widget {
  id: string
  type: "revenue" | "expenses" | "balance" | "clients" | "chart" | "goals" | "alerts"
  position: { x: number; y: number }
  size: { width: number; height: number }
  visible: boolean
}

export interface Goal {
  id: string
  title: string
  target: number
  current: number
  deadline: string
  category: "revenue" | "expense" | "savings"
  status: "active" | "completed" | "overdue"
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress: number
  maxProgress: number
}

export interface AIInsight {
  id: string
  type: "warning" | "suggestion" | "achievement" | "trend"
  title: string
  description: string
  action?: string
  priority: "low" | "medium" | "high"
  createdAt: string
}

export interface OCRResult {
  amount: number
  date: string
  category: string
  establishment: string
  confidence: number
}

export interface Theme {
  name: string
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    surface: string
    text: string
  }
}
