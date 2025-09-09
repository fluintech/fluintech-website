export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
  featured?: boolean
  slug: string
  views: number
  createdAt: string
}

const viewCounts = new Map<string, number>()

const staticBlogPosts: BlogPost[] = [
  {
    id: "ia-generativa-atendimento-2024",
    slug: "ia-generativa-atendimento-2024",
    title: "IA Generativa Consolida-se como Revolução no Atendimento ao Cliente em 2024",
    excerpt:
      "A IA Generativa se consolidou como um avanço significativo para automação de atendimento e vendas, tornando-se recurso essencial para otimizar processos, reduzir custos e melhorar a experiência do cliente.",
    content: `A inteligência artificial generativa tem se tornado uma ferramenta fundamental para empresas que buscam oferecer um atendimento excepcional. Em 2024, essa tecnologia se consolidou como um avanço significativo para automação de atendimento e vendas.

## Principais Benefícios da IA Generativa

Os chatbots de IA avançados são capazes de lidar com interações complexas e fornecer respostas personalizadas, transformando como as empresas se conectam com clientes ao lidar com consultas em tempo real e oferecer atendimento personalizado 24/7.

### Resultados Mensuráveis
- **Redução de 70% no tempo de resposta**: Respostas instantâneas e precisas
- **Atendimento 24/7**: Disponibilidade contínua sem interrupções  
- **Personalização em escala**: Cada interação adaptada ao perfil do cliente
- **Redução de custos operacionais**: Otimização de recursos humanos

## Integração com Sistemas Existentes

A integração de ferramentas de automação com sistemas CRM permite uma experiência mais fluida e eficiente, onde dados do cliente são utilizados para personalizar cada interação de forma inteligente.

Empresas que adotaram essa abordagem relatam melhorias significativas na satisfação do cliente e aumento nas taxas de conversão.`,
    date: "2024-01-15",
    readTime: "8 min",
    category: "Inteligência Artificial",
    image: "/ai-customer-service.png",
    tags: ["IA", "Atendimento", "Automação"],
    featured: true,
    views: 0,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "whatsapp-business-marketing-2024",
    slug: "whatsapp-business-marketing-2024",
    title: "WhatsApp Business: O Canal Principal de Marketing com IA em 2024",
    excerpt:
      "O WhatsApp evoluiu para um canal principal de marketing, com expectativas de mais inovações de IA, mensagens preditivas e integrações mais profundas nos próximos anos.",
    content: `O WhatsApp Business API oferece possibilidades incríveis para automação e se tornou o canal principal de marketing para empresas modernas. A plataforma evoluiu significativamente, com expectativas de mais inovações de IA e integrações mais profundas.

## Tendências do WhatsApp Business em 2024

### Chatbots de IA Avançados
Capazes de lidar com interações complexas e fornecer respostas contextualmente relevantes.

### Mensagens Preditivas  
Antecipam necessidades dos clientes baseadas em histórico e comportamento.

### Integração CRM Profunda
Conexão seamless com sistemas de gestão de relacionamento com cliente.

## Benefícios da Automação

A automação no WhatsApp Business permite:
- Atendimento 24/7 sem interrupções
- Respostas instantâneas e consistentes  
- Personalização em escala
- Redução significativa de custos operacionais

A revolução do WhatsApp Business está apenas começando, e empresas que adotarem essas tecnologias agora terão vantagem competitiva significativa.`,
    date: "2024-01-12",
    readTime: "12 min",
    category: "WhatsApp Business",
    image: "/whatsapp-business-automation.jpg",
    tags: ["WhatsApp", "Marketing", "Automação"],
    views: 0,
    createdAt: "2024-01-12T14:20:00Z",
  },
  {
    id: "roi-automacao-metricas-chatbots",
    slug: "roi-automacao-metricas-chatbots",
    title: "ROI da Automação: Métricas Essenciais para Chatbots de IA",
    excerpt:
      "Como medir o retorno sobre investimento em soluções de automação e as métricas que realmente importam para o sucesso do seu negócio.",
    content: `Medir o ROI da automação é crucial para justificar investimentos em chatbots de IA. As métricas essenciais incluem redução no tempo de resposta, aumento na satisfação do cliente, e diminuição de custos operacionais.

## Métricas Fundamentais

### 1. Tempo de Resposta
- **Antes**: 2-4 horas em média
- **Depois**: Respostas instantâneas (< 1 segundo)
- **Impacto**: Redução de 70% no tempo de resposta

### 2. Disponibilidade do Atendimento  
- **Antes**: 8-12 horas por dia
- **Depois**: 24/7 sem interrupções
- **Impacto**: Aumento de 200% na disponibilidade

### 3. Eficiência Operacional
- **Antes**: 1 agente = 10 atendimentos/hora
- **Depois**: 1 bot = 100+ atendimentos simultâneos
- **Impacto**: Aumento de 3x na eficiência

## Calculando o ROI Real

Empresas que implementam automação inteligente relatam:
- **ROI positivo em 3-6 meses**
- **Redução de 40-60% nos custos de atendimento**  
- **Aumento de 25-40% na satisfação do cliente**
- **Crescimento de 30-50% na capacidade de atendimento**`,
    date: "2024-01-10",
    readTime: "6 min",
    category: "Métricas",
    image: "/roi-automation-metrics.jpg",
    tags: ["ROI", "Métricas", "Análise"],
    views: 0,
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "ia-pmes-transformacao-digital",
    slug: "ia-pmes-transformacao-digital",
    title: "IA para PMEs: Transformação Digital Sem Grandes Investimentos",
    excerpt:
      "Como pequenas e médias empresas podem aproveitar as tecnologias de IA para competir com grandes corporações, mesmo com orçamentos limitados.",
    content: `Pequenas e médias empresas também podem se beneficiar da IA sem grandes investimentos iniciais. A democratização das tecnologias de automação permite que PMEs implementem soluções sofisticadas de atendimento.

## Barreiras Tradicionais Quebradas

### Custo Acessível
Soluções baseadas em nuvem eliminaram a necessidade de infraestrutura cara.

### Implementação Rápida  
Ferramentas no-code/low-code permitem implementação em dias, não meses.

### Escalabilidade Flexível
Pague apenas pelo que usar, crescendo conforme a demanda.

## ROI para PMEs

### Investimento Típico
- **Setup inicial**: R$ 500-2.000
- **Mensalidade**: R$ 200-800  
- **Treinamento**: Incluído

### Retorno Esperado
- **Economia mensal**: R$ 1.000-5.000
- **Aumento de vendas**: 15-30%
- **ROI**: 200-400% no primeiro ano

O segredo está em começar pequeno, com automações simples, e evoluir gradualmente. Isso permite que PMEs testem e ajustem suas estratégias antes de fazer investimentos maiores, garantindo um ROI positivo desde o início.`,
    date: "2024-01-08",
    readTime: "10 min",
    category: "PME",
    image: "/ai-small-business-trends.jpg",
    tags: ["PME", "Transformação Digital", "Inovação"],
    views: 0,
    createdAt: "2024-01-08T16:45:00Z",
  },
  {
    id: "chatbots-conversacionais-futuro-atendimento",
    slug: "chatbots-conversacionais-futuro-atendimento",
    title: "Chatbots Conversacionais: O Futuro do Atendimento Personalizado",
    excerpt:
      "Como a IA conversacional está redefinindo as expectativas dos clientes e criando experiências mais humanas e eficientes.",
    content: `Os chatbots conversacionais representam o futuro do atendimento personalizado, oferecendo interações mais naturais e eficientes. Essas soluções utilizam processamento de linguagem natural avançado para compreender contexto e intenção.

## A Evolução dos Chatbots

### Primeira Geração: Regras Fixas
- Respostas pré-programadas
- Fluxos lineares limitados
- Baixa taxa de resolução

### Segunda Geração: Machine Learning
- Aprendizado com dados históricos
- Melhor compreensão de intenções  
- Respostas mais relevantes

### Terceira Geração: IA Conversacional
- Processamento de linguagem natural avançado
- Compreensão de contexto e nuances
- Personalização em tempo real

## Benefícios Mensuráveis

### Para as Empresas
- **Redução de 60% nos custos de atendimento**
- **Aumento de 40% na satisfação do cliente**
- **Disponibilidade 24/7 sem interrupções**
- **Escalabilidade ilimitada**

### Para os Clientes  
- **Respostas instantâneas e precisas**
- **Atendimento personalizado**
- **Resolução mais rápida de problemas**
- **Experiência consistente**

A personalização em tempo real permite que cada conversa seja única, adaptando-se ao histórico e preferências do cliente. Isso resulta em maior satisfação e fidelização.`,
    date: "2024-01-05",
    readTime: "9 min",
    category: "Chatbots",
    image: "/ai-customer-service.png",
    tags: ["Chatbots", "IA Conversacional", "Personalização"],
    views: 0,
    createdAt: "2024-01-05T11:30:00Z",
  },
  {
    id: "integracao-crm-automacao-vendas",
    slug: "integracao-crm-automacao-vendas",
    title: "Integração CRM e Automação: Maximizando Resultados de Vendas",
    excerpt:
      "A importância da integração entre sistemas CRM e ferramentas de automação para criar um funil de vendas mais eficiente e inteligente.",
    content: `A integração entre CRM e automação é fundamental para maximizar resultados de vendas. Quando sistemas conversam entre si, criam-se oportunidades únicas de personalização e eficiência.

## Por Que Integrar CRM e Automação?

### Visão Unificada do Cliente
A integração permite uma visão 360° do cliente, combinando dados de interações automatizadas com histórico de vendas, preferências e comportamentos.

### Personalização em Escala
Dados do CRM alimentam a automação em tempo real, permitindo personalizar cada interação baseada no perfil completo do cliente.

### Eficiência Operacional  
Eliminação de trabalho manual e duplicação de dados, permitindo que a equipe foque em atividades de maior valor.

## Benefícios Mensuráveis da Integração

### Aumento na Conversão
- **40% de melhoria na taxa de conversão**
- **60% de aumento na qualificação de leads**
- **35% de redução no ciclo de vendas**
- **50% de melhoria no follow-up**

### Otimização de Processos
- **Redução de 70% no tempo de qualificação**
- **Aumento de 80% na produtividade da equipe**
- **Diminuição de 90% em erros de dados**
- **Melhoria de 45% na previsibilidade de vendas**

## ROI da Integração CRM-Automação

### Retorno Esperado (Primeiro Ano)
- **Aumento de receita**: 25% - 50%
- **Redução de custos**: 30% - 40%
- **ROI médio**: 300% - 500%
- **Payback**: 3 - 6 meses

A integração entre CRM e automação não é mais um diferencial, é uma necessidade para empresas que querem competir no mercado atual.`,
    date: "2024-01-03",
    readTime: "11 min",
    category: "Vendas",
    image: "/whatsapp-business-automation.jpg",
    tags: ["CRM", "Vendas", "Integração"],
    views: 0,
    createdAt: "2024-01-03T13:20:00Z",
  },
]

