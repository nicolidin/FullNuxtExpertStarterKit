/**
 * Route GET /api/protected
 * Exemple de route protégée (BFF) : nécessite une session.
 */
export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event)
  return {
    message: 'This is a protected route',
    user: session.user,
  }
})
