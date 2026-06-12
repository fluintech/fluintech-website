"use client"

import { useState } from "react"
import { Check, Copy, Linkedin, Twitter } from "lucide-react"

function ShareLink({
  href,
  label,
  icon,
}: {
  href: string
  label: string
  icon?: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs transition-colors duration-150 hover:text-[--brand] hover:border-[--brand-border]"
      style={{
        border: "1px solid var(--surface-border)",
        color: "var(--text-muted)",
        background: "var(--surface)",
      }}
    >
      {icon}
      {label}
    </a>
  )
}

export function ShareButtons({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  return (
    <div
      className="flex flex-wrap items-center gap-2 pt-6"
      style={{ borderTop: "1px solid var(--surface-border)" }}
    >
      <span
        className="font-mono text-[10px] uppercase tracking-widest mr-1"
        style={{ color: "var(--text-muted)" }}
      >
        Compartilhar
      </span>

      <ShareLink
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        label="X / Twitter"
        icon={<Twitter className="w-3 h-3" />}
      />
      <ShareLink
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        label="LinkedIn"
        icon={<Linkedin className="w-3 h-3" />}
      />
      <ShareLink
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        label="Facebook"
      />
      <ShareLink
        href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
        label="WhatsApp"
      />

      <button
        onClick={copy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs transition-colors duration-150"
        style={{
          border: `1px solid ${copied ? "var(--brand-border)" : "var(--surface-border)"}`,
          color: copied ? "var(--brand)" : "var(--text-muted)",
          background: "var(--surface)",
        }}
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? "Copiado!" : "Copiar link"}
      </button>
    </div>
  )
}
