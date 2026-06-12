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
  author?: string
  views: number
  createdAt: string
  updatedAt?: string
}

const viewCounts = new Map<string, number>()

const staticBlogPosts: BlogPost[] = [
  {
    id: "ia-generativa-atendimento-2024",
    slug: "ia-generativa-atendimento-2024",
    title: "O que muda no atendimento ao cliente quando agentes de IA entram em operacao",
    excerpt:
      "Agentes de IA nao sao chatbots glorificados. Eles executam tarefas, consultam sistemas e tomam decisoes dentro de limites definidos. Entender essa diferenca e o primeiro passo para usar IA de verdade.",
    content: `Existe uma diferenca fundamental entre um chatbot que responde perguntas e um agente que executa tarefas. O primeiro segue um roteiro. O segundo age.

## O que e um agente de IA na pratica

Um agente de IA para atendimento nao apenas responde. Ele consulta o CRM para verificar o historico do cliente, abre tickets no sistema de suporte, reagenda compromissos no calendario e registra cada acao em um log de auditoria.

Essa capacidade de agir em sistemas reais e o que separa agentes de chatbots. E tambem o que exige mais cuidado na implementacao.

## Por que a engenharia importa

Agentes com acesso a sistemas externos podem causar danos reais se mal configurados. Uma resposta errada num chatbot e frustrante. Um agente que altera dados no CRM com base em instrucoes ambiguas e um problema operacional.

Por isso, agentes de IA serios operam com:

- **Guardrails**: restricoes explicitas sobre o que podem ou nao fazer
- **Human in the loop**: pontos de aprovacao humana antes de acoes criticas
- **Auditoria completa**: registro de cada decisao tomada e o motivo

## O que isso significa para sua operacao

Antes de implementar qualquer agente, vale mapear quais tarefas sao repetitivas, previsíveis e bem documentadas. Essas sao as candidatas naturais para automacao. Decisoes que envolvem julgamento ou excecoes continuam sendo responsabilidade humana.

O objetivo nao e substituir pessoas. E libertar a equipe de trabalho mecanico para que possa focar no que realmente exige julgamento.`,
    date: "2024-01-15",
    readTime: "6 min",
    category: "Agentes de IA",
    image: "/ai-customer-service.png",
    tags: ["Agentes", "Atendimento", "Guardrails"],
    featured: true,
    views: 0,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "whatsapp-business-marketing-2024",
    slug: "whatsapp-business-marketing-2024",
    title: "WhatsApp como canal operacional: alem do atendimento reativo",
    excerpt:
      "A maioria das empresas usa WhatsApp para responder clientes. Poucas usam como canal operacional completo, com agentes que qualificam, agendam e registram sem intervencao manual.",
    content: `O WhatsApp e o canal de comunicacao principal do Brasil. A pergunta nao e se sua empresa deve estar la, mas o que seus agentes fazem quando uma mensagem chega.

## Atendimento reativo vs operacao ativa

Atendimento reativo e quando alguem da sua equipe le a mensagem e responde. Funciona, mas nao escala.

Operacao ativa e quando um agente recebe a mensagem, identifica a intencao, consulta o sistema relevante e executa a acao correta sem interacao humana na maioria dos casos.

## O que agentes fazem no WhatsApp

Em uma operacao bem configurada, um agente no WhatsApp pode:

- **Qualificar leads** consultando o CRM e verificando se o contato ja existe
- **Agendar compromissos** verificando disponibilidade e confirmando com o cliente
- **Responder duvidas tecnicas** buscando respostas na base de conhecimento
- **Escalar para humanos** quando a solicitacao esta fora do escopo definido

O ponto critico e o ultimo item. Um agente bem construido sabe o que nao sabe e transfere para um humano no momento certo.

## Integracao com sistemas existentes

Para um agente no WhatsApp funcionar de verdade, ele precisa de acesso aos sistemas que sua operacao ja usa. CRM, calendario, base de conhecimento, sistema de tickets. Sem essas integracoes, ele e apenas um respondedor automatico com linguagem melhor.

A integracao e feita via MCP (Model Context Protocol) ou APIs REST, dependendo do sistema. O importante e que o agente opere sobre dados reais, nao sobre respostas pre-programadas.`,
    date: "2024-01-12",
    readTime: "7 min",
    category: "WhatsApp Business",
    image: "/whatsapp-business-automation.jpg",
    tags: ["WhatsApp", "Agentes", "Integracao"],
    views: 0,
    createdAt: "2024-01-12T14:20:00Z",
  },
  {
    id: "roi-automacao-metricas-chatbots",
    slug: "roi-automacao-metricas-chatbots",
    title: "Como medir se sua automacao esta funcionando de verdade",
    excerpt:
      "Antes de calcular ROI, e preciso definir o que conta como sucesso. Automacoes que parecem funcionar nos dashboards mas nao mudam a operacao real sao um problema comum e evitavel.",
    content: `Toda automacao prometida vem com projecoes de economia e ganho de eficiencia. O problema e que essas projecoes costumam ser calculadas antes de qualquer implementacao real, sem considerar as particularidades da operacao.

## O que medir antes de implementar

Antes de automatizar qualquer processo, documente como ele funciona hoje:

- **Volume**: quantas solicitacoes por dia, semana, mes
- **Tempo**: quanto tempo cada solicitacao leva, da chegada ate a resolucao
- **Taxa de erro**: com que frequencia o processo atual produz resultados errados
- **Carga humana**: quantas horas da equipe sao consumidas por esse processo

Esses numeros sao a linha de base. Sem eles, nao ha como comparar depois.

## O que olhar apos a implementacao

Apos colocar um agente em operacao, as metricas relevantes sao:

- **Taxa de resolucao sem intervencao humana**: o agente esta resolvendo ou apenas triando?
- **Tempo de escalada**: quando o agente escala para humanos, quanto tempo passa ate a resolucao?
- **Taxa de erro do agente**: o agente esta tomando decisoes erradas? Com que frequencia?
- **Satisfacao do cliente**: a experiencia melhorou ou piorou em relacao ao processo anterior?

## O que nao medir

Cuidado com metricas de vaidade. Numero de mensagens processadas, velocidade de resposta em milissegundos, percentual de automacao — esses numeros crescem mesmo quando a operacao nao melhora.

O que importa e se os problemas reais da operacao foram resolvidos. Isso se mede na pratica, nao no dashboard.

## Quando a automacao nao vale a pena

Nem todo processo deve ser automatizado. Se o processo e raro, altamente variavel ou depende de julgamento humano em quase todos os casos, o custo de construir e manter o agente pode superar o beneficio.

A decisao certa e automatizar o que e repetitivel, previsivel e bem documentado.`,
    date: "2024-01-10",
    readTime: "7 min",
    category: "Operacoes",
    image: "/roi-automation-metrics.jpg",
    tags: ["Metricas", "Operacoes", "Automacao"],
    views: 0,
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "ia-pmes-transformacao-digital",
    slug: "ia-pmes-transformacao-digital",
    title: "IA para PMEs: por onde comecar sem desperdicar dinheiro",
    excerpt:
      "Pequenas e medias empresas nao precisam de um projeto de transformacao digital. Precisam de um problema real, um processo documentado e um agente que resolva aquele problema especifico.",
    content: `A promessa de IA para PMEs costuma vir embrulhada em jargao e plataformas complexas. A realidade e mais simples: o melhor ponto de entrada e um problema pequeno, bem definido e que consome tempo da equipe toda semana.

## O erro mais comum

Empresas pequenas tentam automatizar demais de uma vez. Compram uma plataforma, tentam conectar varios sistemas, treinam a equipe em varios processos novos ao mesmo tempo. O resultado e um projeto que nunca chega ao ar ou que vai ao ar quebrado.

A abordagem que funciona e diferente: identifique um processo, documente-o, automatize-o, valide-o. Depois repita.

## Como identificar o primeiro processo

Pergunte para a equipe: o que voces fazem todos os dias que parece mecanico? As respostas costumam ser:

- Responder as mesmas perguntas sobre produtos ou servicos
- Verificar disponibilidade e confirmar agendamentos
- Triagem inicial de solicitacoes antes de encaminhar para a pessoa certa
- Preenchimento de dados em sistemas apos uma conversa com o cliente

Qualquer um desses e um candidato valido para um primeiro agente.

## O que um primeiro agente precisa ter

Para um agente funcionar em producao em uma PME, ele precisa de:

- **Escopo claro**: o que ele faz e, principalmente, o que ele nao faz
- **Fonte de dados confiavel**: CRM, planilha, base de conhecimento atualizada
- **Caminho de escalada**: para onde vai quando nao sabe a resposta
- **Forma de monitorar**: como a equipe acompanha o que o agente esta fazendo

Sem esses quatro elementos, o agente vira um problema adicional em vez de uma solucao.

## Expectativa realista

Um primeiro agente bem construido resolve um problema especifico de forma confiavel. Nao transforma a empresa. Nao elimina a necessidade de pessoas. Mas libera tempo da equipe para atividades que realmente exigem julgamento humano.

Isso ja e valioso o suficiente para comecar.`,
    date: "2024-01-08",
    readTime: "8 min",
    category: "PME",
    image: "/ai-small-business-trends.jpg",
    tags: ["PME", "Implementacao", "Estrategia"],
    views: 0,
    createdAt: "2024-01-08T16:45:00Z",
  },
  {
    id: "chatbots-conversacionais-futuro-atendimento",
    slug: "chatbots-conversacionais-futuro-atendimento",
    title: "A diferenca entre um agente que age e um bot que responde",
    excerpt:
      "Bots de resposta automatica existem ha decadas. Agentes de IA sao diferentes: eles tomam decisoes, executam acoes em sistemas externos e operam dentro de limites definidos por voce.",
    content: `Quando alguem diz que vai implementar IA no atendimento, geralmente esta falando de uma das duas coisas: um bot de resposta automatica com linguagem melhor, ou um agente que executa tarefas em sistemas reais.

A diferenca importa mais do que parece.

## O que um bot faz

Um bot de atendimento recebe uma mensagem, identifica a intencao e responde com um texto pre-definido ou gerado. Se a conversa sair do fluxo esperado, ele pede para o usuario reformular ou transfere para um humano.

Bots sao uteis para FAQs, triagem inicial e captura de informacoes basicas. O limite deles e que nao fazem nada alem de responder.

## O que um agente faz

Um agente recebe uma mensagem e pode:

- Consultar o CRM para ver o historico do cliente
- Verificar disponibilidade no calendario e confirmar um agendamento
- Abrir um ticket no sistema de suporte com as informacoes coletadas
- Enviar um email de confirmacao apos a acao ser concluida

O agente nao apenas responde. Ele executa. E essa execucao acontece em sistemas reais, com dados reais.

## Por que isso exige mais cuidado

Um agente com acesso a sistemas reais pode causar problemas reais se nao for bem configurado. Um campo preenchido errado no CRM, um agendamento feito no horario errado, um email enviado para o contato errado.

Por isso, agentes bem construidos operam com guardrails claros: o que podem fazer, o que precisam de aprovacao humana antes de fazer e o que esta completamente fora do escopo.

## Quando usar cada um

Use um bot quando o objetivo e responder perguntas e capturar informacoes. Use um agente quando o objetivo e executar tarefas e reduzir trabalho manual da equipe.

A maioria das operacoes começa com um bot e evolui para agentes conforme o nivel de confianca e os processos ficam melhor documentados.`,
    date: "2024-01-05",
    readTime: "6 min",
    category: "Agentes de IA",
    image: "/ai-customer-service.png",
    tags: ["Agentes", "Bots", "Automacao"],
    views: 0,
    createdAt: "2024-01-05T11:30:00Z",
  },
  {
    id: "integracao-crm-automacao-vendas",
    slug: "integracao-crm-automacao-vendas",
    title: "Agentes conectados ao CRM: o que muda na pratica",
    excerpt:
      "Um agente sem acesso ao CRM trabalha com informacoes incompletas. Um agente conectado ao CRM opera com o contexto real do cliente e pode agir de forma muito mais precisa.",
    content: `O CRM e onde vive o contexto do cliente: historico de compras, conversas anteriores, preferencias, pendencias. Um agente que nao tem acesso a essas informacoes opera no escuro.

A integracao entre agentes de IA e o CRM e o que transforma automacao generica em automacao util.

## O que muda quando o agente acessa o CRM

Sem CRM, um agente responde de forma generica. Com CRM, ele responde com contexto:

- Sabe se o cliente ja e ativo ou esta sendo prospectado
- Conhece o ultimo contato e o assunto tratado
- Identifica se ha pendencias em aberto
- Personaliza a resposta com base no perfil do cliente

Essa diferenca e perceptivel para o cliente e relevante para a operacao.

## Como a integracao funciona tecnicamente

A forma mais comum de conectar um agente ao CRM e via MCP (Model Context Protocol) ou via API REST do proprio CRM. O agente recebe permissao para consultar e, dependendo da configuracao, para atualizar registros.

O escopo de permissoes e definido na especificacao do agente: o que ele pode ler, o que pode escrever e o que precisa de aprovacao humana antes de alterar.

## O risco de nao definir limites

Um agente com acesso irrestrito ao CRM e um risco operacional. Campos sobrescritos por engano, registros criados com dados errados, historico corrompido — todos esses problemas sao possiveis se o escopo de permissoes nao for bem definido.

Por isso, a especificacao do agente precisa descrever explicitamente o que ele pode e nao pode fazer no CRM. Isso nao e burocracia. E o que separa uma automacao confiavel de um problema esperando para acontecer.

## Construindo confianca gradualmente

A abordagem mais segura e comecar com acesso somente leitura. O agente consulta o CRM mas nao altera nada. A equipe valida se as respostas fazem sentido com base nas informacoes disponíveis.

Quando o nivel de confianca for alto o suficiente, expande-se o escopo para permitir escritas em campos especificos, com log de cada alteracao para auditoria.`,
    date: "2024-01-03",
    readTime: "7 min",
    category: "Integracao",
    image: "/whatsapp-business-automation.jpg",
    tags: ["CRM", "Integracao", "Agentes"],
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
