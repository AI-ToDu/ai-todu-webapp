export function resolveTransport(
  search: string,
  hostname: string,
  baseUrl: string,
  remembered: string | null,
) {
  const selected = new URLSearchParams(search).get('api') ?? remembered;
  if (['localhost', '127.0.0.1'].includes(hostname) && selected === 'http')
    return { mode: 'http-demo' as const, baseUrl: '' };
  if (selected === 'demo' || !baseUrl) return { mode: 'browser-demo' as const, baseUrl: '' };
  return { mode: 'server' as const, baseUrl };
}
