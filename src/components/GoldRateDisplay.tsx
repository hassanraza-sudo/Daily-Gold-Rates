// src/components/GoldRateDisplay.tsx

import { useGoldRate } from "../contexts/GoldRateContext.tsx";
export default function GoldRateDisplay() {
  // Destructure the values from the context hook
  const { currentRate, loading, refreshRates } = useGoldRate();

  // 1. Loading State
  if (loading) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        ⏳ **Loading...** Fetching the latest gold rate.
      </div>
    );
  }

  // 2. Error/No Data State
  if (!currentRate) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid red",
          borderRadius: "8px",
          color: "red",
        }}
      >
        ⚠️ **Data Unavailable:** Could not fetch gold rate.
        <button
          onClick={refreshRates}
          style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
        >
          Manual Refresh
        </button>
      </div>
    );
  }

  // --- 3. Display Data ---

  // Safely format the timestamp
  const lastUpdated = new Date(currentRate.created_at).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "20px auto",
        padding: "25px",
        backgroundColor: "#fffbe6",
        border: "2px solid #facc15",
        borderRadius: "12px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#b45309",
          marginBottom: "15px",
        }}
      >
        📈 Live Gold & Silver Prices
      </h2>

      <div
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #fde68a",
          paddingBottom: "10px",
        }}
      >
        <p style={{ fontSize: "18px", color: "#713f12" }}>Gold 24K Price:</p>
        <div
          style={{
            fontSize: "48px",
            fontWeight: "extrabold",
            color: "#ca8a04",
          }}
        >
          ${currentRate.gold_24k.toFixed(2)}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fef3c7",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <p style={{ fontWeight: "bold", color: "#a16207" }}>Gold 22K:</p>
          <span style={{ fontSize: "20px" }}>
            ${currentRate.gold_22k.toFixed(2)}
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#fef3c7",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <p style={{ fontWeight: "bold", color: "#a16207" }}>Gold 18K:</p>
          <span style={{ fontSize: "20px" }}>
            ${currentRate.gold_18k.toFixed(2)}
          </span>
        </div>
        <div
          style={{
            backgroundColor: "#e5e7eb",
            padding: "10px",
            borderRadius: "8px",
            gridColumn: "span 2",
          }}
        >
          <p style={{ fontWeight: "bold", color: "#4b5563" }}>Silver Price:</p>
          <span style={{ fontSize: "20px" }}>
            ${currentRate.silver.toFixed(2)}
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "14px",
          color: "#78716c",
          paddingTop: "10px",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <span>Last Updated: **{lastUpdated}**</span>
        <button
          onClick={refreshRates}
          style={{
            padding: "5px 10px",
            backgroundColor: "#fde047",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Manual Check
        </button>
      </div>
    </div>
  );
}
