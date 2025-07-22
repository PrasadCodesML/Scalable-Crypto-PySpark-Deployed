import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, BarChart3, Cpu } from "lucide-react"

export function ScalabilitySection() {
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Unprecedented Scalability Results</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our PySpark-powered solution delivers exceptional performance improvements over traditional methods
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-orange-50 to-red-50">
          <CardHeader>
            <Zap className="h-12 w-12 text-orange-600 mx-auto mb-2" />
            <CardTitle className="text-2xl text-orange-800">Speed Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600 mb-2">7,784.80%</div>
            <p className="text-orange-700">Faster than traditional methods</p>
            <Badge variant="secondary" className="mt-2 bg-orange-100 text-orange-800">
              Lightning Fast
            </Badge>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <BarChart3 className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-2xl text-blue-800">Scalability Factor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600 mb-2">78.85x</div>
            <p className="text-blue-700">More scalable than Pandas</p>
            <Badge variant="secondary" className="mt-2 bg-blue-100 text-blue-800">
              Highly Scalable
            </Badge>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg border-0 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader>
            <Cpu className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-2xl text-green-800">Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600 mb-2">Top 50</div>
            <p className="text-green-700">Cryptocurrencies supported</p>
            <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
              Comprehensive
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-lg border-0 bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Dataset Performance</h3>
            <p className="text-purple-700 mb-4">Tested on Bitcoin dataset from July 17, 2010 to September 9, 2024</p>
            <div className="flex justify-center items-center gap-4 flex-wrap">
              <Badge className="bg-purple-600 text-white px-4 py-2">20 Models Tested</Badge>
              <Badge className="bg-pink-600 text-white px-4 py-2">Ensemble Model Winner</Badge>
              <Badge className="bg-indigo-600 text-white px-4 py-2">PandasUDF Integration</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
