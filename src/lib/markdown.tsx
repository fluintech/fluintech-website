// Simple markdown parser for v0 environment
export function parseMarkdown(content: string): string {
  return (
    content
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-white mb-3 mt-6">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-white mb-4 mt-8">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-white mb-6 mt-8">$1</h1>')

      // Bold text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-white">$1</strong>')

      // Lists
      .replace(/^- (.*$)/gim, '<li class="text-purple-100 mb-2">• $1</li>')
      .replace(/(<li.*<\/li>)/s, '<ul class="space-y-2 mb-6">$1</ul>')

      // Paragraphs
      .replace(/\n\n/g, '</p><p class="text-purple-100 leading-relaxed mb-4">')
      .replace(/^(?!<[h|u|l])(.+)$/gm, '<p class="text-purple-100 leading-relaxed mb-4">$1</p>')

      // Clean up extra tags
      .replace(/<p class="text-purple-100 leading-relaxed mb-4"><\/p>/g, "")
      .replace(/<p class="text-purple-100 leading-relaxed mb-4">(<[h|u])/g, "$1")
  )
}
