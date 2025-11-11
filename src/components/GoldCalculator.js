import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export function GoldCalculator() {
    const [weight, setWeight] = useState("10");
    const [unit, setUnit] = useState("gram");
    const [purity, setPurity] = useState("24K");
    const [country, setCountry] = useState("Pakistan");
    const [currency, setCurrency] = useState("PKR");
    const [goldPerGram, setGoldPerGram] = useState(0);
    const [loading, setLoading] = useState(false);
    const karatMultipliers = {
        "24K": 1.0,
        "22K": 0.9167,
        "18K": 0.75,
    };
    const countryToCurrency = {
        USA: "USD",
        UK: "GBP",
        Australia: "AUD",
        Canada: "CAD",
        Eurozone: "EUR",
        Japan: "JPY",
        China: "CNY",
        India: "INR",
        Pakistan: "PKR",
        UAE: "AED",
        Saudi: "SAR",
    };
    useEffect(() => {
        const fetchGoldRate = async () => {
            try {
                setLoading(true);
                const currencyCode = countryToCurrency[country] || "USD";
                setCurrency(currencyCode);
                const apiKey = import.meta.env.VITE_API_KEY;
                console.log("api key is : ", apiKey);
                const url = `https://api.metalpriceapi.com/v1/latest?api_key=${apiKey}&base=USD&currencies=XAU,${currencyCode}`;
                const res = await fetch(url);
                const data = await res.json();
                if (!data?.rates?.USDXAU || !data?.rates[currencyCode]) {
                    console.error("Invalid API response", data);
                    setLoading(false);
                    return;
                }
                const goldPerOunceUSD = data.rates.USDXAU;
                const exchangeRate = data.rates[currencyCode];
                const goldPerOunceLocal = goldPerOunceUSD * exchangeRate;
                const perGram = goldPerOunceLocal / 31.1035;
                setGoldPerGram(perGram);
            }
            catch (err) {
                console.error("Error fetching gold data:", err);
            }
            finally {
                setLoading(false);
            }
        };
        fetchGoldRate();
    }, [country]);
    const calculateValue = () => {
        if (!weight || goldPerGram === 0)
            return 0;
        let weightInGrams = parseFloat(weight);
        if (unit === "tola")
            weightInGrams *= 11.66;
        return weightInGrams * goldPerGram * (karatMultipliers[purity] || 1);
    };
    const totalValue = calculateValue();
    return (_jsxs(motion.section, { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 }, viewport: { once: true }, className: "container mx-auto px-4 py-20", children: [_jsxs("div", { className: "text-center mb-12", children: [_jsxs("div", { className: "inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-4", children: [_jsx(Calculator, { className: "h-5 w-5 text-yellow-700 dark:text-yellow-400" }), _jsx("span", { className: "text-sm font-medium text-yellow-800 dark:text-yellow-300", children: "Calculate Gold Value" })] }), _jsx("h2", { className: "text-4xl font-bold mb-4", children: "Gold Value Calculator" }), _jsx("p", { className: "text-muted-foreground max-w-2xl mx-auto", children: "Calculate your gold\u2019s current market value based on live global rates" })] }), _jsxs(Card, { className: "max-w-2xl mx-auto shadow-lg", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Gold Price Estimator" }), _jsx(CardDescription, { children: "Enter details to get an instant live estimate." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "weight", children: "Weight" }), _jsx(Input, { id: "weight", type: "number", value: weight, onChange: (e) => setWeight(e.target.value), placeholder: "Enter weight", min: "0", step: "0.01" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "unit", children: "Unit" }), _jsxs(Select, { value: unit, onValueChange: (v) => setUnit(v), children: [_jsx(SelectTrigger, { id: "unit", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "gram", children: "Gram" }), _jsx(SelectItem, { value: "tola", children: "Tola (11.66g)" })] })] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "purity", children: "Gold Purity" }), _jsxs(Select, { value: purity, onValueChange: (v) => setPurity(v), children: [_jsx(SelectTrigger, { id: "purity", children: _jsx(SelectValue, {}) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "24K", children: "24 Karat (99.9%)" }), _jsx(SelectItem, { value: "22K", children: "22 Karat (91.7%)" }), _jsx(SelectItem, { value: "18K", children: "18 Karat (75%)" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "country", children: "Country" }), _jsxs(Select, { value: country, onValueChange: (v) => setCountry(v), children: [_jsx(SelectTrigger, { id: "country", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { children: Object.keys(countryToCurrency).map((ct) => (_jsx(SelectItem, { value: ct, children: ct }, ct))) })] })] })] }), _jsx("div", { className: "pt-6 border-t", children: _jsx("div", { className: "bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-6 text-center", children: loading ? (_jsx("p", { className: "animate-pulse text-gray-500", children: "Fetching live rate..." })) : (_jsxs(_Fragment, { children: [_jsx("p", { className: "text-sm text-muted-foreground mb-2", children: "Estimated Value" }), _jsxs("div", { className: "text-4xl md:text-5xl font-bold text-yellow-600 mb-2", children: [currency, " ", totalValue.toLocaleString(undefined, {
                                                        maximumFractionDigits: 2,
                                                    })] }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Based on ", weight, " ", unit, " of ", purity, " gold in ", country] })] })) }) }), _jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Note: Actual prices may vary due to making charges, taxes, or market conditions." })] })] })] }));
}
