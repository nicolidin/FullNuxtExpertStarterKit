/**
 * Extracts the title from markdown content (first line starting with #)
 * @param contentMd - The markdown content
 * @returns The extracted title or null if no title found
 */
export const extractTitleFromMarkdown = (contentMd: string): string | null => {
  // ✅ Sécurité : vérifier que contentMd existe avant d'appeler split
  if (!contentMd) return null;
  
  const lines = contentMd.split('\n');
  const firstLine = lines[0]?.trim();
  
  if (firstLine && firstLine.startsWith('#')) {
    return firstLine.substring(1).trim();
  }
  
  return null;
};


