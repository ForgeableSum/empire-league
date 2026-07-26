export const stopYouTubeShortsEvent = "empire-league:stop-youtube-shorts";

export async function stopYouTubeShorts(): Promise<void> {
  window.dispatchEvent(new Event(stopYouTubeShortsEvent));

  if (document.fullscreenElement) {
    await document.exitFullscreen().catch(() => undefined);
  }
}
