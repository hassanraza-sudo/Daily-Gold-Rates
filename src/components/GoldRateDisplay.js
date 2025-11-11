import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/components/GoldRateDisplay.tsx
import { useGoldRate } from "../contexts/GoldRateContext";
export default function GoldRateDisplay() {
    // Destructure the values from the context hook
    const { currentRate, loading, refreshRates } = useGoldRate();
    // 1. Loading State
    if (loading) {
        return (_jsx("div", { style: {
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }, children: "\u23F3 **Loading...** Fetching the latest gold rate." }));
    }
    // 2. Error/No Data State
    if (!currentRate) {
        return (_jsxs("div", { style: {
                padding: "20px",
                border: "1px solid red",
                borderRadius: "8px",
                color: "red",
            }, children: ["\u26A0\uFE0F **Data Unavailable:** Could not fetch gold rate.", _jsx("button", { onClick: refreshRates, style: { marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }, children: "Manual Refresh" })] }));
    }
    // --- 3. Display Data ---
    // Safely format the timestamp
    const lastUpdated = new Date(currentRate.created_at).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return (_jsxs("div", { style: {
            maxWidth: "450px",
            margin: "20px auto",
            padding: "25px",
            backgroundColor: "#fffbe6",
            border: "2px solid #facc15",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            fontFamily: "Arial, sans-serif",
        }, children: [_jsx("h2", { style: {
                    fontSize: "28px",
                    fontWeight: "bold",
                    color: "#b45309",
                    marginBottom: "15px",
                }, children: "\uD83D\uDCC8 Live Gold & Silver Prices" }), _jsxs("div", { style: {
                    marginBottom: "20px",
                    borderBottom: "1px solid #fde68a",
                    paddingBottom: "10px",
                }, children: [_jsx("p", { style: { fontSize: "18px", color: "#713f12" }, children: "Gold 24K Price:" }), _jsxs("div", { style: {
                            fontSize: "48px",
                            fontWeight: "extrabold",
                            color: "#ca8a04",
                        }, children: ["$", currentRate.gold_24k.toFixed(2)] })] }), _jsxs("div", { style: {
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                    marginBottom: "20px",
                }, children: [_jsxs("div", { style: {
                            backgroundColor: "#fef3c7",
                            padding: "10px",
                            borderRadius: "8px",
                        }, children: [_jsx("p", { style: { fontWeight: "bold", color: "#a16207" }, children: "Gold 22K:" }), _jsxs("span", { style: { fontSize: "20px" }, children: ["$", currentRate.gold_22k.toFixed(2)] })] }), _jsxs("div", { style: {
                            backgroundColor: "#fef3c7",
                            padding: "10px",
                            borderRadius: "8px",
                        }, children: [_jsx("p", { style: { fontWeight: "bold", color: "#a16207" }, children: "Gold 18K:" }), _jsxs("span", { style: { fontSize: "20px" }, children: ["$", currentRate.gold_18k.toFixed(2)] })] }), _jsxs("div", { style: {
                            backgroundColor: "#e5e7eb",
                            padding: "10px",
                            borderRadius: "8px",
                            gridColumn: "span 2",
                        }, children: [_jsx("p", { style: { fontWeight: "bold", color: "#4b5563" }, children: "Silver Price:" }), _jsxs("span", { style: { fontSize: "20px" }, children: ["$", currentRate.silver.toFixed(2)] })] })] }), _jsxs("div", { style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                    color: "#78716c",
                    paddingTop: "10px",
                    borderTop: "1px solid #e5e7eb",
                }, children: [_jsxs("span", { children: ["Last Updated: **", lastUpdated, "**"] }), _jsx("button", { onClick: refreshRates, style: {
                            padding: "5px 10px",
                            backgroundColor: "#fde047",
                            border: "none",
                            borderRadius: "9999px",
                            cursor: "pointer",
                            fontWeight: "600",
                        }, children: "Manual Check" })] })] }));
}
