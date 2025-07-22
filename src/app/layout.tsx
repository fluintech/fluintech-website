import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "Fluintech - Automação Inteligente com IA | Atendimento e Agendamentos",
  description:
    "Transforme seu atendimento com inteligência artificial. Automatize agendamentos, chatbots 24/7 e fluxos inteligentes. Reduza 70% do tempo de resposta.",
  keywords:
    "automação, inteligência artificial, chatbot, agendamento inteligente, atendimento automatizado, IA, Brasil",
  authors: [{ name: "Fluintech" }],
  creator: "Fluintech",
  publisher: "Fluintech",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.fluintech.com.br",
    siteName: "Fluintech",
    title: "Fluintech - Automação Inteligente com IA",
    description:
      "Transforme seu atendimento com inteligência artificial. Automatize agendamentos, chatbots 24/7 e fluxos inteligentes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fluintech - Automação Inteligente",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fluintech - Automação Inteligente com IA",
    description:
      "Transforme seu atendimento com inteligência artificial. Automatize agendamentos, chatbots 24/7 e fluxos inteligentes.",
    images: ["/og-image.png"],
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="canonical" href="https://www.fluintech.com.br" />
        <meta name="geo.region" content="BR" />
        <meta name="geo.placename" content="Paraná" />
        <meta name="geo.position" content="-23.419018564247832;-51.93836327766127" />
        <meta name="ICBM" content="-23.419018564247832, -51.93836327766127" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Fluintech",
              url: "https://www.fluintech.com.br",
              logo: "https://www.fluintech.com.br/logo.png",
              description:
                "Startup brasileira especializada em automação inteligente para atendimento ao cliente e agendamento de serviços com IA.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BR",
                addressRegion: "PR",
                addressLocality: "Paraná",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+55-44-99864-4440",
                contactType: "customer service",
                availableLanguage: "Portuguese",
              },
              sameAs: ["https://linkedin.com/company/fluintech", "https://instagram.com/fluintech"],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
