import { createServer } from 'node:http';
import { realpath, stat } from 'node:fs/promises';
import path from 'node:path';

const root = await realpath(path.resolve(process.argv[2] ?? 'out'));
const port = Number(process.env.PORT ?? process.argv[3] ?? 3197);
const mime = new Map(Object.entries({
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.map': 'application/json; charset=utf-8'
}));
const server = createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method ?? '')) { res.writeHead(405, { Allow: 'GET, HEAD' }).end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname); }
  catch { res.writeHead(400).end(); return; }
  if (pathname.includes('\\') || pathname.includes('\0')) { res.writeHead(400).end(); return; }
  const wantsDir = pathname.endsWith('/');
  let candidate = path.resolve(root, `.${pathname}`);
  if (candidate !== root && !candidate.startsWith(root + path.sep)) { res.writeHead(404).end('Not found'); return; }
  try {
    let info = await stat(candidate);
    if (info.isDirectory()) {
      if (!wantsDir) { res.writeHead(308, { Location: `${pathname}/${new URL(req.url ?? '/', 'http://localhost').search}` }).end(); return; }
      candidate = path.join(candidate, 'index.html'); info = await stat(candidate);
    }
    const resolved = await realpath(candidate);
    if (!resolved.startsWith(root + path.sep) || !info.isFile()) throw new Error('outside root');
    const headers = { 'Content-Type': mime.get(path.extname(candidate).toLowerCase()) ?? 'application/octet-stream', 'Content-Length': String(info.size), 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-cache' };
    res.writeHead(200, headers);
    if (req.method === 'HEAD') res.end(); else res.end(await (await import('node:fs/promises')).readFile(resolved));
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end(req.method === 'HEAD' ? undefined : 'Not found'); }
});
server.keepAliveTimeout = 5000;
server.headersTimeout = 10000;
server.listen(port, '127.0.0.1', 128, () => console.log(`Public export at http://127.0.0.1:${port} (root ${root})`));
