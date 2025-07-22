import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Globe, ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Brain,
      title: "The Expert Brain",
      description:
        "At its core is an ML model that I've trained to recognize patterns in historical cryptocurrency prices.",
      color: "text-purple-600 bg-purple-50",
    },
    {
      icon: Zap,
      title: "The Efficient Manager",
      description:
        "PySpark acts like a project manager, splitting work and assigning separate 'analysts' to each coin for simultaneous predictions.",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: Globe,
      title: "User-Friendly Interface",
      description: "Simple API wrapped in an intuitive interface that sends data and returns predictions instantly.",
      color: "text-green-600 bg-green-50",
    },
  ]

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">How CryptoVision Works</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          I have developed an intelligent tool that forecasts the future prices of cryptocurrencies like Bitcoin and
          Ethereum. Think of it as a financial analyst powered by Artificial Intelligence.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <Card className="shadow-lg border-0 h-full">
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{step.description}</p>
              </CardContent>
            </Card>

            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            )}
          </div>
        ))}
      </div>

      <Card className="shadow-lg border-0 bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-indigo-800 mb-4 text-center">What This Means for Our Business</h3>
          <p className="text-indigo-700 text-center max-w-4xl mx-auto">
            This isn&apos;t just a simple calculator. It&apos;s a scalable and efficient system that ensures our website can
            provide fast, simultaneous price predictions to many users at once without slowing down, giving us a
            powerful and reliable tool for our platform.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
