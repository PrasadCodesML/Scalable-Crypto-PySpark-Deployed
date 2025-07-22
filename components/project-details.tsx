import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Cpu, Globe, Brain } from "lucide-react"

export function ProjectDetails() {
  const techStack = [
    { name: "PySpark", description: "Distributed computing framework", icon: Cpu },
    { name: "TensorFlow", description: "Deep learning models", icon: Brain },
    { name: "Pandas", description: "Data manipulation", icon: Database },
    { name: "Gradio API", description: "Model serving", icon: Globe },
  ]

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Implementation</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Built with cutting-edge technologies for maximum performance and scalability
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {techStack.map((tech, index) => (
          <Card key={index} className="shadow-lg border-0 text-center">
            <CardHeader>
              <tech.icon className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">{tech.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">{tech.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Code className="h-6 w-6 text-indigo-600" />
            API Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">How it works:</h4>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
              <li>User selects cryptocurrencies and prediction duration</li>
              <li>Web scraper collects last 5 months of historical data (or less for new cryptos)</li>
              <li>Data is sent to our Gradio API endpoint for processing</li>
              <li>PySpark processes multiple cryptocurrencies simultaneously</li>
              <li>ML models generate predictions and return results</li>
              <li>Interactive charts display both historical and predicted prices</li>
            </ol>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">API Endpoint:</h4>
              <code className="text-xs bg-gray-100 p-2 rounded block overflow-x-auto">
                https://prasad8379-cryptovision.hf.space/
              </code>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Response Format:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">JSON</Badge>
                <Badge variant="outline">Real-time</Badge>
                <Badge variant="outline">Scalable</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
