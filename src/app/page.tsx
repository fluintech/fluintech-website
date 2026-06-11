"use client"

import { useState, useEffect, useRef } from "react"
import { Footer } from "@/components/footer"
import {
  Menu,
  X,
  MessageCircle,
  Zap,
  Clock,
  TrendingUp,
  BarChart3,
  ArrowRight,
  Search,
  FileText,
  Wrench,
  GraduationCap,
} from "lucide-react"

const WHATSAPP_URL =
  "https://wa.me/554431010224?text=Ol%C3%A1!+Quero+entender+como+a+Fluintech+pode+ajudar+minha+empresa."

const FEED_EVENTS = [
  "Lead recebido via WhatsApp",
  "Consultando base de clientes...",
  "Nenhum registro encontrado",
  "Criando contato no CRM",
  "Notificando equipe comercial",
  "Agendando follow-up para amanhã",
  "Resposta enviada ao cliente ✓",
  "Nova mensagem recebida",
  "Identificando intenção da mensagem...",
  "Encaminhando para suporte técnico",
  "Ticket #4821 criado automaticamente",
  "Confirmação enviada ao cliente ✓",
]

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
    </svg>
  )
}

function AgentFeed() {
  const [events, setEvents] = useState<{ time: string; text: string }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let idx = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const addEvent = () => {
      const now = new Date()
      const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
      setEvents((prev) => [...prev.slice(-7), { time, text: FEED_EVENTS[idx] }])
      idx = (idx + 1) % FEED_EVENTS.length
      timeoutId = setTimeout(addEvent, 800 + Math.random() * 700)
    }

    timeoutId = setTimeout(addEvent, 400)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [events])

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "0.5px solid var(--surface-border)", background: "var(--surface-card)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "0.5px solid var(--surface-border)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--surface-border)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--surface-border)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--surface-border)" }} />
        </div>
        <span className="ml-2 font-mono text-xs" style={{ color: "var(--text-muted)" }}>
          agente / qualificacao-leads
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "var(--brand)" }}
          />
          <span className="text-xs" style={{ color: "var(--brand)" }}>
            rodando
          </span>
        </div>
      </div>

      <div ref={containerRef} className="h-52 overflow-hidden p-4 space-y-2.5">
        {events.map((ev, i) => (
          <div key={i} className="flex gap-3 text-sm font-mono animate-fade-in">
            <span className="shrink-0" style={{ color: "var(--text-muted)" }}>
              {ev.time}
            </span>
            <span style={{ color: "var(--text-secondary)" }}>{ev.text}</span>
          </div>
        ))}
        <div className="flex gap-3 text-sm font-mono">
          <span className="shrink-0 opacity-0">00:00</span>
          <span
            className="inline-block w-2 h-4 animate-pulse"
            style={{ background: "var(--brand)", opacity: 0.7 }}
          />
        </div>
      </div>
    </div>
  )
}

