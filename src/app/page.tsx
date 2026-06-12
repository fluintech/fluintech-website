"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
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
  Shield,
  Cpu,
  UserCheck,
  Gauge,
} from "lucide-react"

const WHATSAPP_URL =
  "https://wa.me/554431010224?text=Ol%C3%A1!+Quero+entender+como+a+Fluintech+pode+ajudar+minha+empresa."

const MARQUEE_TERMS = [
  "Tools",
  "MCPs",
  "Skills",
  "Rules",
  "Prompt Engineering",
  "Context Engineering",
  "Spec-Driven Development",
  "Harness Engineering",
  "Human in the Loop",
  "Mission Control",
  "Evals",
  "Guardrails",
]

type FeedEvent = { text: string; kind: "info" | "ok" | "human" | "sec" }

const MISSION_FEEDS: Record<string, FeedEvent[]> = {
  "qualificacao-leads": [
    { text: "Lead recebido via WhatsApp", kind: "info" },
    { text: "Consultando CRM via MCP...", kind: "info" },
    { text: "Contato criado e enriquecido", kind: "ok" },
    { text: "Guardrail: dados sensíveis mascarados", kind: "sec" },
    { text: "Score de intenção calculado", kind: "info" },
    { text: "Encaminhado ao comercial ✓", kind: "ok" },
  ],
  "suporte-tecnico": [
    { text: "Ticket aberto automaticamente", kind: "info" },
    { text: "Buscando contexto na base de conhecimento...", kind: "info" },
    { text: "Solução proposta ao cliente", kind: "info" },
    { text: "Aprovação humana solicitada", kind: "human" },
    { text: "Humano aprovou · executando", kind: "human" },
    { text: "Ticket resolvido e registrado ✓", kind: "ok" },
  ],
  "operacao-agenda": [
    { text: "Solicitação de agendamento recebida", kind: "info" },
    { text: "Verificando disponibilidade no calendário...", kind: "info" },
    { text: "Conflito detectado · propondo alternativa", kind: "info" },
    { text: "Cliente confirmou novo horário", kind: "ok" },
    { text: "Auditoria: ação registrada no log", kind: "sec" },
    { text: "Lembrete programado ✓", kind: "ok" },
  ],
}

const AGENT_CONFIG = [
  { id: "qualificacao", name: "Qualificação", tools: ["CRM", "WhatsApp"], tasksActive: 3 },
  { id: "suporte", name: "Suporte", tools: ["Base KB", "Tickets"], tasksActive: 7 },
  { id: "agenda", name: "Agenda", tools: ["Calendário", "CRM"], tasksActive: 2 },
]

const LIVE_AGENT_EVENTS: { agent: string; text: string; kind: FeedEvent["kind"] }[] = [
  { agent: "Qualificação", text: "Lead #347 qualificado → comercial", kind: "ok" },
  { agent: "Orquestrador", text: "Roteando ticket #112 para Suporte", kind: "info" },
  { agent: "Suporte", text: "Aguardando aprovação humana", kind: "human" },
  { agent: "Orquestrador", text: "Guardrail: dados mascarados", kind: "sec" },
  { agent: "Agenda", text: "Conflito resolvido · horário confirmado", kind: "ok" },
  { agent: "Suporte", text: "Ticket #112 resolvido ✓", kind: "ok" },
]

function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
    </svg>
  )
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("revealed")
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

