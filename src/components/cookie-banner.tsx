"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("fl-cookie-ok")) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4"
      style={{ borderTop: "1px solid var(--surface-border)", background: "var(--surface-card)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm flex-1" style={{ color: "var(--text-secondary)" }}>
          Usamos cookies e analytics para melhorar sua experiência.{" "}
          <Link
            href="/privacidade"
            className="underline underline-offset-2 transition-colors duration-150 hover:text-[--brand]"
            style={{ color: "var(--text-secondary)" }}
          >
            Política de Privacidade
          </Link>
          .
        </p>
        <button
          onClick={() => {
            localStorage.setItem("fl-cookie-ok", "1")
            setVisible(false)
          }}
          className="shrink-0 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 hover:opacity-90"
          style={{ background: "var(--brand)", color: "var(--surface)" }}
        >
          Entendi
        </button>
      </div>
    </div>
  )
}
