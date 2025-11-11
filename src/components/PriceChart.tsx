import { motion } from "framer-motion";
import { TrendingUp, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PriceChart() {
  const mockData = [
    { date: "Nov 1", price: 7150 },
    { date: "Nov 2", price: 7180 },
    { date: "Nov 3", price: 7200 },
  ];

  const maxPrice = Math.max(...mockData.map((d) => d.price));
  const minPrice = Math.min(...mockData.map((d) => d.price));
  const range = maxPrice - minPrice;

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
          <TrendingUp className="h-5 w-5 text-yellow-700 dark:text-yellow-400" />
          <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
            Price Trends
          </span>
        </div>
        <h2 className="text-4xl font-bold mb-4">Gold Price Trends</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track historical gold price movements over time
        </p>
      </div>

      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>24K Gold Price Movement</CardTitle>
          <CardDescription>Last 3 days trend (per gram)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end space-x-4">
            {mockData.map((data, index) => {
              const heightPercent =
                range > 0 ? ((data.price - minPrice) / range) * 100 : 50;

              return (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-1 flex flex-col items-center"
                >
                  <div className="w-full bg-gradient-to-t from-yellow-400 to-yellow-600 rounded-t-lg relative group cursor-pointer hover:from-yellow-500 hover:to-yellow-700 transition-colors">
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      ₹{data.price.toLocaleString()}
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    {data.date}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Period: Last 3 days
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <span className="text-muted-foreground">High: </span>
                  <span className="font-semibold text-green-600">
                    ₹{maxPrice.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Low: </span>
                  <span className="font-semibold text-red-600">
                    ₹{minPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
}
