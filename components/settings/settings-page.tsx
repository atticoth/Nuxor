"use client"

import { useState } from "react"
import { ProfileSettings } from "./profile-settings"
import { PasswordSettings } from "./password-settings"
import { BusinessSettings } from "./business-settings"
import { Button } from "@/components/ui/button"
import { GlassCard } from "../ui/glass-card"
import { NeonText } from "../ui/neon-text"
import { CardContent } from "@/components/ui/card"
import { User, Shield, Building } from "lucide-react"

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile")

  const sections = [
    { id: "profile", label: "Perfil", icon: User, gradient: "from-purple-500 to-pink-500" },
    { id: "security", label: "Segurança", icon: Shield, gradient: "from-orange-500 to-red-500" },
    { id: "business", label: "Negócio", icon: Building, gradient: "from-green-500 to-emerald-500" },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case "profile":
        return <ProfileSettings />
      case "security":
        return <PasswordSettings />
      case "business":
        return <BusinessSettings />
      default:
        return <ProfileSettings />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <div className="mb-8">
        <NeonText color="purple" className="text-4xl mb-2">
          Configurações
        </NeonText>
        <p className="text-gray-300 text-lg">Personalize sua experiência e gerencie sua conta</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <GlassCard variant="premium" className="p-6">
            <CardContent className="p-0 space-y-3">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant="ghost"
                  className={`w-full justify-start h-12 transition-all duration-300 relative overflow-hidden group ${
                    activeSection === section.id
                      ? `bg-gradient-to-r ${section.gradient} text-white shadow-xl scale-105`
                      : "hover:bg-white/10 text-white/80 hover:text-white hover:scale-102"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {/* Glow effect */}
                  {activeSection === section.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-20 blur-xl`} />
                  )}

                  <section.icon className="mr-3 h-5 w-5 relative z-10" />
                  <span className="font-medium relative z-10">{section.label}</span>

                  {/* Hover glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />
                </Button>
              ))}
            </CardContent>
          </GlassCard>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">{renderContent()}</div>
      </div>
    </div>
  )
}
