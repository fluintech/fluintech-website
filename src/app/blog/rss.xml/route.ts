// app/blog/rss.xml/route.ts
import { getBlogPosts } from "@/lib/blog"
import { NextResponse } from "next/server"

export async function GET() {
  const posts = await getBlogPosts()
  const siteUrl = "https://www.fluintech.com.br"
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Blog Fluintech - Automação e IA para Empresas</title>
    <link>${siteUrl}/blog</link>
    <description>Insights sobre inteligência artificial, automação de atendimento e transformação digital para empresas brasileiras</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <copyright>Copyright ${new Date().getFullYear()} Fluintech. Todos os direitos reservados.</copyright>
    <managingEditor>contato@fluintech.com.br (Equipe Fluintech)</managingEditor>
    <webMaster>contato@fluintech.com.br (Equipe Fluintech)</webMaster>
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>Blog Fluintech</title>
      <link>${siteUrl}/blog</link>
    </image>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <content:encoded><![CDATA[${post.content || post.excerpt}]]></content:encoded>
      <dc:creator><![CDATA[${post.author || "Equipe Fluintech"}]]></dc:creator>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.category ? `<category><![CDATA[${post.category}]]></category>` : ""}
      ${post.tags ? post.tags.map(tag => `<category><![CDATA[${tag}]]></category>`).join("\n      ") : ""}
      ${post.image ? `<enclosure url="${post.image}" type="image/jpeg"/>` : ""}
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
    },
  })
}