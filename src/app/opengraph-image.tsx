import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Fluintech — Agentes de IA que executam o trabalho pesado"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* subtle glow */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-80px",
            transform: "translateX(-50%)",
            width: "700px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,217,146,0.10) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />

        {/* logo + brand name */}
        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "52px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "rgba(0,217,146,0.07)",
              border: "1px solid rgba(0,217,146,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#00D992">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span style={{ color: "#F2F2F2", fontSize: "40px", fontWeight: 500 }}>Fluintech</span>
        </div>

        {/* tagline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", marginBottom: "52px" }}>
          <span style={{ color: "#F2F2F2", fontSize: "60px", fontWeight: 500, lineHeight: 1.15, textAlign: "center" }}>
            Sua operação, comandada
          </span>
          <span style={{ color: "#00D992", fontSize: "60px", fontWeight: 500, lineHeight: 1.15, textAlign: "center" }}>
            por agentes que agem.
          </span>
        </div>

        {/* pill tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "10px 24px",
            borderRadius: "9999px",
            border: "1px solid rgba(0,217,146,0.22)",
            background: "rgba(0,217,146,0.07)",
          }}
        >
          <span style={{ color: "#00D992", fontSize: "22px" }}>Agentes de IA para operações reais</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
