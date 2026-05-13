import { marked } from 'marked';
// dompurify has different default export shapes depending on ESM/CJS interop.
// Use a runtime-compatible require fallback so the built JS works in Node.
const createDOMPurify = (require('dompurify') as any).default || require('dompurify');
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window as unknown as Window & typeof globalThis;
const DOMPurify = createDOMPurify(window as any);

export function renderMarkdownToSafeHtml(markdown: string) {
  const html = marked.parse(markdown || '');
  return DOMPurify.sanitize(html);
}

export default renderMarkdownToSafeHtml;
