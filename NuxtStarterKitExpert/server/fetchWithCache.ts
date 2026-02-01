import { useStorage } from "#imports";
const CACHE_DURATION = 60 * 60; // 1 heure en secondes

export const fetchWithCache = async <T>(
  key: string,
  fetcher: () => Promise<T>,
): Promise<T> => {
  const storage = useStorage();

  console.log("storage..: ", storage);
  // Vérifier si les données sont en cache
  const cached = await storage.getItem<T>(key);
  if (cached) {
    console.log(`Cache hit for key: ${key}`);
    console.log("So we return the cache: ", cached);
    return cached;
  }

  console.log(`Cache miss for key: ${key}, fetching new data...`);

  // Si non en cache, appeler le fetcher
  const data = await fetcher();

  console.log("We put the data in cache");
  // Mettre les données en cache
  await storage.setItem(key, data, { maxAge: CACHE_DURATION });

  return data;
};