export default function FluintechHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: "var(--surface)" }}>
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-150"
        style={{
          borderBottom: scrolled ? "0.5px solid var(--surface-border)" : "0.5px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          background: scrolled ? "color-mix(in srgb, var(--surface) 90%, transparent)" : "transparent",
        }}
      >
        <nav className="max-w-6xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "var(--brand)" }}
              aria-hidden="true"
            >
              <div className="w-3 h-3 rounded-sm" style={{ background: "var(--surface)" }} />
            </div>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>
              Fluintech
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#como-funciona"
              className="text-sm transition-colors duration-150 hover:text-[--text-primary]"
              style={{ color: "var(--text-secondary)" }}
            >
              Como funciona
            </a>
            <a
              href="#para-quem"
              className="text-sm transition-colors duration-150 hover:text-[--text-primary]"
              style={{ color: "var(--text-secondary)" }}
            >
              Para quem
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors duration-150 hover:text-[--text-primary]"
              style={{ color: "var(--text-secondary)" }}
            >
              Contato
            </a>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-opacity duration-150 hover:opacity-90"
            style={{ background: "var(--brand)", color: "var(--surface)" }}
          >
            <MessageCircle className="w-4 h-4" />
            Falar com a Lia
          </a>

          <button
            className="md:hidden transition-colors duration-150"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            style={{ color: "var(--text-secondary)" }}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {menuOpen && (
          <div style={{ borderTop: "0.5px solid var(--surface-border)", background: "var(--surface-card)" }}>
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#como-funciona"
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMenuOpen(false)}
              >
                Como funciona
              </a>
              <a
                href="#para-quem"
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMenuOpen(false)}
              >
                Para quem
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium w-fit"
                style={{ background: "var(--brand)", color: "var(--surface)" }}
                onClick={() => setMenuOpen(false)}
              >
                <MessageCircle className="w-4 h-4" />
                Falar com a Lia
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 lg:px-8 pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{
                  border: "0.5px solid var(--brand-border)",
                  background: "var(--brand-subtle)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--brand)" }}
                />
                <span className="text-xs font-medium" style={{ color: "var(--brand)" }}>
                  Agentes de IA para operações reais
                </span>
              </div>

              <h1
                className="text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                Sua operação, comandada por agentes que agem.
              </h1>

              <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no que
                realmente importa.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-opacity duration-150 hover:opacity-90"
                  style={{ background: "var(--brand)", color: "var(--surface)" }}
                >
                  <WhatsAppIcon />
                  Falar com a Lia
                </a>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-150"
                  style={{
                    border: "0.5px solid var(--surface-border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Ver como funciona
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <AgentFeed />
          </div>

          {/* 4-step flow */}
          <div
            className="mt-16 rounded-xl overflow-hidden"
            style={{ border: "0.5px solid var(--surface-border)", background: "var(--surface-card)" }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Search, label: "Diagnóstico" },
                { icon: FileText, label: "Especificação" },
                { icon: Wrench, label: "Produção", highlight: true },
                { icon: GraduationCap, label: "Autonomia" },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 p-5 relative"
                    style={
                      step.highlight
                        ? {
                            background: "var(--brand-subtle)",
                            borderLeft: "0.5px solid var(--brand-border)",
                            borderRight: "0.5px solid var(--brand-border)",
                          }
                        : i > 0
                        ? { borderLeft: "0.5px solid var(--surface-border)" }
                        : {}
                    }
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: step.highlight ? "var(--brand)" : "var(--text-muted)" }}
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: step.highlight ? "var(--brand)" : "var(--text-secondary)" }}
                    >
                      {step.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Problema */}
        <section style={{ borderTop: "0.5px solid var(--surface-border)" }}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--brand)" }}
            >
              O problema
            </p>
            <h2
              className="text-3xl font-medium tracking-tight mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              A maioria das empresas tenta adotar IA e falha.
            </h2>
            <p className="max-w-2xl mb-12" style={{ color: "var(--text-secondary)" }}>
              Não por falta de tecnologia. Por falta de método. Automatizar o processo errado é pior do que
              não automatizar nada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  problem: "Automações que quebram",
                  solution: "Spec antes de build",
                  desc: "O que for construído é exatamente o que foi acordado.",
                },
                {
                  problem: "Bots que não escalam",
                  solution: "Arquitetura real",
                  desc: "Agentes com estrutura para crescer junto com o negócio.",
                },
                {
                  problem: "Dependência técnica permanente",
                  solution: "Você opera com autonomia",
                  desc: "Transferimos o controle após a entrega.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ border: "0.5px solid var(--surface-border)", background: "var(--surface-card)" }}
                >
                  <div
                    className="px-5 py-4"
                    style={{ borderBottom: "0.5px solid var(--surface-border)" }}
                  >
                    <p className="text-sm" style={{ color: "#f87171" }}>
                      {card.problem}
                    </p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm font-medium mb-2" style={{ color: "var(--brand)" }}>
                      {card.solution}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agentes */}
        <section id="como-funciona" style={{ borderTop: "0.5px solid var(--surface-border)" }}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--brand)" }}
            >
              O que entregamos
            </p>
            <h2
              className="text-3xl font-medium tracking-tight mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Agentes que agem de verdade.
            </h2>
            <p className="mb-12" style={{ color: "var(--text-secondary)" }}>
              Não entregamos bots de resposta automática.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Zap,
                  title: "Executam",
                  desc: "Respondem, decidem, encaminham e registram sem intervenção humana constante.",
                },
                {
                  icon: Clock,
                  title: "Operam 24/7",
                  desc: "Sem pausa, sem limite de horário. Sua operação não para.",
                },
                {
                  icon: TrendingUp,
                  title: "Escalam",
                  desc: "Mais volume sem mais equipe. O agente cresce com a demanda.",
                },
                {
                  icon: BarChart3,
                  title: "Reportam",
                  desc: "Você acompanha o que cada agente faz e por que. Sem caixa preta.",
                },
              ].map((card, i) => {
                const Icon = card.icon
                return (
                  <div
                    key={i}
                    className="rounded-xl p-5"
                    style={{ border: "0.5px solid var(--surface-border)", background: "var(--surface-card)" }}
                  >
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center mb-4"
                      style={{
                        background: "var(--brand-subtle)",
                        border: "0.5px solid var(--brand-border)",
                      }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "var(--brand)" }} />
                    </div>
                    <h3 className="font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                      {card.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {card.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Método */}
        <section style={{ borderTop: "0.5px solid var(--surface-border)" }}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--brand)" }}
            >
              O método
            </p>
            <h2
              className="text-3xl font-medium tracking-tight mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Do diagnóstico ao primeiro agente em 30 dias.
            </h2>
            <p className="mb-12" style={{ color: "var(--text-secondary)" }}>
              Um processo claro do início ao fim. Sem surpresas.
            </p>

            <div
              className="rounded-xl overflow-hidden"
              style={{ border: "0.5px solid var(--surface-border)", background: "var(--surface-card)" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-4">
                {[
                  {
                    n: "01",
                    title: "Diagnóstico",
                    desc: "Mapeamos onde está o gargalo real e o que pode ser delegado a um agente.",
                  },
                  {
                    n: "02",
                    title: "Especificação",
                    desc: "Cada agente tem um documento aprovado por você antes de qualquer implementação.",
                  },
                  {
                    n: "03",
                    title: "Produção",
                    desc: "Primeiros resultados mensuráveis em semanas, não em meses.",
                  },
                  {
                    n: "04",
                    title: "Autonomia",
                    desc: "Sua equipe aprende a monitorar, ajustar e evoluir. Sem dependência técnica.",
                  },
                ].map((step, i) => (
                  <div
                    key={step.n}
                    className={`p-6${i > 0 ? " border-t md:border-t-0 md:border-l" : ""}`}
                    style={{ borderColor: "var(--surface-border)" }}
                  >
                    <p className="text-2xl font-medium mb-3" style={{ color: "var(--brand)" }}>
                      {step.n}
                    </p>
                    <h3 className="font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                      {step.title}
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Para quem */}
        <section id="para-quem" style={{ borderTop: "0.5px solid var(--surface-border)" }}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
            <p
              className="text-xs font-medium uppercase tracking-widest mb-4"
              style={{ color: "var(--brand)" }}
            >
              Para quem
            </p>
            <h2
              className="text-3xl font-medium tracking-tight mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Para quem é a Fluintech.
            </h2>
            <p className="mb-12" style={{ color: "var(--text-secondary)" }}>
              Não somos para todo mundo. Somos para quem quer resultado real.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Startups",
                  tag: "Crescendo rápido, equipe enxuta",
                  desc: "Escale operação sem escalar headcount. Agentes fazem o trabalho repetitivo para que seu time foque no que importa.",
                },
                {
                  title: "Pequenas e médias empresas",
                  tag: "Processos manuais que não deveriam ser",
                  desc: "Atendimento, agendamento, follow-up, triagem. Tudo que consome energia mas não precisa de decisão humana.",
                },
                {
                  title: "Quem já tentou",
                  tag: "IA que não entregou o prometido",
                  desc: "Automações que quebraram, bots que não escalaram. A diferença está no método que vem antes.",
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="rounded-xl p-5"
                  style={{ border: "0.5px solid var(--surface-border)", background: "var(--surface-card)" }}
                >
                  <h3 className="font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                    {card.title}
                  </h3>
                  <p
                    className="text-xs font-medium uppercase tracking-widest mb-3"
                    style={{ color: "var(--brand)" }}
                  >
                    {card.tag}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section
          style={{
            borderTop: "0.5px solid var(--surface-border)",
            background: "var(--surface-card)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20 text-center">
            <h2
              className="text-3xl md:text-4xl font-medium tracking-tight mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              30 minutos. Diagnóstico real.
            </h2>
            <p className="max-w-xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
              Mapeamos os processos da sua operação e mostramos onde agentes geram mais impacto. Sem pitch
              de venda. Sem compromisso.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-opacity duration-150 hover:opacity-90"
              style={{ background: "var(--brand)", color: "var(--surface)" }}
            >
              <MessageCircle className="w-4 h-4" />
              Falar com a Lia no WhatsApp
            </a>
            <p className="mt-4 text-sm" style={{ color: "var(--text-muted)" }}>
              Resposta em minutos · 24/7
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
