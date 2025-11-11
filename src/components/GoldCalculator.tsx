import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GoldCalculator() {
  const [weight, setWeight] = useState<string>("10");
  const [unit, setUnit] = useState<"gram" | "tola">("gram");
  const [purity, setPurity] = useState<"24K" | "22K" | "18K">("24K");
  const [country, setCountry] = useState<string>("Pakistan");
  const [currency, setCurrency] = useState<string>("PKR");
  const [goldPerGram, setGoldPerGram] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const karatMultipliers: Record<string, number> = {
    "24K": 1.0,
    "22K": 0.9167,
    "18K": 0.75,
  };

  const countryToCurrency: Record<string, string> = {
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
      } catch (err) {
        console.error("Error fetching gold data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoldRate();
  }, [country]);

  const calculateValue = () => {
    if (!weight || goldPerGram === 0) return 0;

    let weightInGrams = parseFloat(weight);
    if (unit === "tola") weightInGrams *= 11.66;

    return weightInGrams * goldPerGram * (karatMultipliers[purity] || 1);
  };

  const totalValue = calculateValue();

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 py-20"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full mb-4">
          <Calculator className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
          <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            Calculate Gold Value
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-4">Gold Value Calculator</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Calculate your gold’s current market value based on live global rates
        </p>
      </div>

      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Gold Price Estimator</CardTitle>
          <CardDescription>
            Enter details to get an instant live estimate.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
                min="0"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select
                value={unit}
                onValueChange={(v) => setUnit(v as "gram" | "tola")}
              >
                <SelectTrigger id="unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gram">Gram</SelectItem>
                  <SelectItem value="tola">Tola (11.66g)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="purity">Gold Purity</Label>
              <Select
                value={purity}
                onValueChange={(v) => setPurity(v as "24K" | "22K" | "18K")}
              >
                <SelectTrigger id="purity">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24K">24 Karat (99.9%)</SelectItem>
                  <SelectItem value="22K">22 Karat (91.7%)</SelectItem>
                  <SelectItem value="18K">18 Karat (75%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select value={country} onValueChange={(v) => setCountry(v)}>
                <SelectTrigger id="country">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(countryToCurrency).map((ct) => (
                    <SelectItem key={ct} value={ct}>
                      {ct}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Result */}
          <div className="pt-6 border-t">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-lg p-6 text-center">
              {loading ? (
                <p className="animate-pulse text-gray-500">
                  Fetching live rate...
                </p>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-2">
                    Estimated Value
                  </p>
                  <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">
                    {currency}{" "}
                    {totalValue.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {weight} {unit} of {purity} gold in {country}
                  </p>
                </>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            Note: Actual prices may vary due to making charges, taxes, or market
            conditions.
          </p>
        </CardContent>
      </Card>
    </motion.section>
  );
}
