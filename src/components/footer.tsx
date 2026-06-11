import { Youtube, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer
      className="border-t py-12"
      style={{ borderColor: "var(--surface-border)", background: "var(--surface-card)" }}
    >
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
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
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.youtube.com/@fluintech"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube da Fluintech"
              className="w-9 h-9 rounded-md flex items-center justify-center border transition-colors duration-150 hover:border-[--brand-border]"
              style={{ borderColor: "var(--surface-border)", color: "var(--text-muted)" }}
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/fluintech"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Fluintech"
              className="w-9 h-9 rounded-md flex items-center justify-center border transition-colors duration-150 hover:border-[--brand-border]"
              style={{ borderColor: "var(--surface-border)", color: "var(--text-muted)" }}
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61578914720363"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook da Fluintech"
              className="w-9 h-9 rounded-md flex items-center justify-center border transition-colors duration-150 hover:border-[--brand-border]"
              style={{ borderColor: "var(--surface-border)", color: "var(--text-muted)" }}
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              &copy; {new Date().getFullYear()} Fluintech. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/termos"
                className="text-xs transition-colors duration-150 hover:text-[--brand]"
                style={{ color: "var(--text-muted)" }}
              >
                Termos de Uso
              </a>
              <span style={{ color: "var(--text-muted)" }}>·</span>
              <a
                href="/privacidade"
                className="text-xs transition-colors duration-150 hover:text-[--brand]"
                style={{ color: "var(--text-muted)" }}
              >
                Privacidade
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
