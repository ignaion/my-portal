import { marked } from 'marked';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window as unknown as Window & typeof globalThis;
const DOMPurify = createDOMPurify(window as any);

export function renderMarkdownToSafeHtml(markdown: string) {
  const html = marked.parse(markdown || '');
  return DOMPurify.sanitize(html);
}

export default renderMarkdownToSafeHtml;
