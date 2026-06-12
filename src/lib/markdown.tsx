export function parseMarkdown(content: string): string {
  return (
    content
      .replace(/^### (.*$)/gim, '<h3 class="blog-h3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="blog-h2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="blog-h1">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="blog-strong">$1</strong>')
      .replace(/^- (.*$)/gim, '<li class="blog-li">$1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="blog-ul">$1</ul>')
      .replace(/\n\n/g, '</p><p class="blog-p">')
      .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="blog-p">$1</p>')
      .replace(/<p class="blog-p"><\/p>/g, "")
      .replace(/<p class="blog-p">(<[h|u])/g, "$1")
  )
}
