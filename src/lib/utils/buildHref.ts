export function buildHref(href: string, creator?: string) {
  if (!creator) return href;
  if (href === '/') return `/${creator}/`;
  if (href.startsWith('/') && !href.startsWith(`/${creator}/`)) {
    return `/${creator}${href}`;
  }
  return href;
}
