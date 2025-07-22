import { NextResponse } from "next/server";

interface CryptoData {
  symbol: string;
  name: string;
  price: string;
}

interface CoinGeckoCoin {
  symbol: string;
  name: string;
  current_price: number;
}

type FormattedPrice = `${string}`;

let cachedData: CryptoData[] | null = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000;

export async function GET() {
  try {
    if (cachedData && Date.now() - lastFetch < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }

    let cryptoData: CryptoData[] = [];

    try {
      const coinGeckoController = new AbortController();
      const coinGeckoTimeoutId = setTimeout(
        () => coinGeckoController.abort(),
        10000
      );

      const coinGeckoResponse = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
        {
          headers: {
            Accept: "application/json",
            "User-Agent": "CryptoVision/1.0",
          },
          signal: coinGeckoController.signal,
        }
      );

      clearTimeout(coinGeckoTimeoutId);

      if (coinGeckoResponse.ok) {
        const coinGeckoData = await coinGeckoResponse.json();
        cryptoData = coinGeckoData
          .map((coin: CoinGeckoCoin) => ({
            symbol: `${coin.symbol.toUpperCase()}-USD`,
            name: coin.name,
            price: `$${coin.current_price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}`,
          }))
          .slice(0, 50);

        console.log(
          `Successfully fetched ${cryptoData.length} coins from CoinGecko`
        );
      }
    } catch (error) {
      console.log("CoinGecko API failed:", error);
    }

    if (cryptoData.length === 0) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(
          "https://finance.yahoo.com/markets/crypto/all/?start=0&count=20",
          {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.9",
              Connection: "close",
              "Cache-Control": "no-cache",
            },
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        if (response.ok) {
          const html = await response.text();
          console.log("Attempting to parse Yahoo Finance data...");

          const tableRowRegex = /<tr[^>]*data-row-key[^>]*>(.*?)<\/tr>/gs;
          const nameRegex =
            /<div[^>]*class="[^"]*yf-90gdtp[^"]*"[^>]*>([^<]+)<\/div>/;
          const symbolRegex = /data-symbol="([^"]+)"/;
          const priceRegex =
            /<fin-streamer[^>]*data-field="regularMarketPrice"[^>]*>([^<]+)<\/fin-streamer>/;

          let match;
          while (
            (match = tableRowRegex.exec(html)) !== null &&
            cryptoData.length < 50
          ) {
            const rowHtml = match[1];

            const nameMatch = nameRegex.exec(rowHtml);
            const symbolMatch = symbolRegex.exec(rowHtml);
            const priceMatch = priceRegex.exec(rowHtml);

            if (symbolMatch && nameMatch && priceMatch) {
              const symbol: string = symbolMatch[1].trim();
              const name: string = nameMatch[1].trim();
              const price: string = priceMatch[1].trim();

              const formattedPrice: FormattedPrice = price.startsWith("$")
                ? (price as FormattedPrice)
                : (`$${price}` as FormattedPrice);

              cryptoData.push({
                symbol,
                name,
                price: formattedPrice,
              });
            }
          }

          console.log(
            `Successfully parsed ${cryptoData.length} crypto entries from Yahoo`
          );
        }
      } catch (error) {
        if (error instanceof Error) {
          console.log("Yahoo Finance failed:", error.message);
        } else {
          console.log("Yahoo Finance failed with an unknown error:", error);
        }
      }
    }

    if (cryptoData.length > 0) {
      cachedData = cryptoData.slice(0, 50);
      lastFetch = Date.now();
      return NextResponse.json(cachedData);
    }

    console.log("All external APIs failed, using fallback data");

    const fallbackData: CryptoData[] = [
      { symbol: "BTC-USD", name: "Bitcoin", price: "$67,234" },
      { symbol: "ETH-USD", name: "Ethereum", price: "$3,456" },
      { symbol: "BNB-USD", name: "BNB", price: "$598" },
      { symbol: "XRP-USD", name: "XRP", price: "$0.54" },
      { symbol: "ADA-USD", name: "Cardano", price: "$0.45" },
      { symbol: "SOL-USD", name: "Solana", price: "$178" },
      { symbol: "DOT-USD", name: "Polkadot", price: "$7.23" },
      { symbol: "LINK-USD", name: "Chainlink", price: "$14.56" },
      { symbol: "LTC-USD", name: "Litecoin", price: "$89.34" },
      { symbol: "MATIC-USD", name: "Polygon", price: "$0.89" },
    ];

    cachedData = fallbackData;
    lastFetch = Date.now();
    return NextResponse.json(fallbackData);
  } catch (error) {
    console.error("Error fetching crypto data:", error);

    if (cachedData) {
      console.log("Returning cached data due to error");
      return NextResponse.json(cachedData);
    }

    console.log("Using minimal fallback data");
    const minimalFallback: CryptoData[] = [
      { symbol: "BTC-USD", name: "Bitcoin", price: "$67,234" },
      { symbol: "ETH-USD", name: "Ethereum", price: "$3,456" },
      { symbol: "BNB-USD", name: "BNB", price: "$598" },
      { symbol: "XRP-USD", name: "XRP", price: "$0.54" },
      { symbol: "ADA-USD", name: "Cardano", price: "$0.45" },
      { symbol: "SOL-USD", name: "Solana", price: "$178" },
      { symbol: "DOT-USD", name: "Polkadot", price: "$7.23" },
      { symbol: "LINK-USD", name: "Chainlink", price: "$14.56" },
      { symbol: "LTC-USD", name: "Litecoin", price: "$89.34" },
      { symbol: "MATIC-USD", name: "Polygon", price: "$0.89" },
    ];

    return NextResponse.json(minimalFallback);
  }
}

export const revalidate = 300;