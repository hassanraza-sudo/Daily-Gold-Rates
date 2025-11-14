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

        // ✅ Correct API: base must be USD
        const res = await fetch(
          `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=XAU,${currency}`
        );

        const data = await res.json();
        console.log("API response:", data);

        // ❌ If gold or AED not returned
        if (!data?.rates?.XAU || !data?.rates?.[currency]) {
          throw new Error("Invalid API response");
        }

        // USD → XAU → AED
        const usdToXau = data.rates.XAU; // USD per XAU (Ounce)
        const usdToAed = data.rates[currency];

        // Convert ounce → gram
        const goldPerOunceInAed = (1 / usdToXau) * usdToAed;
        const goldPerGram = goldPerOunceInAed / 31.1035;

        const karatMultipliers = {
          "24K": 1.0,
          "22K": 0.9167,
          "18K": 0.75,
        };

        setCurrentRate({
          gold_24k: goldPerGram * karatMultipliers["24K"],
          gold_22k: goldPerGram * karatMultipliers["22K"],
          gold_18k: goldPerGram * karatMultipliers["18K"],
          currency,
          created_at: new Date().toISOString(),
        });
      } catch (err) {
        console.error("Error fetching gold price:", err);
        setCurrentRate(null); // prevent crash
      } finally {
        setLoading(false);
      }
    };

    fetchGoldRate();
  }, []);

  if (loading || !currentRate) {
    return (
      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse text-lg">Loading live rates...</div>
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
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
          Today's Gold Price ({currentRate.currency})
        </h1>

        {/* Gold Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { karat: "24K", rate: currentRate?.gold_24k },
            { karat: "22K", rate: currentRate?.gold_22k },
            { karat: "18K", rate: currentRate?.gold_18k },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{item.karat}</h3>
              <div className="text-4xl font-bold text-yellow-600">
                {item.rate
                  ? `${currentRate.currency} ${item.rate.toFixed(2)}`
                  : "N/A"}
              </div>
              <p className="text-sm text-muted-foreground">per gram</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <Clock className="inline h-4 w-4 mr-2" />
          Last updated:{" "}
          {format(new Date(currentRate.created_at), "MMM dd, yyyy HH:mm")}
        </div>
      </div>
    </motion.section>
  );
}
