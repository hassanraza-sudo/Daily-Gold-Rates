import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { TrendingUp, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
export function Hero() {
    const [loading, setLoading] = useState(true);
    const [currentRate, setCurrentRate] = useState(null);
    useEffect(() => {
        const fetchGoldRate = async () => {
            try {
                // Example: currency can be changed dynamically (e.g., AED, PKR, USD)
                const currency = "EUR";
                const apiKey = import.meta.env.VITE_API_KEY;
                const res = await fetch(`https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=XAU,${currency}`);
                const data = await res.json();
                console.log("API Data:", data);
                if (!data?.rates?.USDXAU || !data?.rates?.[currency]) {
                    throw new Error("Invalid API response");
                }
                // Extract rates
                const goldPerOunceUSD = data.rates.USDXAU; // gold per ounce in USD
                const exchangeRate = data.rates[currency]; // exchange rate of 1 USD in target currency
                // Convert ounce to grams
                const goldPerOunceLocal = goldPerOunceUSD * exchangeRate;
                const goldPerGramLocal = goldPerOunceLocal / 31.1035;
                // Karat multipliers
                const karatMultipliers = {
                    "24K": 1.0,
                    "22K": 0.9167,
                    "18K": 0.75,
                };
                // Calculate prices per gram for each karat
                const gold_24k = goldPerGramLocal * karatMultipliers["24K"];
                const gold_22k = goldPerGramLocal * karatMultipliers["22K"];
                const gold_18k = goldPerGramLocal * karatMultipliers["18K"];
                setCurrentRate({
                    gold_24k,
                    gold_22k,
                    gold_18k,
                    currency,
                    created_at: new Date().toISOString(),
                });
            }
            catch (err) {
                console.error("Error fetching gold price:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchGoldRate();
    }, []);
    if (loading) {
        return (_jsx("div", { className: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-20", children: _jsx("div", { className: "container mx-auto px-4", children: _jsx("div", { className: "text-center", children: _jsx("div", { className: "animate-pulse", children: "Loading..." }) }) }) }));
    }
    return (_jsx(motion.section, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, className: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-gray-900 dark:to-gray-800 py-20", children: _jsxs("div", { className: "container mx-auto px-4 text-center", children: [_jsxs(motion.div, { initial: { scale: 0.9 }, animate: { scale: 1 }, transition: { duration: 0.5, delay: 0.2 }, className: "inline-flex items-center space-x-2 bg-yellow-200/50 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-6", children: [_jsx(TrendingUp, { className: "h-5 w-5 text-yellow-700 dark:text-yellow-400" }), _jsx("span", { className: "text-sm font-medium text-yellow-800 dark:text-yellow-300", children: "Live Market Rates" })] }), _jsxs("h1", { className: "text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent", children: ["Today's Gold Price (", currentRate?.currency, ")"] }), _jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto mb-12", children: "Get accurate and updated gold & silver rates at your fingertips" }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto", children: [
                        { karat: "24K", rate: currentRate.gold_24k },
                        { karat: "22K", rate: currentRate.gold_22k },
                        { karat: "18K", rate: currentRate.gold_18k },
                    ].map((item, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.5 + i * 0.1 }, className: "bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4", children: _jsx("span", { className: "text-2xl font-bold text-yellow-600", children: item.karat }) }), _jsxs("h3", { className: "text-xl font-semibold mb-2", children: [item.karat, " Gold"] }), _jsx("div", { className: "text-4xl font-bold text-yellow-600 mb-2", children: item.rate
                                        ? `${currentRate.currency} ${item.rate.toLocaleString(undefined, {
                                            maximumFractionDigits: 2,
                                        })}`
                                        : "N/A" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "per gram" })] }) }, i))) }), _jsx("div", { className: "mt-8 text-center", children: _jsxs("div", { className: "inline-flex items-center space-x-2 text-sm text-muted-foreground", children: [_jsx(Clock, { className: "h-4 w-4" }), _jsxs("span", { children: ["Last updated on:", " ", format(new Date(currentRate?.created_at), "MMM dd, yyyy HH:mm")] })] }) })] }) }));
}
