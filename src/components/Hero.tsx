import { motion } from "framer-motion";
import { TrendingUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export function Hero() {
  const [loading, setLoading] = useState(true);
  const [currentRate, setCurrentRate] = useState<any>(null);

  useEffect(() => {
    const fetchGoldRate = async () => {
      try {
        setLoading(true);

        const currency = "AED"; // Default: Dirham
        const apiKey = import.meta.env.VITE_API_KEY;
        console.log("api key is : ", apiKey);

        // ✅ Correct base and currencies usage
        const res = await fetch(
          `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=XAU&currencies=${currency}`
        );
        const data = await res.json();
        console.log("API Data:", data);

        // if (!data?.rates?.[currency]) {
        //   throw new Error("Invalid API response");
        // }

        // 1 XAU = ? AED → now correct
        const goldPerOunceLocal = data.rates[currency];
        const goldPerGramLocal = goldPerOunceLocal / 31.1035;

        const karatMultipliers = {
          "24K": 1.0,
          "22K": 0.9167,
          "18K": 0.75,
        };

        setCurrentRate({
          gold_24k: goldPerGramLocal * karatMultipliers["24K"],
          gold_22k: goldPerGramLocal * karatMultipliers["22K"],
          gold_18k: goldPerGramLocal * karatMultipliers["18K"],
          currency,
          created_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Error fetching gold price:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldRate();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center space-x-2 bg-yellow-200/50 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-6"
        >
          <TrendingUp className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
          <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            Live Market Rates
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
          Today's Gold Price ({currentRate?.currency})
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
          Get accurate and updated gold & silver rates at your fingertips
        </p>

        {/* Gold Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { karat: "24K", rate: currentRate.gold_24k },
            { karat: "22K", rate: currentRate.gold_22k },
            { karat: "18K", rate: currentRate.gold_18k },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
                  <span className="text-2xl font-bold text-yellow-600">
                    {item.karat}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {item.karat} Gold
                </h3>
                <div className="text-4xl font-bold text-yellow-600 mb-2">
                  {item.rate
                    ? `${currentRate.currency} ${item.rate.toLocaleString(
                        undefined,
                        {
                          maximumFractionDigits: 2,
                        }
                      )}`
                    : "N/A"}
                </div>
                <p className="text-sm text-muted-foreground">per gram</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>
              Last updated on:{" "}
              {format(new Date(currentRate?.created_at), "MMM dd, yyyy HH:mm")}
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
