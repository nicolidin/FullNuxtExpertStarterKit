import { proxyRequest } from 'h3'

/**
 * Proxy simple : toutes les requêtes /api/strapi/* sont transférées vers Strapi.
 * À compléter en formation : cache, rate-limit, validation Zod.
 */
export default defineEventHandler((event) => {
  const url = event.node.req.url || ''
  if (!url.startsWith('/api/strapi/')) return

  const config = useRuntimeConfig()
  const pathAfterStrapi = url.slice('/api/strapi/'.length)
  const base = String(config.strapiBaseUrl || '').replace(/\/$/, '')
  const strapiFullUrl = `${base}/${pathAfterStrapi}`

  return proxyRequest(event, strapiFullUrl, {
    headers: { Authorization: `Bearer ${config.strapiBearerToken}` },
  })
})
