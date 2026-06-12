import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { Toaster } from "@/components/ui/toaster"
import { CookieBanner } from "@/components/cookie-banner"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fluintech.com.br"),
  title: "Fluintech — Agentes de IA que executam o trabalho pesado",
  description:
    "Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no que realmente importa. Do diagnóstico ao primeiro agente em 30 dias.",
  keywords: "agentes de IA, automação, n8n, WhatsApp, inteligência artificial, PME, Brasil",
  authors: [{ name: "Fluintech" }],
  creator: "Fluintech",
  publisher: "Fluintech",
  robots: "index, follow",
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon",
  },
  alternates: {
    canonical: "https://www.fluintech.com.br",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.fluintech.com.br",
    siteName: "Fluintech",
    title: "Fluintech — Agentes de IA que executam o trabalho pesado",
    description:
      "Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no que realmente importa.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@fluintech",
    images: ["/opengraph-image"],
  },
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fluintech",
  description:
    "Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no que realmente importa.",
  url: "https://www.fluintech.com.br",
  logo: "https://www.fluintech.com.br/icon.svg",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+55-44-3101-0224",
    contactType: "customer service",
    availableLanguage: "Portuguese",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Maringa",
    addressRegion: "PR",
    addressCountry: "BR",
  },
  sameAs: [
    "https://www.youtube.com/@fluintech",
    "https://www.instagram.com/fluintech",
    "https://www.facebook.com/profile.php?id=61578914720363",
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <Suspense>{children}</Suspense>
        <CookieBanner />
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
