import { HeroSection } from "@/components/hero-section"
import { ProjectDetails } from "@/components/project-details"
import { HowItWorks } from "@/components/how-it-works"
import { ModelsSection } from "@/components/models-section"
import { ScalabilitySection } from "@/components/scalability-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
      <header className="relative text-center mb-12 p-4"> {/* Add relative and some padding */}
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          CryptoVision
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Advanced Scalable Crypto Price Forecasting powered by ML and PySpark
        </p>

        {/* This is the changed part */}
        <p className="absolute top-4 right-4 text-sm text-gray-500">
          @Made by Prasad Khambadkar
        </p>
      </header>

        <HeroSection />
        <ScalabilitySection />
        <HowItWorks />
        <ModelsSection />
        <ProjectDetails />
      </div>
    </main>
  )
}
