import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, TrendingUp, Brain, Layers } from "lucide-react"

export function ModelsSection() {
  const statisticalModels = ["ARMA", "ARMA", "AIRMA", "SARIMA", "Naive Forecast", "AutoARIMA", "Exponential Smoothing"]

  const mlModels = [
    "Random Forest (TF-DF)",
    "Gradient Boosted Trees (TF-DF)",
    "Prophet (Facebook Kats)",
    "Dense Model (Window = 7, Horizon = 1)",
    "Dense Model (Window = 30, Horizon = 1)",
    "Dense Model (Window = 30, Horizon = 7)",
    "Conv1D (Window = 7, Horizon = 1)",
    "LSTM (Window = 7, Horizon = 1)",
    "Dense (Multivariate Time series)",
    "N-BEATs Algorithm",
    "Ensemble",
    "Simple ANN Model (Future Predictions)",
  ]

  const preprocessingSteps = [
    "Checking if series is stationary using Augmented Dickey Fuller Test",
    "Making the series stationary using Differencing",
    "Plotting ACF and PACF plots - mostly both plots were same with first lag negative, second lag onwards many lags were below threshold",
  ]

  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Model Testing</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          We tested 20 different models for time series forecasting to ensure the best possible predictions
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart className="h-6 w-6 text-blue-600" />
              Statistical Models
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {statisticalModels.map((model, index) => (
                <Badge key={index} variant="outline" className="mb-2">
                  {model}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Traditional time series forecasting methods with proven statistical foundations
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Brain className="h-6 w-6 text-purple-600" />
              Machine Learning Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {mlModels.map((model, index) => (
                <Badge key={index} variant="outline" className="mb-2">
                  {model}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Advanced ML and deep learning approaches for complex pattern recognition
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-0 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Layers className="h-6 w-6 text-green-600" />
            Preprocessing Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {preprocessingSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-0 bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl text-orange-800">
            <TrendingUp className="h-6 w-6 text-orange-600" />
            Key Findings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-orange-600 text-white">Winner</Badge>
              <span className="font-semibold text-orange-800">Ensemble Model</span>
              <span className="text-orange-700">delivered the best performance</span>
            </div>

            <div className="bg-orange-100 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-2">Important Note:</h4>
              <p className="text-orange-700 text-sm">
                The test dataset covered 362 days (around 1 year), which explains why traditional forecasting methods
                like FB-Prophet, ARIMA, ARMA, AR, and MA showed limited performance. Our ensemble approach overcomes
                these limitations by combining multiple model strengths.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
