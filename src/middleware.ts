// middleware.ts (na raiz do projeto)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting simples em memória (para produção, use Redis)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string, limit: number = 100, windowMs: number = 900000): boolean {
  const now = Date.now()
  const userLimit = rateLimit.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userLimit.count >= limit) {
    return false
  }

  userLimit.count++
  return true
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Headers de segurança
  const headers = new Headers(request.headers)
  
  // Proteção contra clickjacking
  headers.set('X-Frame-Options', 'DENY')
  
  // Proteção XSS
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-XSS-Protection', '1; mode=block')
  
  // Referrer Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://*.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://vercel.live https://*.vercel-scripts.com",
    "frame-ancestors 'none'",
  ].join('; ')
  
  headers.set('Content-Security-Policy', csp)

  // Rate limiting para sitemap e robots
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt') {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    
    if (!checkRateLimit(ip, 60, 60000)) { // 60 requisições por minuto
      return new NextResponse('Too Many Requests', { 
        status: 429,
        headers: {
          'Retry-After': '60'
        }
      })
    }
  }

  // Bloqueia acesso a rotas administrativas
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
    // Aqui você adicionaria sua lógica de autenticação
    // Por enquanto, apenas retorna 404 para ocultar a existência
    return NextResponse.rewrite(new URL('/404', request.url))
  }

  // Bloqueia acesso a arquivos sensíveis
  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.git',
    'package.json',
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    '.next',
  ]

  if (sensitiveFiles.some(file => pathname.includes(file))) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Permite a requisição continuar com headers de segurança
  return NextResponse.next({
    request: {
      headers,
    },
  })
}

// Configuração de rotas que o middleware deve processar
export const config = {
  matcher: [
    /*
     * Aplica a todas as rotas exceto:
     * - _next/static (arquivos estáticos)
     * - _next/image (otimização de imagens)
     * - favicon.ico (favicon)
     * - Arquivos públicos com extensões comuns
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}