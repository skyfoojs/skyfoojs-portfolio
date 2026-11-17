import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name}: Software Engineer, Backend & Data Engineering`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "radial-gradient(circle at 50% -20%, #0c4a6e 0%, #020617 65%)",
          color: "#F1F5F9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#38BDF8", letterSpacing: 6, textTransform: "uppercase" }}>
          skyfoojs.com
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, marginTop: 24 }}>{profile.name}</div>
        <div style={{ fontSize: 40, color: "#CBD5E1", marginTop: 16 }}>
          Software Engineer · Backend & Data Engineering
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 28,
            color: "#FCD34D",
            border: "2px solid rgba(251,191,36,0.4)",
            borderRadius: 999,
            padding: "12px 28px",
            alignSelf: "flex-start",
          }}
        >
          3rd Runner-Up · SDC Hackathon 2026
        </div>
      </div>
    ),
    size,
  );
}
