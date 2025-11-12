import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
export function Header() {
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navItems = [
        { path: "/", label: "Home" },
        { path: "/about", label: "About" },
        { path: "/contact", label: "Contact" },
    ];
    const isActive = (path) => location.pathname === path;
    return (_jsxs("header", { className: "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", children: [_jsx("div", { className: "container mx-auto px-4", children: _jsxs("div", { className: "flex h-16 items-center justify-between", children: [_jsxs(Link, { to: "/", className: "flex items-center space-x-2", children: [_jsx("div", { className: "flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600", children: _jsx("span", { className: " font-bold text-3xl pb-2 text-white", children: "\uD83E\uDDC8" }) }), _jsx("span", { className: "text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-700 bg-clip-text text-transparent", children: "DailyGoldRate" })] }), _jsxs("nav", { className: "hidden md:flex items-center space-x-6", children: [navItems.map((item) => (_jsx(Link, { to: item.path, className: `text-sm font-medium transition-colors hover:text-yellow-600 ${isActive(item.path)
                                        ? "text-yellow-600"
                                        : "text-muted-foreground"}`, children: item.label }, item.path))), _jsx(Button, { variant: "ghost", size: "icon", onClick: toggleTheme, className: "ml-4", children: theme === "light" ? (_jsx(Moon, { className: "h-5 w-5" })) : (_jsx(Sun, { className: "h-5 w-5" })) })] }), _jsxs("div", { className: "flex md:hidden items-center space-x-2", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: toggleTheme, children: theme === "light" ? (_jsx(Moon, { className: "h-5 w-5" })) : (_jsx(Sun, { className: "h-5 w-5" })) }), _jsx(Button, { variant: "ghost", size: "icon", onClick: () => setMobileMenuOpen(!mobileMenuOpen), children: mobileMenuOpen ? (_jsx(X, { className: "h-5 w-5" })) : (_jsx(Menu, { className: "h-5 w-5" })) })] })] }) }), _jsx(AnimatePresence, { children: mobileMenuOpen && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "md:hidden border-t bg-background", children: _jsx("nav", { className: "container mx-auto px-4 py-4 flex flex-col space-y-4", children: navItems.map((item) => (_jsx(Link, { to: item.path, onClick: () => setMobileMenuOpen(false), className: `text-sm font-medium transition-colors hover:text-yellow-600 ${isActive(item.path)
                                ? "text-yellow-600"
                                : "text-muted-foreground"}`, children: item.label }, item.path))) }) })) })] }));
}
