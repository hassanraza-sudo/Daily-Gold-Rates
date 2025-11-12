import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { ContactPage } from "@/pages/ContactPage";
import { Toaster } from "@/components/ui/toaster";
function App() {
    return (_jsx(ThemeProvider, { children: _jsxs(Router, { children: [_jsxs("div", { className: "min-h-screen flex flex-col", children: [_jsx(Header, {}), _jsx("main", { className: "flex-1", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/about", element: _jsx(AboutPage, {}) }), _jsx(Route, { path: "/contact", element: _jsx(ContactPage, {}) })] }) }), _jsx(Footer, {})] }), _jsx(Toaster, {})] }) }));
}
export default App;
