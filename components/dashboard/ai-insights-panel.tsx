"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useAIInsights } from "../../hooks/use-ai-insights"
import { Brain, TrendingUp, AlertTriangle, Lightbulb, Trophy, ArrowRight } from "lucide-react"

export function AIInsightsPanel() {
  const { insights } = useAIInsights()

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "suggestion":
        return <Lightbulb className="w-5 h-5 text-yellow-500" />
      case "achievement":
        return <Trophy className="w-5 h-5 text-green-500" />
      case "trend":
        return <TrendingUp className="w-5 h-5 text-blue-500" />
      default:
        return <Brain className="w-5 h-5 text-purple-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-600" />
          Insights Inteligentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Analisando seus dados...</p>
            <p className="text-sm">Insights aparecerão conforme você usa o app</p>
          </div>
        ) : (
          <div className="space-y-4">
            {insights.slice(0, 5).map((insight) => (
              <div
                key={insight.id}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{insight.title}</h4>
                    <Badge variant={getPriorityColor(insight.priority)} className="text-xs">
                      {insight.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                  {insight.action && (
                    <Button size="sm" variant="outline" className="text-xs">
                      {insight.action}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
