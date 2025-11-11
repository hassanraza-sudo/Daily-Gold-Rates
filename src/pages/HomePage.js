import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Hero } from "@/components/Hero";
import { GoldCalculator } from "@/components/GoldCalculator";
// import { PriceChart } from '@/components/PriceChart';
import { BlogPreview } from "@/components/BlogPreview";
import { Newsletter } from "@/components/Newsletter";
export function HomePage() {
    return (_jsxs("div", { children: [_jsx(Hero, {}), _jsx(GoldCalculator, {}), _jsx(BlogPreview, {}), _jsx(Newsletter, {})] }));
}
