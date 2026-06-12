import Link from "next/link"
import { ArrowLeft, Zap } from "lucide-react"
import { Footer } from "@/components/footer"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-medium mb-4" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>
      <div className="space-y-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
        {children}
      </div>
    </section>
  )
}

function Item({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--brand)" }} />
      <span>{children}</span>
    </li>
  )
}

export default function TermosDeUso() {
  return (
    <div className="min-h-screen" style={{ background: "var(--surface)" }}>
      <header
        className="sticky top-0 z-50"
        style={{
          borderBottom: "1px solid var(--surface-border)",
          background: "color-mix(in srgb, var(--surface) 88%, transparent)",
          backdropFilter: "blur(12px)",
        }}
      >
        <nav className="max-w-4xl mx-auto px-4 lg:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center"
              style={{ background: "var(--brand-subtle)", border: "1px solid var(--brand-border)" }}
              aria-hidden="true"
            >
              <Zap className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} />
            </div>
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>
              Fluintech
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm transition-colors duration-150 hover:text-[--brand]"
            style={{ color: "var(--text-secondary)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </nav>
      </header>

      <main className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        <div className="mb-10">
          <p
            className="font-mono text-xs font-medium uppercase tracking-widest mb-3"
            style={{ color: "var(--brand)" }}
          >
            Jurídico
          </p>
          <h1 className="text-3xl font-medium tracking-tight" style={{ color: "var(--text-primary)" }}>
            Termos de Uso
          </h1>
        </div>

        <div
          className="rounded-xl p-8 lg:p-10"
          style={{ border: "1px solid var(--surface-border)", background: "var(--surface-card)" }}
        >
          <div className="space-y-8 divide-y" style={{ "--tw-divide-opacity": "1" } as React.CSSProperties}>
            <Section title="1. Escopo dos Serviços">
              <p>
                A Fluintech oferece soluções de automação e inteligência artificial para atendimento ao
                cliente, incluindo chatbots, agendamentos automatizados e análises inteligentes.
              </p>
              <p>
                Nossos serviços são fornecidos através de plataforma web e integração via API, sujeitos
                aos termos e condições estabelecidos neste documento.
              </p>
            </Section>

            <div className="pt-8">
              <Section title="2. Responsabilidades do Usuário">
                <ul className="space-y-2.5">
                  <Item>Fornecer informações precisas e atualizadas durante o cadastro</Item>
                  <Item>Manter a confidencialidade das credenciais de acesso</Item>
                  <Item>Utilizar os serviços de acordo com as leis aplicáveis</Item>
                  <Item>Não utilizar os serviços para atividades ilegais ou prejudiciais</Item>
                  <Item>Respeitar os limites de uso estabelecidos no plano contratado</Item>
                </ul>
              </Section>
            </div>

            <div className="pt-8">
              <Section title="3. Propriedade Intelectual">
                <p>
                  Todos os direitos de propriedade intelectual relacionados aos serviços da Fluintech,
                  incluindo software, algoritmos, design e conteúdo, são de propriedade exclusiva da
                  empresa.
                </p>
                <p>
                  O usuário mantém os direitos sobre seus próprios dados e conteúdos, concedendo à
                  Fluintech licença limitada para processamento conforme necessário para prestação dos
                  serviços.
                </p>
              </Section>
            </div>

            <div className="pt-8">
              <Section title="4. Limitação de Responsabilidade">
                <p>
                  A Fluintech não se responsabiliza por danos indiretos, lucros cessantes ou perdas de
                  dados decorrentes do uso dos serviços.
                </p>
                <p>
                  Nossa responsabilidade está limitada ao valor pago pelos serviços no período de 12
                  meses anteriores ao evento que deu origem à reclamação.
                </p>
              </Section>
            </div>

            <div className="pt-8">
              <Section title="5. Vigência e Alterações">
                <p>
                  Estes termos entram em vigor na data de aceitação pelo usuário e permanecem válidos
                  durante todo o período de utilização dos serviços.
                </p>
                <p>
                  A Fluintech reserva-se o direito de alterar estes termos mediante notificação prévia
                  de 30 dias aos usuários.
                </p>
              </Section>
            </div>
          </div>

          <div
            className="mt-10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            style={{ borderTop: "1px solid var(--surface-border)" }}
          >
            <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              Última atualização: Janeiro de 2024
            </p>
            <a
              href="mailto:legal@fluintech.com.br"
              className="font-mono text-xs transition-colors duration-150 hover:text-[--brand]"
              style={{ color: "var(--text-muted)" }}
            >
              legal@fluintech.com.br
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
