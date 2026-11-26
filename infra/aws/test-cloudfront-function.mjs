import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const source = fs.readFileSync(new URL('./cloudfront-function.js', import.meta.url), 'utf8');
const handler = vm.runInNewContext(`${source}\nhandler`, { Object });
function request(uri, rawQuery) {
  const req = { method: 'GET', uri, querystring: {} };
  req.rawQueryString = () => rawQuery;
  return req;
}
function invoke(uri, rawQuery) {
  return handler({ request: request(uri, rawQuery) });
}
const aliases = {
  '/chapters.html': '/chapters/',
  '/chapters/chapter-01-signals.html': '/chapters/chapter-01-signals/',
  '/chapters/cinematic.html': '/chapters/cinematic/',
  '/chapters/publishing.html': '/chapters/publishing/',
  '/chapters/systems.html': '/chapters/systems/',
  '/collective.html': '/collective/',
  '/journal.html': '/journal/',
  '/journal/2026-01-studio-note-01.html': '/journal/2026-01-studio-note-01/',
  '/journal/aesthetic-rules.html': '/journal/aesthetic-rules/',
  '/journal/hero-rhythm.html': '/journal/hero-rhythm/',
  '/journal/kubacki-aesthetic-rules.html': '/journal/kubacki-aesthetic-rules/',
  '/journal/mdx-publishing.html': '/journal/mdx-publishing/',
  '/journal/not-for-everyone-note.html': '/journal/not-for-everyone-note/',
  '/journal/not-for-everyone.html': '/journal/not-for-everyone/',
  '/journal/ship-first.html': '/journal/ship-first/',
  '/journal/what-we-ship-first.html': '/journal/what-we-ship-first/',
  '/start.html': '/start/'
};
for (const [from, to] of Object.entries(aliases)) {
  const response = invoke(from, undefined);
  assert.equal(response.statusCode, 301, `status for ${from}`);
  assert.equal(response.headers.location.value, to, `location for ${from}`);
}
const raw = '=unnamed&space=hello%20world&slash=%2F&pct=%252F&utf8=%E9%9B%AA&empty=&flag&dup=one&dup=two&plus=a+b';
assert.equal(invoke('/collective.html', raw).headers.location.value, `/collective/?${raw}`, 'query bytes preserved, not double encoded');
assert.equal(invoke('/start.html', '').headers.location.value, '/start/?', 'explicit empty query preserved');
assert.equal(invoke('/start.html', undefined).headers.location.value, '/start/', 'absent query stays absent');
assert.equal(invoke('/collective', raw).headers.location.value, `/collective/?${raw}`, 'canonical slash redirect preserves query');
let req = request('/', 'x=1');
assert.equal(handler({request:req}), req);
assert.equal(req.uri, '/index.html', 'root maps to root index');
req = request('/journal/hero-rhythm/', 'x=1');
assert.equal(handler({request:req}), req);
assert.equal(req.uri, '/journal/hero-rhythm/index.html', 'directory maps to index');
for (const uri of ['/images/collective/Paris1.jpeg','/_next/static/app.js','/robots.txt','/unpublished','/unknown.html']) {
  req = request(uri, 'q=%2F');
  assert.equal(handler({request:req}), req, `pass-through ${uri}`);
  assert.equal(req.uri, uri, `URI unchanged ${uri}`);
}
console.log('CloudFront Function unit checks passed: 52 assertions covering 17 aliases, query edge cases, canonical routes, assets, unknown routes.');
