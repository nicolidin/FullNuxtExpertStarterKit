import { z } from 'zod'

/**
 * Schémas Strapi — à compléter en formation (validation Zod des payloads notes).
 * Pour l’instant : accepte tout pour ne pas casser les appels existants.
 */
export const StrapiNoteCreatePayloadSchema = z.object({
  data: z.record(z.unknown()).optional(),
})

export const StrapiNoteUpdatePayloadSchema = z.object({
  data: z.record(z.unknown()).optional(),
})
