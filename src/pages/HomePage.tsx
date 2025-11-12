import { Hero } from "@/components/Hero";
import { GoldCalculator } from "@/components/GoldCalculator";
// import { PriceChart } from '@/components/PriceChart';
import { Newsletter } from "@/components/Newsletter";

export function HomePage() {
  return (
    <div>
      <Hero />
      {/* <PriceChart /> */}
      <GoldCalculator />
      <Newsletter />
    </div>
  );
}
