import { Youtube, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Logo and Company Info */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Fluintech</h3>
              <p className="text-purple-200 text-sm">Automação Inteligente</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://www.youtube.com/@fluintech"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Youtube className="w-5 h-5 text-white group-hover:text-white" />
            </a>
            <a
              href="https://www.instagram.com/fluintech/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Instagram className="w-5 h-5 text-white group-hover:text-white" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61578914720363"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Facebook className="w-5 h-5 text-white group-hover:text-white" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-purple-200 text-sm">© 2024 Fluintech. Todos os direitos reservados.</p>
            <div className="flex items-center justify-center md:justify-end space-x-4 mt-2">
              <a
                href="/termos"
                className="text-white hover:text-purple-200 text-xs transition-colors bg-purple-800/50 px-2 py-1 rounded"
              >
                Termos de Uso
              </a>
              <span className="text-purple-400">•</span>
              <a
                href="/privacidade"
                className="text-white hover:text-purple-200 text-xs transition-colors bg-purple-800/50 px-2 py-1 rounded"
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
