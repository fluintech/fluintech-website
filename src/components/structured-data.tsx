// components/structured-data.tsx
import Script from 'next/script'

export function StructuredData() {
  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fluintech',
    url: 'https://www.fluintech.com.br',
    logo: 'https://www.fluintech.com.br/icon.svg',
    description: 'Startup brasileira de automação de atendimento com inteligência artificial',
    foundingDate: '2023',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BR',
      addressRegion: 'PR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['Portuguese'],
      telephone: '+55-44-3101-0224',
    },
    sameAs: [
      'https://twitter.com/fluintech',
      'https://www.linkedin.com/company/fluintech',
      'https://www.instagram.com/fluintech',
    ],
  }

  // Software Application Schema
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Fluintech - Automação com IA',
    description: 'Plataforma de automação de atendimento ao cliente com inteligência artificial, chatbots para WhatsApp e agendamento automático',
    url: 'https://www.fluintech.com.br',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'BRL',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    provider: {
      '@type': 'Organization',
      name: 'Fluintech',
    },
  }

  // FAQ Schema - Adicione suas perguntas frequentes
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'O que é a Fluintech?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A Fluintech é uma startup brasileira que oferece soluções de automação de atendimento ao cliente com inteligência artificial, incluindo chatbots para WhatsApp, agendamento automático e automação de processos.',
        },
      },
      {
        '@type': 'Question',
        name: 'Como funciona o chatbot com IA da Fluintech?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nosso chatbot utiliza inteligência artificial para responder automaticamente às dúvidas dos clientes 24/7, agendar consultas, processar solicitações e direcionar casos complexos para sua equipe quando necessário.',
        },
      },
      {
        '@type': 'Question',
        name: 'A Fluintech funciona com WhatsApp Business?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sim! Nossa plataforma integra-se perfeitamente com o WhatsApp Business, permitindo automação completa do atendimento via WhatsApp com respostas inteligentes e agendamentos automáticos.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo leva para implementar a automação?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A implementação é rápida e pode ser concluída em poucos dias, dependendo da complexidade do seu negócio. Nossa equipe oferece suporte completo durante todo o processo de integração.',
        },
      },
    ],
  }

  // WebSite Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fluintech',
    url: 'https://www.fluintech.com.br',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.fluintech.com.br/busca?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  }

  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Automação de Atendimento com IA',
    provider: {
      '@type': 'Organization',
      name: 'Fluintech',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Brasil',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Serviços de Automação',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Chatbot WhatsApp com IA',
            description: 'Chatbot inteligente para WhatsApp Business com respostas automáticas',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Agendamento Automático',
            description: 'Sistema de agendamento inteligente com disponibilidade em tempo real',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Automação de Processos',
            description: 'Automação completa de processos empresariais com IA',
          },
        },
      ],
    },
  }

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: 'https://www.fluintech.com.br',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Soluções',
        item: 'https://www.fluintech.com.br#solucoes',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Sobre',
        item: 'https://www.fluintech.com.br#sobre',
      },
    ],
  }

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="software-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  )
}