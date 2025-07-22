"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Loader2 } from "lucide-react";
import { PredictionChart } from "@/components/prediction-chart";

interface CryptoInfo {
  symbol: string;
  name: string;
  price: string;
}

interface PredictionData {
  duration: number;
  [key: string]: number[] | number;
}

export function HeroSection() {
  const [selectedCryptos, setSelectedCryptos] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [predictionData, setPredictionData] = useState<PredictionData | null>(
    null
  );
  const [cryptoList, setCryptoList] = useState<CryptoInfo[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isLoadingCryptos, setIsLoadingCryptos] = useState(true);

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const response = await fetch("/api/cryptos");
        if (!response.ok) {
          throw new Error("Failed to fetch cryptos");
        }
        const cryptos = await response.json();
        setCryptoList(cryptos);
      } catch (error) {
        console.error("Failed to load cryptos:", error);
        setCryptoList([
          { symbol: "BTC-USD", name: "Bitcoin", price: "$67,234" },
          { symbol: "ETH-USD", name: "Ethereum", price: "$3,456" },
          { symbol: "BNB-USD", name: "BNB", price: "$598" },
          { symbol: "XRP-USD", name: "XRP", price: "$0.54" },
          { symbol: "ADA-USD", name: "Cardano", price: "$0.45" },
          { symbol: "SOL-USD", name: "Solana", price: "$178" },
          { symbol: "DOT-USD", name: "Polkadot", price: "$7.23" },
          { symbol: "LINK-USD", name: "Chainlink", price: "$14.56" },
        ]);
      } finally {
        setIsLoadingCryptos(false);
      }
    };

    loadCryptos();
  }, []);

  const filteredCryptos = cryptoList.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedCryptos = showAll
    ? filteredCryptos
    : filteredCryptos.slice(0, 8);

  const toggleCrypto = (cryptoSymbol: string) => {
    setSelectedCryptos((prev) =>
      prev.includes(cryptoSymbol)
        ? prev.filter((symbol) => symbol !== cryptoSymbol)
        : [...prev, cryptoSymbol]
    );
  };

  const handlePredict = async () => {
    if (selectedCryptos.length === 0 || !duration) return;

    setIsLoading(true);
    try {
      console.log("Fetching historical data for:", selectedCryptos);

      const historicalResponse = await fetch("/api/historical-prices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cryptos: selectedCryptos,
          duration: Number.parseInt(duration),
        }),
      });

      if (!historicalResponse.ok) {
        throw new Error("Failed to fetch historical data");
      }

      const historicalResult = await historicalResponse.json();

      if (!historicalResult.success) {
        throw new Error(historicalResult.error || "Historical data fetch failed");
      }

      console.log("Historical data fetched:", historicalResult.data);
      console.log("Sending data to prediction API...");

      const predictionResponse = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          historicalData: historicalResult.data,
        }),
      });

      if (!predictionResponse.ok) {
        throw new Error("Failed to get predictions");
      }

      const predictionResult = await predictionResponse.json();

      console.log("Prediction result:", predictionResult);

      setPredictionData(predictionResult.data);

      if (historicalResult.errors && historicalResult.errors.length > 0) {
        console.warn("Some cryptos had data issues:", historicalResult.errors);
      }
    } catch (error) {
      console.error("Prediction failed:", error);

      const mockData: PredictionData = {
        duration: Number.parseInt(duration),
        bitcoin_past: [50000, 51000, 50500, 52000, 52500, 51500, 53000, 53500],
        ethereum_past: [4000, 4100, 4050, 4200, 4250, 4150, 4300, 4350],
        bitcoin_future: [
          50938.82, 51023.69, 51968.51, 52328.05, 51820.25, 52431.75, 52404.49,
          50898.33, 51343.94, 51896.97, 52090.44, 51750.23,
        ],
        ethereum_future: [
          4098.64, 4105.82, 4201.26, 4237.31, 4186.68, 4248.39, 4246.47,
          4099.03, 4142.29, 4198.69, 4218.25, 4184.67,
        ],
      };

      setPredictionData(mockData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mb-16">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            Crypto Price Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div>
            <Label className="text-base font-semibold mb-3 block">
              Select Cryptocurrencies
            </Label>
            {isLoadingCryptos ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">
                  Loading cryptocurrencies...
                </span>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {displayedCryptos.map((crypto) => (
                    <Card
                      key={crypto.symbol}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedCryptos.includes(crypto.symbol)
                          ? "ring-2 ring-blue-500 bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => toggleCrypto(crypto.symbol)}
                    >
                      <CardContent className="p-3 text-center">
                        <div className="font-semibold text-sm">
                          {crypto.symbol.replace("-USD", "")}
                        </div>
                        <div
                          className="text-xs text-gray-600 truncate"
                          title={crypto.name}
                        >
                          {crypto.name.replace(" USD", "")}
                        </div>
                        <div className="text-xs font-medium text-green-600 mt-1">
                          {crypto.price}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {!showAll && filteredCryptos.length > 8 && (
                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowAll(true)}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      View More ({filteredCryptos.length - 8} more)
                    </Button>
                  </div>
                )}

                {showAll && (
                  <div className="text-center mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowAll(false)}
                      className="text-gray-600 border-gray-600 hover:bg-gray-50"
                    >
                      Show Less
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          {selectedCryptos.length > 0 && (
            <div>
              <Label className="text-sm font-medium mb-2 block">Selected:</Label>
              <div className="flex flex-wrap gap-2">
                {selectedCryptos.map((cryptoSymbol) => {
                  const crypto = cryptoList.find(
                    (c) => c.symbol === cryptoSymbol
                  );
                  return (
                    <Badge
                      key={cryptoSymbol}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {crypto?.symbol.replace("-USD", "") || cryptoSymbol}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          <div>
            <Label htmlFor="duration" className="text-base font-semibold">
              Prediction Duration (Days)
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="Enter number of days (e.g., 30)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="1"
              max="365"
              className="mt-2"
            />
          </div>

          <Button
            onClick={handlePredict}
            disabled={selectedCryptos.length === 0 || !duration || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Predictions...
              </>
            ) : (
              "Predict Prices"
            )}
          </Button>
        </CardContent>
      </Card>

      {predictionData && (
        <div className="mt-8">
          <PredictionChart data={predictionData} />
        </div>
      )}
    </section>
  );
}