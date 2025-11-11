import { Hero } from "@/components/Hero";
import { GoldCalculator } from "@/components/GoldCalculator";
// import { PriceChart } from '@/components/PriceChart';
import { BlogPreview } from "@/components/BlogPreview";
import { Newsletter } from "@/components/Newsletter";

export function HomePage() {
  return (
    <div>
      <Hero />
      {/* <PriceChart /> */}
      <GoldCalculator />
      <BlogPreview />
      <Newsletter />
    </div>
  );
}
