import { matchmakerTransport } from "./matchmakerTransport";
import { isPreviewMode } from "../previewMode";

export interface LiveStream {
  id: string;
  creatorName: string;
  title: string;
  thumbnailUrl: string;
  viewerCount: number;
  streamUrl: string;
}

export const liveStreamsService = {
  async getLiveStreams(): Promise<LiveStream[]> {
    if (isPreviewMode) return [];
    const body = await matchmakerTransport.request<{ streams: LiveStream[] }>("/streams/live");
    return body.streams;
  }
};
