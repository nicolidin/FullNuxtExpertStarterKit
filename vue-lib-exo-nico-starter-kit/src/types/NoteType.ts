/**
 * Type de base pour une Note
 * Utilisé par les composants de la lib et peut être étendu dans le projet hôte
 */
export type NoteType = {
  id: string;
  contentMd: string;
  tagsId: string[];
  createdAt?: string;
};
