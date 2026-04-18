/** AuditID: SCAN-001 | Analýza URL a detekce platformy */

export const detectPlatform = (url: string) => {
  const normalizedUrl = url.toLowerCase();
  if (normalizedUrl.includes('youtube.com') || normalizedUrl.includes('youtu.be')) return 'YOUTUBE';
  if (normalizedUrl.includes('tiktok.com')) return 'TIKTOK';
  if (normalizedUrl.includes('instagram.com')) return 'INSTAGRAM';
  return 'UNKNOWN';
};

export const getAvailableStreams = async (url: string) => {
  const platform = detectPlatform(url);
  console.log(`[SCANNER] Detekována platforma: ${platform}`);
  // Zde se v budoucnu napojí API pro skutečný fetching manifestů
  return platform;
};