export function buildHref(href: string, creator?: string) {
  // ensure we can parse relative hrefs
  const pathname = new URL(href, 'http://example.com').pathname;

  // Normalize pathname (remove trailing slash except for home)
  const normalize = (path: string) =>
    path !== '/' && path.endsWith('/') ? path.slice(0, -1) : path;
  const cleanPath = normalize(pathname);

  if (!creator) return cleanPath;

  // prepend creator
  if (cleanPath === '/') return `/${creator}`; // homepage
  if (!cleanPath.startsWith(`/${creator}`)) return `/${creator}${cleanPath}`;

  return cleanPath;
}
