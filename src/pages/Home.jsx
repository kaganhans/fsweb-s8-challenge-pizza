import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section
      style={{
        background: "var(--red)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "#fff",
        position: "relative",
        backgroundImage: "url('/home-banner.png')", // 📌 public/home-banner.png
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo */}
      <img
        src="/logo.svg"
        alt="Teknolojik Yemekler"
        style={{ height: 36, marginBottom: 32, filter: "brightness(0) invert(1)" }}
      />

      {/* Slogan */}
      <h1
        style={{
          fontWeight: 300,
          fontFamily: "'Roboto Condensed', sans-serif",
          fontSize: "clamp(28px, 7vw, 72px)",
          lineHeight: 1.1,
          margin: "0 0 28px",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        KOD ACIKTIRIR <br /> PİZZA, DOYURUR
      </h1>

      {/* Buton */}
      <Link
        to="/siparis"
        style={{
          background: "var(--yellow)",
          padding: "12px 28px",
          borderRadius: 8,
          color: "var(--gray-dark)",
          fontWeight: 700,
          fontSize: 18,
          textDecoration: "none",   // ✅ burası eksikti
        }}
      >
        ACIKTIM
      </Link>
    </section>
  );
}
