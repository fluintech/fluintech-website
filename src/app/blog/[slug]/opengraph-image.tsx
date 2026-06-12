import { ImageResponse } from "next/og"
import { getAllPosts } from "@/lib/blog"

export const runtime = "edge"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const posts = await getAllPosts()
  const post = posts.find((p) => p.slug === slug)

  const title = post?.title ?? "Blog Fluintech"
  const category = post?.category ?? "Blog"

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* glow */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "-60px",
            transform: "translateX(-50%)",
            width: "600px",
            height: "350px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,217,146,0.09) 0%, transparent 65%)",
            filter: "blur(50px)",
          }}
        />

        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "auto" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "rgba(0,217,146,0.07)",
              border: "1px solid rgba(0,217,146,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#00D992">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span style={{ color: "#F2F2F2", fontSize: "26px", fontWeight: 500 }}>
            Fluintech
          </span>
          <span style={{ color: "#6B7280", fontSize: "22px", marginLeft: "4px" }}>/ Blog</span>
        </div>

        {/* category pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "6px 18px",
            borderRadius: "9999px",
            border: "1px solid rgba(0,217,146,0.22)",
            background: "rgba(0,217,146,0.07)",
            marginBottom: "28px",
            width: "fit-content",
          }}
        >
          <span style={{ color: "#00D992", fontSize: "18px" }}>{category}</span>
        </div>

        {/* title */}
        <h1
          style={{
            color: "#F2F2F2",
            fontSize: title.length > 70 ? "40px" : title.length > 50 ? "48px" : "54px",
            fontWeight: 500,
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          {title}
        </h1>
      </div>
    ),
    { width: 1200, height: 630 },
  )
}