function StreamText({
  text,
  delay = 0,
  onDone,
}: {
  text: string
  delay?: number
  onDone?: () => void
}) {
  const [displayed, setDisplayed] = useState("")
  const [cursor, setCursor] = useState(false)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(text)
      onDoneRef.current?.()
      return
    }

    let id: ReturnType<typeof setTimeout>

    id = setTimeout(() => {
      setCursor(true)
      id = setTimeout(() => {
        let i = 0
        const tick = () => {
          i++
          setDisplayed(text.slice(0, i))
          if (i < text.length) {
            id = setTimeout(tick, 28 + Math.random() * 18)
          } else {
            id = setTimeout(() => {
              setCursor(false)
              onDoneRef.current?.()
            }, 320)
          }
        }
        tick()
      }, 340)
    }, delay)

    return () => clearTimeout(id)
  }, [text, delay])

  return (
    <span aria-label={text}>
      {displayed}
      {cursor && (
        <span
          className="inline-block w-[2px] h-[0.82em] ml-px animate-caret"
          style={{ background: "currentColor", verticalAlign: "middle" }}
          aria-hidden="true"
        />
      )}
    </span>
  )
}
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId: number
    let width = 0
    let height = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const COUNT = width < 640 ? 28 : 52
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.5,
    }))

    const LINK_DIST = 130

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.22
            ctx.strokeStyle = `rgba(0, 217, 146, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = "rgba(0, 217, 146, 0.55)"
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      style={{
        maskImage: "radial-gradient(ellipse 90% 80% at 50% 20%, black 30%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 20%, black 30%, transparent 75%)",
      }}
    />
  )
}

function eventColor(kind: FeedEvent["kind"]) {
  switch (kind) {
    case "ok":
      return "var(--brand)"
    case "human":
      return "var(--signal-amber)"
    case "sec":
      return "var(--text-muted)"
    default:
      return "var(--text-secondary)"
  }
}

function MissionControl() {
  const agents = Object.keys(MISSION_FEEDS)
  const [active, setActive] = useState(agents[0])
  const [lines, setLines] = useState<{ time: string; ev: FeedEvent }[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let idx = 0
    let timeoutId: ReturnType<typeof setTimeout>
    const feed = MISSION_FEEDS[active]
    setLines([])

    const addLine = () => {
      const now = new Date()
      const time = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
      setLines((prev) => [...prev.slice(-6), { time, ev: feed[idx] }])
      idx = (idx + 1) % feed.length
      timeoutId = setTimeout(addLine, 900 + Math.random() * 900)
    }

    timeoutId = setTimeout(addLine, 300)
    return () => clearTimeout(timeoutId)
  }, [active])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines])

  return (
    <div
      className="relative rounded-lg overflow-hidden beam-edge scanline-overlay"
      style={{
        border: "1px solid var(--surface-border)",
        background: "var(--surface-card)",
        boxShadow: "0 32px 80px -40px var(--brand-glow)",
      }}
    >
      <div
        className="flex items-center gap-1 px-3 py-2 overflow-x-auto"
        style={{ borderBottom: "1px solid var(--surface-border)" }}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest mr-2 shrink-0" style={{ color: "var(--text-muted)" }}>
          missão
        </span>
        {agents.map((a) => (
          <button
            key={a}
            onClick={() => setActive(a)}
            className="font-mono text-xs px-2.5 py-1 rounded transition-colors duration-150 shrink-0"
            style={
              active === a
                ? { background: "var(--brand-subtle)", color: "var(--brand)", border: "1px solid var(--brand-border)" }
                : { color: "var(--text-muted)", border: "1px solid transparent" }
            }
          >
            {a}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-1.5 shrink-0 pl-2">
          <span className="relative inline-flex w-2 h-2 rounded-full pulse-ring" style={{ background: "var(--brand)" }} />
          <span className="font-mono text-xs" style={{ color: "var(--brand)" }}>
            live
          </span>
        </div>
      </div>

      <div ref={containerRef} className="h-56 overflow-hidden p-4 space-y-2.5 font-mono text-[13px]">
        {lines.map((l, i) => (
          <div key={`${active}-${i}`} className="flex gap-3 animate-fade-in items-baseline">
            <span className="shrink-0" style={{ color: "var(--text-muted)" }}>
              {l.time}
            </span>
            {l.ev.kind === "human" && (
              <UserCheck className="w-3.5 h-3.5 shrink-0 self-center" style={{ color: "var(--signal-amber)" }} />
            )}
            {l.ev.kind === "sec" && (
              <Shield className="w-3.5 h-3.5 shrink-0 self-center" style={{ color: "var(--text-muted)" }} />
            )}
            <span style={{ color: eventColor(l.ev.kind) }}>{l.ev.text}</span>
          </div>
        ))}
        <div className="flex gap-3">
          <span className="shrink-0 opacity-0">00:00:00</span>
          <span className="inline-block w-2 h-4 animate-caret" style={{ background: "var(--brand)" }} />
        </div>
      </div>

      <div
        className="flex items-center justify-between px-4 py-2 font-mono text-[11px]"
        style={{ borderTop: "1px solid var(--surface-border)", color: "var(--text-muted)" }}
      >
        <span>guardrails ativos</span>
        <span className="flex items-center gap-1.5">
          <UserCheck className="w-3 h-3" style={{ color: "var(--signal-amber)" }} />
          human in the loop
        </span>
        <span>auditoria completa</span>
      </div>
    </div>
  )
}

function AgentDashboard() {
  const [events, setEvents] = useState<Array<{ agent: string; text: string; kind: FeedEvent["kind"]; id: number }>>([])
  const idRef = useRef(0)

  useEffect(() => {
    let idx = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const addEvent = () => {
      const ev = LIVE_AGENT_EVENTS[idx % LIVE_AGENT_EVENTS.length]
      idx++
      setEvents((prev) => [...prev.slice(-3), { ...ev, id: idRef.current++ }])
      timeoutId = setTimeout(addEvent, 1400 + Math.random() * 1200)
    }

    timeoutId = setTimeout(addEvent, 600)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--surface-border)", background: "var(--surface-card)" }}
    >
      {/* Header */}
      <div
        className="flex items-center px-4 py-2.5"
        style={{ borderBottom: "1px solid var(--surface-border)" }}
      >
        <span className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
          sistema de agentes
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="relative inline-flex w-1.5 h-1.5">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
              style={{ background: "var(--brand)" }}
            />
            <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand)" }} />
          </span>
          <span className="font-mono text-xs" style={{ color: "var(--brand)" }}>
            3 online
          </span>
        </div>
      </div>

      {/* Orchestrator */}
      <div className="flex justify-center px-4 pt-4 pb-2">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-md"
          style={{ background: "var(--brand-subtle)", border: "1px solid var(--brand-border)" }}
        >
          <Cpu className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} />
          <span className="font-mono text-xs font-medium" style={{ color: "var(--brand)" }}>
            Orquestrador
          </span>
        </div>
      </div>

      {/* Tree connector */}
      <div className="flex justify-center">
        <div className="w-px h-3" style={{ background: "var(--surface-border)" }} />
      </div>
      <div className="mx-4 h-px" style={{ background: "var(--surface-border)" }} />

      {/* Agent cards */}
      <div className="grid grid-cols-3 gap-2 px-4 pb-4 pt-0">
        {AGENT_CONFIG.map((agent) => (
          <div key={agent.id} className="flex flex-col items-center">
            <div className="w-px h-3" style={{ background: "var(--surface-border)" }} />
            <div
              className="w-full rounded-md p-2.5 flex flex-col gap-1.5"
              style={{ background: "var(--surface)", border: "1px solid var(--surface-border)" }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] font-medium leading-tight" style={{ color: "var(--text-primary)" }}>
                  {agent.name}
                </span>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "var(--brand)" }} />
              </div>
              <span className="font-mono text-[10px]" style={{ color: "var(--text-muted)" }}>
                {agent.tasksActive} ativas
              </span>
              <div className="flex flex-wrap gap-0.5">
                {agent.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[9px] px-1 py-px rounded"
                    style={{ background: "var(--surface-border)", color: "var(--text-muted)" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live feed */}
      <div
        className="px-4 pt-3 pb-3 min-h-[76px]"
        style={{ borderTop: "1px solid var(--surface-border)" }}
      >
        <div className="space-y-1.5 font-mono text-[11px]">
          {events.map((ev) => (
            <div key={ev.id} className="flex items-start gap-1.5 animate-fade-in">
              <span className="shrink-0" style={{ color: "var(--text-muted)" }}>
                {ev.agent}
              </span>
              <span style={{ color: "var(--surface-border)" }}>·</span>
              <span style={{ color: eventColor(ev.kind) }}>{ev.text}</span>
            </div>
          ))}
          {events.length === 0 && (
            <span className="inline-block w-1.5 h-3.5 animate-caret" style={{ background: "var(--brand)" }} />
          )}
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-4 py-2 font-mono text-[10px]"
        style={{ borderTop: "1px solid var(--surface-border)", color: "var(--text-muted)" }}
      >
        <span className="flex items-center gap-1">
          <UserCheck className="w-3 h-3" style={{ color: "var(--signal-amber)" }} />
          human in the loop
        </span>
        <span>guardrails</span>
        <span>auditoria</span>
      </div>
    </div>
  )
}

function Marquee() {
  const items = [...MARQUEE_TERMS, ...MARQUEE_TERMS]
  return (
    <div
      className="relative overflow-hidden py-4"
      style={{
        borderTop: "1px solid var(--surface-border)",
        borderBottom: "1px solid var(--surface-border)",
      }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, var(--surface), transparent)" }}
      />
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, var(--surface), transparent)" }}
      />
      <div className="flex w-max animate-marquee gap-10">
        {items.map((term, i) => (
          <span key={i} className="flex items-center gap-10 font-mono text-sm" style={{ color: "var(--text-muted)" }}>
            {term}
            <span style={{ color: "var(--brand)" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function FluintechHome() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [line2Ready, setLine2Ready] = useState(false)
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
          borderBottom: scrolled ? "1px solid var(--surface-border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          background: scrolled ? "color-mix(in srgb, var(--surface) 88%, transparent)" : "transparent",
        }}
      >
        <nav className="max-w-6xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div
              className="relative w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "var(--brand-subtle)", border: "1px solid var(--brand-border)" }}
              aria-hidden="true"
            >
              <Zap className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} />
            </div>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>
              Fluintech
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#engenharia"
              className="text-sm transition-colors duration-150 hover:text-[--text-primary]"
              style={{ color: "var(--text-secondary)" }}
            >
              Engenharia
            </a>
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
              href="/blog"
              className="text-sm transition-colors duration-150 hover:text-[--text-primary]"
              style={{ color: "var(--text-secondary)" }}
            >
              Blog
            </a>
          </div>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-150 hover:opacity-90 hover:scale-[1.03]"
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
          <div style={{ borderTop: "1px solid var(--surface-border)", background: "var(--surface-card)" }}>
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
              <a
                href="#engenharia"
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMenuOpen(false)}
              >
                Engenharia
              </a>
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
                href="/blog"
                className="text-sm"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMenuOpen(false)}
              >
                Blog
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Implementação de Agentes de IA",
            description:
              "Implementamos agentes de IA com arquitetura completa: ferramentas conectadas via MCP, skills especializadas, guardrails e specs aprovadas antes de qualquer linha de código.",
            provider: { "@type": "Organization", name: "Fluintech", url: "https://www.fluintech.com.br" },
            serviceType: "Inteligência Artificial e Automação",
            areaServed: { "@type": "Country", name: "Brasil" },
            inLanguage: "pt-BR",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "O que a Fluintech faz?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Implementamos agentes de IA que executam o trabalho operacional da sua empresa: respondem, decidem, encaminham e registram sem intervenção humana constante. Operamos com método próprio, do diagnóstico ao primeiro agente em 30 dias.",
                },
              },
              {
                "@type": "Question",
                name: "Qual a diferença entre um agente de IA e um chatbot?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Chatbots respondem perguntas. Agentes executam tarefas completas: consultam sistemas via MCP, tomam decisões, registram resultados e escalam com o volume da operação. A Fluintech não entrega bots de resposta automática.",
                },
              },
              {
                "@type": "Question",
                name: "Quanto tempo leva para ter o primeiro agente funcionando?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Do primeiro diagnóstico ao primeiro agente operacional em 30 dias. O processo passa por quatro etapas: diagnóstico, especificação aprovada, produção com resultados mensuráveis e transferência de autonomia para sua equipe.",
                },
              },
              {
                "@type": "Question",
                name: "Para quem é a Fluintech?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Atendemos startups que precisam escalar operação sem aumentar headcount, pequenas e médias empresas com processos manuais repetitivos, e empresas que já tentaram adotar IA mas não obtiveram resultado real.",
                },
              },
              {
                "@type": "Question",
                name: "O que é Spec-Driven Development?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "É o método da Fluintech: cada agente tem um documento de especificação aprovado por você antes de qualquer linha de código ser escrita. O que for acordado na spec é exatamente o que será construído.",
                },
              },
            ],
          }),
        }}
      />

      <main>
        {/* Hero */}
        <section className="relative">
          <NeuralCanvas />
          <div className="relative max-w-6xl mx-auto px-4 lg:px-8 pt-32 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <Reveal>
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                    style={{
                      border: "1px solid var(--brand-border)",
                      background: "var(--brand-subtle)",
                    }}
                  >
                    <span className="relative w-1.5 h-1.5 rounded-full pulse-ring" style={{ background: "var(--brand)" }} />
                    <span className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--brand)" }}>
                      Agentes de IA para operações reais
                    </span>
                  </div>
                </Reveal>

                <h1
                  className="text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  <StreamText text="Sua operação, comandada" delay={300} onDone={() => setLine2Ready(true)} />
                  <br />
                  <span style={{ color: "var(--brand)" }}>
                    {line2Ready ? <StreamText text="por agentes que agem." /> : " "}
                  </span>
                </h1>

                <Reveal delay={300}>
                  <p className="text-lg leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
                    Implementamos agentes de IA que executam o trabalho pesado para que sua equipe foque no
                    que realmente importa. Com engenharia de verdade por trás: specs, guardrails e você no
                    controle.
                  </p>
                </Reveal>

                <Reveal delay={400}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-all duration-150 hover:opacity-90 hover:scale-[1.03]"
                      style={{
                        background: "var(--brand)",
                        color: "var(--surface)",
                        boxShadow: "0 8px 32px -12px var(--brand-glow)",
                      }}
                    >
                      <WhatsAppIcon />
                      Falar com a Lia
                    </a>
                    <a
                      href="#como-funciona"
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 hover:border-[--brand-border]"
                      style={{
                        border: "1px solid var(--surface-border)",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Ver como funciona
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={350}>
                <MissionControl />
              </Reveal>
            </div>
          </div>
        </section>

        <Marquee />

        {/* Engenharia */}
        <section id="engenharia">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <p
                  className="font-mono text-xs font-medium uppercase tracking-widest mb-4"
                  style={{ color: "var(--brand)" }}
                >
                  A engenharia
                </p>
                <h2
                  className="text-3xl font-medium tracking-tight mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Agente sem engenharia é só um chatbot caro.
                </h2>
                <p className="mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Cada agente que entregamos opera dentro de uma arquitetura completa: ferramentas
                  conectadas via MCP, skills especializadas, regras de negócio explícitas e specs aprovadas
                  antes de qualquer linha de código. Prompt e contexto são disciplinas de engenharia aqui,
                  não tentativa e erro.
                </p>
                <ul className="space-y-3">
                  {[
                    { icon: Shield, text: "Guardrails e auditoria em cada ação executada" },
                    { icon: UserCheck, text: "Human in the loop: decisões críticas passam por você" },
                    { icon: FileText, text: "Spec-Driven Development: o acordado é o construído" },
                    { icon: Gauge, text: "Evals contínuos de qualidade e performance" },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <li key={i} className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0" style={{ color: "var(--brand)" }} />
                        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
                          {item.text}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </Reveal>

              <Reveal delay={200}>
                <AgentDashboard />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Problema */}
        <section style={{ borderTop: "1px solid var(--surface-border)" }}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
            <Reveal>
              <p
                className="font-mono text-xs font-medium uppercase tracking-widest mb-4"
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
                Não por falta de tecnologia. Por falta de método. Automatizar o processo errado é pior do
                que não automatizar nada.
              </p>
            </Reveal>

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
                <Reveal key={i} delay={i * 120}>
                  <div
                    className="rounded-lg overflow-hidden card-interactive h-full"
                    style={{
                      border: "1px solid var(--surface-border)",
                      background: "var(--surface-card)",
                    }}
                  >
                    <div className="px-5 py-4" style={{ borderBottom: "1px solid var(--surface-border)" }}>
                      <p
                        className="font-mono text-sm line-through decoration-1"
                        style={{ color: "var(--signal-red)" }}
                      >
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Agentes */}
        <section id="como-funciona" style={{ borderTop: "1px solid var(--surface-border)" }}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
            <Reveal>
              <p
                className="font-mono text-xs font-medium uppercase tracking-widest mb-4"
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
            </Reveal>

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
                  <Reveal key={i} delay={(i % 2) * 120}>
                    <div
                      className="rounded-lg p-5 card-interactive h-full"
                      style={{
                        border: "1px solid var(--surface-border)",
                        background: "var(--surface-card)",
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center mb-4"
                        style={{
                          background: "var(--brand-subtle)",
                          border: "1px solid var(--brand-border)",
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
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Método */}
        <section style={{ borderTop: "1px solid var(--surface-border)" }}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
            <Reveal>
              <p
                className="font-mono text-xs font-medium uppercase tracking-widest mb-4"
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
            </Reveal>

            <Reveal delay={150}>
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: "1px solid var(--surface-border)", background: "var(--surface-card)" }}
              >
                <div className="grid grid-cols-1 md:grid-cols-4">
                  {[
                    {
                      n: "01",
                      icon: Search,
                      title: "Diagnóstico",
                      desc: "Mapeamos onde está o gargalo real e o que pode ser delegado a um agente.",
                    },
                    {
                      n: "02",
                      icon: FileText,
                      title: "Especificação",
                      desc: "Cada agente tem um documento aprovado por você antes de qualquer implementação.",
                    },
                    {
                      n: "03",
                      icon: Wrench,
                      title: "Produção",
                      desc: "Primeiros resultados mensuráveis em semanas, não em meses.",
                    },
                    {
                      n: "04",
                      icon: GraduationCap,
                      title: "Autonomia",
                      desc: "Sua equipe aprende a monitorar, ajustar e evoluir. Sem dependência técnica.",
                    },
                  ].map((step, i) => (
                    <div
                      key={step.n}
                      className={`p-6 group transition-colors duration-300 hover:bg-[--brand-subtle]${i > 0 ? " border-t md:border-t-0 md:border-l" : ""}`}
                      style={{ borderColor: "var(--surface-border)" }}
                    >
                      <p
                        className="font-mono text-2xl font-medium mb-3 transition-transform duration-300 group-hover:-translate-y-1"
                        style={{ color: "var(--brand)" }}
                      >
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
            </Reveal>
          </div>
        </section>

        {/* Para quem */}
        <section id="para-quem" style={{ borderTop: "1px solid var(--surface-border)" }}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-20">
            <Reveal>
              <p
                className="font-mono text-xs font-medium uppercase tracking-widest mb-4"
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
            </Reveal>

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
                <Reveal key={i} delay={i * 120}>
                  <div
                    className="rounded-lg p-5 card-interactive h-full"
                    style={{
                      border: "1px solid var(--surface-border)",
                      background: "var(--surface-card)",
                    }}
                  >
                    <h3 className="font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                      {card.title}
                    </h3>
                    <p
                      className="font-mono text-xs font-medium uppercase tracking-widest mb-3"
                      style={{ color: "var(--brand)" }}
                    >
                      {card.tag}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {card.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section
          className="relative overflow-hidden"
          style={{
            borderTop: "1px solid var(--surface-border)",
            background: "var(--surface-card)",
          }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-40 w-[640px] h-[320px] rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              background: "radial-gradient(circle, var(--brand-glow) 0%, transparent 65%)",
              filter: "blur(48px)",
            }}
          />
          <div className="relative max-w-6xl mx-auto px-4 lg:px-8 py-20 text-center">
            <Reveal>
              <p
                className="font-mono text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--brand)" }}
              >
                Inicie a missão
              </p>
              <h2
                className="text-3xl md:text-4xl font-medium tracking-tight mb-4"
                style={{ color: "var(--text-primary)" }}
              >
                30 minutos. Diagnóstico real.
              </h2>
              <p className="max-w-xl mx-auto mb-8" style={{ color: "var(--text-secondary)" }}>
                Mapeamos os processos da sua operação e mostramos onde agentes geram mais impacto. Sem
                pitch de venda. Sem compromisso.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md text-sm font-medium transition-all duration-150 hover:opacity-90 hover:scale-[1.03]"
                style={{
                  background: "var(--brand)",
                  color: "var(--surface)",
                  boxShadow: "0 12px 40px -16px var(--brand-glow)",
                }}
              >
                <MessageCircle className="w-4 h-4" />
                Falar com a Lia no WhatsApp
              </a>
              <p className="mt-4 font-mono text-sm" style={{ color: "var(--text-muted)" }}>
                Resposta em minutos · 24/7
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
