// CloudFront Functions JavaScript runtime 2.0.
// Viewer-request handler for the Kubacki Collective static S3 REST origin.
var LEGACY = {
  "/chapters.html": "/chapters/",
  "/chapters/chapter-01-signals.html": "/chapters/chapter-01-signals/",
  "/chapters/cinematic.html": "/chapters/cinematic/",
  "/chapters/publishing.html": "/chapters/publishing/",
  "/chapters/systems.html": "/chapters/systems/",
  "/collective.html": "/collective/",
  "/journal.html": "/journal/",
  "/journal/2026-01-studio-note-01.html": "/journal/2026-01-studio-note-01/",
  "/journal/aesthetic-rules.html": "/journal/aesthetic-rules/",
  "/journal/hero-rhythm.html": "/journal/hero-rhythm/",
  "/journal/kubacki-aesthetic-rules.html": "/journal/kubacki-aesthetic-rules/",
  "/journal/mdx-publishing.html": "/journal/mdx-publishing/",
  "/journal/not-for-everyone-note.html": "/journal/not-for-everyone-note/",
  "/journal/not-for-everyone.html": "/journal/not-for-everyone/",
  "/journal/ship-first.html": "/journal/ship-first/",
  "/journal/what-we-ship-first.html": "/journal/what-we-ship-first/",
  "/start.html": "/start/"
};
var DIRS = {
  "/chapters": true, "/chapters/chapter-01-signals": true,
  "/chapters/cinematic": true, "/chapters/publishing": true,
  "/chapters/systems": true, "/collective": true, "/journal": true,
  "/journal/2026-01-studio-note-01": true, "/journal/aesthetic-rules": true,
  "/journal/hero-rhythm": true, "/journal/kubacki-aesthetic-rules": true,
  "/journal/mdx-publishing": true, "/journal/not-for-everyone-note": true,
  "/journal/not-for-everyone": true, "/journal/ship-first": true,
  "/journal/what-we-ship-first": true, "/start": true
};
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function rawQuerySuffix(request) {
  // runtime 2.0 returns the original encoded query verbatim, including duplicate,
  // empty, flag-only, and UTF-8 percent-encoded parameters. Do not encode it again.
  var raw = request.rawQueryString();
  return raw === undefined ? "" : "?" + raw;
}
function redirect(uri, request) {
  return {
    statusCode: 301,
    statusDescription: "Moved Permanently",
    headers: {
      location: { value: uri + rawQuerySuffix(request) },
      "cache-control": { value: "public, max-age=300" }
    }
  };
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- CloudFront runtime entry point.
function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (hasOwn(LEGACY, uri)) return redirect(LEGACY[uri], request);
  if (hasOwn(DIRS, uri)) return redirect(uri + "/", request);
  if (uri === "/") request.uri = "/index.html";
  else if (uri.charAt(uri.length - 1) === "/") request.uri = uri + "index.html";
  return request;
}
