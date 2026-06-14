import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D1017",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "40px",
        }}
      >
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none">
          <path d="M 14 22 C 38 22 56 47 73 50" stroke="#23C9B6" strokeWidth="6.5" strokeLinecap="round"/>
          <path d="M 14 50 C 38 50 56 50 73 50" stroke="#23C9B6" strokeWidth="6.5" strokeLinecap="round"/>
          <path d="M 14 78 C 38 78 56 53 73 50" stroke="#23C9B6" strokeWidth="6.5" strokeLinecap="round"/>
          <circle cx="14" cy="22" r="4.5" fill="#23C9B6" fillOpacity="0.5"/>
          <circle cx="14" cy="50" r="4.5" fill="#23C9B6" fillOpacity="0.5"/>
          <circle cx="14" cy="78" r="4.5" fill="#23C9B6" fillOpacity="0.5"/>
          <circle cx="73" cy="50" r="12" fill="#23C9B6"/>
        </svg>
      </div>
    ),
    { width: 180, height: 180 },
  )
}
