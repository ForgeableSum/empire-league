export interface YouTubeShort {
  id: string;
  title: string;
  channelTitle: string;
}

// Keeps the waiting-room useful without requiring every local install to have
// its own YouTube Data API key.
const fallbackShorts: YouTubeShort[] = [
  { id: "q9VTQHcmdYA", title: "Even the best players make mistakes", channelTitle: "AoE2 community" },
  { id: "jAMcq_p-33I", title: "A king snipe changes everything", channelTitle: "AoE2 community" },
  { id: "yr7KbvobgBg", title: "Everybody loves a mangonel shot", channelTitle: "AoE2 community" },
  { id: "a2L1F5QxDgg", title: "A memorable tournament moment", channelTitle: "AoE2 community" },
  { id: "9qRiIkH7Jhk", title: "Age of Empires II micro", channelTitle: "AoE2 community" }
];

interface SearchResponse {
  items?: Array<{
    id?: { videoId?: string };
    snippet?: { title?: string; channelTitle?: string };
  }>;
}

export async function getAoe2Shorts(signal?: AbortSignal): Promise<YouTubeShort[]> {
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY?.trim();
  if (!apiKey) return fallbackShorts;

  const parameters = new URLSearchParams({
    part: "snippet",
    q: "Age of Empires 2 AoE2 #shorts",
    type: "video",
    videoDuration: "short",
    videoEmbeddable: "true",
    safeSearch: "strict",
    order: "relevance",
    maxResults: "12",
    key: apiKey
  });

  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?${parameters}`, { signal });
    if (!response.ok) return fallbackShorts;
    const data = await response.json() as SearchResponse;
    const results = (data.items ?? []).flatMap((item) => {
      const id = item.id?.videoId;
      if (!id) return [];
      return [{
        id,
        title: decodeEntities(item.snippet?.title ?? "Age of Empires II short"),
        channelTitle: decodeEntities(item.snippet?.channelTitle ?? "YouTube")
      }];
    });
    return results.length > 0 ? results : fallbackShorts;
  } catch {
    return fallbackShorts;
  }
}

function decodeEntities(value: string): string {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = value;
  return textArea.value;
}
