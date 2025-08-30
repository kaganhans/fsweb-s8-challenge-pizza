import React from "react";

export default function Success() {
  return (
    <div style={{ minHeight: "100vh", background: "#CE2829" }}>
      {/* Üstte ortalı logo */}
      <header
        style={{
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/logo.svg" // public/logo.svg
          alt="Teknolojik Yemekler"
          style={{ height: 36, filter: "brightness(0) invert(1)" }}
        />
      </header>

      {/* Orta kısım: mesaj */}
      <main
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#fff",
          gap: 12,
          fontFamily: "'Roboto Condensed', sans-serif", // 🔑 font
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 300, // ince
            lineHeight: 1.05,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Tebrikler!
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "1px",
            textTransform: "uppercase",
          }}
        >
          Siparişiniz Alındı!
        </div>
      </main>
    </div>
  );
}
