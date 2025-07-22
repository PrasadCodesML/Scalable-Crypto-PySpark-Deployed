const https = require("https")
const { JSDOM } = require("jsdom")

async function scrapeCryptoData() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "finance.yahoo.com",
      path: "/markets/crypto/all/?start=0&count=50",
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
    }

    const req = https.request(options, (res) => {
      let data = ""

      res.on("data", (chunk) => {
        data += chunk
      })

      res.on("end", () => {
        try {
          const dom = new JSDOM(data)
          const document = dom.window.document

          const cryptoData = []

          // Find all crypto rows in the table
          const rows = document.querySelectorAll("tr[data-row-key]")

          rows.forEach((row, index) => {
            if (index >= 50) return // Limit to top 50

            try {
              const symbolElement = row.querySelector('[data-field="symbol"]')
              const nameElement = row.querySelector('td[aria-label*="Name"]')
              const priceElement = row.querySelector('[data-field="regularMarketPrice"]')

              if (symbolElement && nameElement && priceElement) {
                const symbol = symbolElement.textContent.trim()
                const name = nameElement.textContent.trim()
                const price = priceElement.textContent.trim()

                cryptoData.push({
                  symbol: symbol,
                  name: name,
                  price: price.startsWith("$") ? price : `$${price}`,
                })
              }
            } catch (error) {
              console.error(`Error parsing row ${index}:`, error)
            }
          })

          console.log(`Successfully scraped ${cryptoData.length} cryptocurrencies`)
          console.log("Sample data:", cryptoData.slice(0, 3))

          resolve(cryptoData)
        } catch (error) {
          console.error("Error parsing HTML:", error)
          reject(error)
        }
      })
    })

    req.on("error", (error) => {
      console.error("Request error:", error)
      reject(error)
    })

    req.end()
  })
}

// Execute the scraper
scrapeCryptoData()
  .then((data) => {
    console.log("Crypto data scraped successfully!")
    console.log(`Total cryptocurrencies: ${data.length}`)

    // You can save this data to a file or database
    const fs = require("fs")
    fs.writeFileSync("crypto-data.json", JSON.stringify(data, null, 2))
    console.log("Data saved to crypto-data.json")
  })
  .catch((error) => {
    console.error("Scraping failed:", error)
  })
