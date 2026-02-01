import { defineNitroPlugin } from '#nitro';
import { ZodError } from 'zod';
import { createError, H3Error } from 'h3';

/**
 * Hook error global pour intercepter et formater les erreurs
 * - ZodError : Validation échouée → 400 Bad Request
 * - H3Error : Déjà formaté → on laisse passer
 * - Autres erreurs : 500 Internal Server Error
 */
export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('error', (error) => {
    // 1️⃣ H3Error déjà formaté (y compris celles créées par validateBody)
    if (error instanceof H3Error) {
      return; // Déjà formaté, on laisse passer
    }

    // 2️⃣ ZodError (fallback si jamais on en reçoit une directement)
    // ⚠️ Note : En pratique, les ZodError throw dans defineEventHandler
    // sont sérialisées par h3 avant d'atteindre ce hook, donc ce cas est rare.
    if (error instanceof ZodError) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid request payload',
        data: error.flatten(),
      });
    }

    // 3️⃣ Toutes les autres erreurs (Error classique, crash runtime…)
    console.error('Unhandled error:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
    });
  });
});
