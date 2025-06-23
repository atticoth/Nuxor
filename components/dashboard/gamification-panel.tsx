"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useGamification } from "../../hooks/use-gamification"
import { Trophy, Star, Target, Zap } from "lucide-react"

export function GamificationPanel() {
  const { achievements, userLevel, userXP } = useGamification()

  const nextLevelXP = userLevel * 100
  const currentLevelProgress = userXP % 100

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-purple-600" />
          Seu Progresso
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold text-purple-600">Nível {userLevel}</span>
          </div>
          <div className="space-y-2">
            <Progress value={currentLevelProgress} className="h-3" />
            <p className="text-sm text-gray-600">{currentLevelProgress}/100 XP para o próximo nível</p>
          </div>
        </div>

        {/* Recent Achievements */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Conquistas Recentes
          </h4>
          <div className="space-y-2">
            {achievements
              .filter((a) => a.unlockedAt)
              .slice(0, 3)
              .map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-3 p-2 bg-white rounded-lg border">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{achievement.title}</p>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />+{achievement.maxProgress * 10} XP
                  </Badge>
                </div>
              ))}
          </div>
        </div>

        {/* Progress Achievements */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Em Progresso</h4>
          <div className="space-y-3">
            {achievements
              .filter((a) => !a.unlockedAt && a.progress > 0)
              .slice(0, 2)
              .map((achievement) => (
                <div key={achievement.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{achievement.icon}</span>
                      <span className="font-medium text-sm">{achievement.title}</span>
                    </div>
                    <span className="text-xs text-gray-600">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