export function incrementViews(slug: string): number {
  const currentViews = viewCounts.get(slug) || 0
  const newViews = currentViews + 1
  viewCounts.set(slug, newViews)

  // Update the post in the array
  const post = staticBlogPosts.find((p) => p.slug === slug)
  if (post) {
    post.views = newViews
  }

  return newViews
}

export async function getCategories(): Promise<{ name: string; count: number }[]> {
  const categoryCount = new Map<string, number>()

  staticBlogPosts.forEach((post) => {
    const count = categoryCount.get(post.category) || 0
    categoryCount.set(post.category, count + 1)
  })

  return Array.from(categoryCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getPopularPosts(limit = 5): Promise<BlogPost[]> {
  return [...staticBlogPosts].sort((a, b) => b.views - a.views).slice(0, limit)
}

export async function getPopularTags(): Promise<{ name: string; count: number }[]> {
  const tagCount = new Map<string, number>()

  staticBlogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      const count = tagCount.get(tag) || 0
      tagCount.set(tag, count + 1)
    })
  })

  return Array.from(tagCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getAllPosts()
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return staticBlogPosts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = staticBlogPosts.find((post) => post.slug === slug) || null

  if (post) {
    incrementViews(slug)
  }

  return post
}

export async function createBlogPost(slug: string, content: string, imageData?: string): Promise<BlogPost> {
  const lines = content.split("\n")
  const title = lines.find((line) => line.startsWith("# "))?.replace("# ", "") || slug
  const excerpt = lines.find((line) => line.length > 50 && !line.startsWith("#"))?.substring(0, 150) + "..." || ""

  const newPost: BlogPost = {
    id: slug,
    slug,
    title,
    excerpt,
    content,
    date: new Date().toISOString().split("T")[0],
    readTime: Math.ceil(content.split(" ").length / 200) + " min",
    category: "Geral",
    image: imageData ? `/blog-images/${slug}.jpg` : "/blog-thumbnail.jpg",
    tags: ["Novo"],
    views: 0,
    createdAt: new Date().toISOString(),
  }

  staticBlogPosts.unshift(newPost)
  return newPost
}
