"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ChevronDown } from "lucide-react";

interface PredictionData {
  duration: number;
  [key: string]: number[] | number;
}

interface PredictionChartProps {
  data: PredictionData | PredictionData[];
}

export function PredictionChart({ data: rawData }: PredictionChartProps) {
  const data = Array.isArray(rawData) ? rawData[0] : rawData;

  const cryptoKeys =
    data && typeof data === "object"
      ? Object.keys(data).filter(
          (key) => key.endsWith("_past") || key.endsWith("_future")
        )
      : [];

  const cryptoNames = [
    ...new Set(cryptoKeys.map((key) => key.replace(/_past|_future/g, ""))),
  ];

  const [selectedCrypto, setSelectedCrypto] = useState(cryptoNames[0] || "");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!selectedCrypto && cryptoNames.length > 0) {
      setSelectedCrypto(cryptoNames[0]);
    }
  }, [cryptoNames, selectedCrypto]);

  if (!data || typeof data !== "object" || Object.keys(data).length <= 1) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>No Prediction Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The prediction data could not be loaded or is empty.</p>
        </CardContent>
      </Card>
    );
  }

  if (cryptoNames.length === 0) {
    return (
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>No Cryptocurrency Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No valid cryptocurrency prediction data found.</p>
        </CardContent>
      </Card>
    );
  }

  const generateChartData = (cryptoName: string) => {
    const pastData = (data[`${cryptoName}_past`] as number[]) || [];
    const futureData = (data[`${cryptoName}_future`] as number[]) || [];
    const chartData: { day: number; past: number | null; future: number | null }[] = [];

    pastData.forEach((value, index) => {
      chartData.push({
        day: index - (pastData.length - 1),
        past: value,
        future: null,
      });
    });

    if (pastData.length > 0 && futureData.length > 0) {
      chartData.push({
        day: 0,
        past: pastData[pastData.length - 1],
        future: pastData[pastData.length - 1],
      });
    }

    futureData.forEach((value, index) => {
      chartData.push({
        day: index + 1,
        past: null,
        future: value,
      });
    });

    return chartData;
  };

  const chartData = generateChartData(selectedCrypto);
  const colors = ["#f97316","#3b82f6","#10b981","#8b5cf6","#f59e0b","#ef4444","#06b6d4","#84cc16"];
  const currentColorIndex = cryptoNames.indexOf(selectedCrypto) % colors.length;
  const currentColor = colors[currentColorIndex];
  const allValues = chartData.flatMap((d) => [d.past, d.future]).filter((v) => v !== null) as number[];
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const padding = (maxValue - minValue) * 0.1;
  const yAxisMin = Math.max(0, minValue - padding);
  const yAxisMax = maxValue + padding;

  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Price Prediction Results
          </div>
          <div className="relative flex items-center">
            <div className="m-4 text-l flex items-center text-sm text-gray-600">
              <div>Currencies selected:</div>
              <div className="text-blue-600 font-semibold mr-4 ml-2">{cryptoNames.length}</div>
            </div>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
            >
              {selectedCrypto.toUpperCase()}
              <ChevronDown className="h-4 w-4" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                {cryptoNames.map((crypto) => (
                  <button
                    key={crypto}
                    onClick={() => {
                      setSelectedCrypto(crypto);
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                      selectedCrypto === crypto
                        ? "bg-blue-50 text-blue-600"
                        : ""
                    }`}
                  >
                    {crypto.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  value === 0 ? "Today" : `${value > 0 ? "+" : ""}${value}d`
                }
              />
              <YAxis
                domain={[yAxisMin, yAxisMax]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) =>
                  `$${Number(value).toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}`
                }
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `$${Number(value).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  name,
                ]}
                labelFormatter={(label) => {
                  if (label === 0) return "Today";
                  return label > 0 ? `Day +${label}` : `Day ${label}`;
                }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="past"
                stroke={currentColor}
                strokeWidth={3}
                dot={false}
                name={`${selectedCrypto.toUpperCase()} Historical`}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="future"
                stroke={currentColor}
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={false}
                name={`${selectedCrypto.toUpperCase()} Predicted`}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="font-semibold text-gray-700">Current Price</div>
            <div
              className="text-lg font-bold"
              style={{ color: currentColor }}
            >
              $
              {(
                (data[`${selectedCrypto}_past`] as number[])?.[
                  (data[`${selectedCrypto}_past`] as number[])?.length - 1
                ] || 0
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="font-semibold text-gray-700">
              Predicted (Day {data.duration || "N/A"})
            </div>
            <div
              className="text-lg font-bold"
              style={{ color: currentColor }}
            >
              $
              {(
                (data[`${selectedCrypto}_future`] as number[])?.[
                  (data[`${selectedCrypto}_future`] as number[])?.length - 1
                ] || 0
              ).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="font-semibold text-gray-700">
              Prediction Period
            </div>
            <div className="text-lg font-bold text-gray-800">
              {data.duration || "N/A"} days
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          <p>
            Solid lines represent historical data; dashed lines show AI
            predictions.
          </p>
          <p className="mt-1">
            Select different cryptocurrencies using the dropdown above.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default PredictionChart;