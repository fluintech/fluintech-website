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

function Item({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: "var(--brand)" }} />
      <span>
        {label && (
          <span className="font-medium" style={{ color: "var(--text-primary)" }}>
            {label}:{" "}
          </span>
        )}
        {children}
      </span>
    </li>
  )
}

export default function PoliticaPrivacidade() {
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
            Política de Privacidade
          </h1>
        </div>

        <div
          className="rounded-xl p-8 lg:p-10"
          style={{ border: "1px solid var(--surface-border)", background: "var(--surface-card)" }}
        >
          <div className="space-y-8">
            <Section title="1. Dados Coletados">
              <p>Coletamos as seguintes categorias de dados pessoais:</p>
              <ul className="space-y-2.5">
                <Item label="Dados de identificação">nome, e-mail, telefone, empresa</Item>
                <Item label="Dados de uso">logs de acesso, interações com a plataforma, preferências</Item>
                <Item label="Dados técnicos">endereço IP, tipo de navegador, sistema operacional</Item>
                <Item label="Dados de comunicação">mensagens trocadas através dos chatbots e sistema</Item>
              </ul>
            </Section>

            <div style={{ borderTop: "1px solid var(--surface-border)" }} className="pt-8">
              <Section title="2. Finalidade do Uso dos Dados">
                <p>Utilizamos seus dados pessoais para as seguintes finalidades:</p>
                <ul className="space-y-2.5">
                  <Item>Prestação dos serviços de automação e IA</Item>
                  <Item>Melhoria contínua dos algoritmos e funcionalidades</Item>
                  <Item>Suporte técnico e atendimento ao cliente</Item>
                  <Item>Comunicação sobre atualizações e novos recursos</Item>
                  <Item>Análises estatísticas e relatórios de desempenho</Item>
                  <Item>Cumprimento de obrigações legais e regulamentares</Item>
                </ul>
              </Section>
            </div>

            <div style={{ borderTop: "1px solid var(--surface-border)" }} className="pt-8">
              <Section title="3. Compartilhamento com Terceiros">
                <p>Seus dados podem ser compartilhados nas seguintes situações:</p>
                <ul className="space-y-2.5">
                  <Item label="Provedores de serviços">
                    empresas que nos auxiliam na prestação dos serviços (hospedagem, analytics)
                  </Item>
                  <Item label="Obrigações legais">quando exigido por lei ou ordem judicial</Item>
                  <Item label="Proteção de direitos">
                    para proteger nossos direitos, propriedade ou segurança
                  </Item>
                </ul>
                <p>
                  Não vendemos, alugamos ou comercializamos seus dados pessoais com terceiros para fins
                  de marketing.
                </p>
              </Section>
            </div>

            <div style={{ borderTop: "1px solid var(--surface-border)" }} className="pt-8">
              <Section title="4. Direitos do Usuário (LGPD)">
                <p>Conforme a Lei Geral de Proteção de Dados (LGPD), voce possui os seguintes direitos:</p>
                <ul className="space-y-2.5">
                  <Item label="Acesso">solicitar informações sobre o tratamento de seus dados</Item>
                  <Item label="Correção">solicitar a correção de dados incompletos ou inexatos</Item>
                  <Item label="Exclusão">
                    solicitar a eliminação de dados desnecessários ou tratados em desconformidade
                  </Item>
                  <Item label="Portabilidade">solicitar a transferência de dados para outro fornecedor</Item>
                  <Item label="Oposição">opor-se ao tratamento de dados em determinadas situações</Item>
                  <Item label="Revogação">revogar o consentimento a qualquer momento</Item>
                </ul>
              </Section>
            </div>

            <div style={{ borderTop: "1px solid var(--surface-border)" }} className="pt-8">
              <Section title="5. Segurança dos Dados">
                <p>
                  Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados
                  pessoais:
                </p>
                <ul className="space-y-2.5">
                  <Item>Criptografia de dados em trânsito e em repouso</Item>
                  <Item>Controles de acesso rigorosos e autenticação multifator</Item>
                  <Item>Monitoramento contínuo de segurança e detecção de ameaças</Item>
                  <Item>Backups regulares e planos de recuperação de desastres</Item>
                  <Item>Treinamento regular da equipe sobre proteção de dados</Item>
                </ul>
              </Section>
            </div>

            <div style={{ borderTop: "1px solid var(--surface-border)" }} className="pt-8">
              <Section title="6. Contato">
                <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política:</p>
                <div
                  className="mt-4 rounded-lg p-5 space-y-2 font-mono text-xs"
                  style={{
                    border: "1px solid var(--surface-border)",
                    background: "var(--surface)",
                    color: "var(--text-muted)",
                  }}
                >
                  <p>
                    <span style={{ color: "var(--text-secondary)" }}>E-mail</span>
                    {"  "}
                    <a
                      href="mailto:privacidade@fluintech.com.br"
                      className="transition-colors duration-150 hover:text-[--brand]"
                      style={{ color: "var(--brand)" }}
                    >
                      privacidade@fluintech.com.br
                    </a>
                  </p>
                  <p>
                    <span style={{ color: "var(--text-secondary)" }}>Telefone</span>
                    {"  "}+55 (44) 3101-0224
                  </p>
                  <p>
                    <span style={{ color: "var(--text-secondary)" }}>Endereco</span>
                    {"  "}Maringa, PR — Brasil
                  </p>
                </div>
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
            <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
              Esta política pode ser atualizada periodicamente.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
