import { ChevronLeft, ChevronRight, Expand, Minimize, Pause, Play, Volume2, VolumeX, Youtube } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { getAoe2Shorts, type YouTubeShort } from "../../services/youtubeShortsService";

interface YouTubePlayer {
  destroy(): void;
  getCurrentTime(): number;
  getDuration(): number;
  isMuted(): boolean;
  mute(): void;
  pauseVideo(): void;
  playVideo(): void;
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  unMute(): void;
}

interface YouTubePlayerEvent {
  data: number;
  target: YouTubePlayer;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        element: HTMLIFrameElement,
        options: { events: Record<string, (event: YouTubePlayerEvent) => void> }
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<void> | undefined;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (youtubeApiPromise) return youtubeApiPromise;

  youtubeApiPromise = new Promise((resolve) => {
    const existingCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      existingCallback?.();
      resolve();
    };
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      document.head.append(script);
    }
  });
  return youtubeApiPromise;
}

export function YouTubeShorts() {
  const [shorts, setShorts] = useState<YouTubeShort[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerReady, setPlayerReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const playerFrame = useRef<HTMLIFrameElement>(null);
  const playerContainer = useRef<HTMLDivElement>(null);
  const player = useRef<YouTubePlayer | null>(null);
  const autoplayNext = useRef(false);

  useEffect(() => {
    const controller = new AbortController();
    void getAoe2Shorts(controller.signal).then(setShorts);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    return () => {
      player.current?.pauseVideo();
      const fullscreenElement = document.fullscreenElement;
      const stage = playerContainer.current;
      if (fullscreenElement && stage && (fullscreenElement === stage || stage.contains(fullscreenElement))) {
        void document.exitFullscreen();
      }
    };
  }, []);

  useEffect(() => {
    const updateFullscreenState = () => {
      setIsFullscreen(document.fullscreenElement === playerContainer.current);
    };
    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  const current = shorts[currentIndex];
  const showPrevious = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + shorts.length) % shorts.length);
  }, [shorts.length]);
  const showNext = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % shorts.length);
  }, [shorts.length]);

  useEffect(() => {
    if (!hasStarted || !current || !playerFrame.current) return;
    let disposed = false;
    setPlayerReady(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);

    void loadYouTubeApi().then(() => {
      if (disposed || !playerFrame.current || !window.YT) return;
      player.current = new window.YT.Player(playerFrame.current, {
        events: {
          onReady: (event) => {
            if (disposed) return;
            player.current = event.target;
            setPlayerReady(true);
            setIsMuted(event.target.isMuted());
            setDuration(event.target.getDuration());
            if (autoplayNext.current) {
              autoplayNext.current = false;
              event.target.playVideo();
            }
          },
          onStateChange: (event) => {
            if (disposed) return;
            setIsPlaying(event.data === 1);
            if (event.data === 0) {
              autoplayNext.current = true;
              showNext();
            }
          },
          onAutoplayBlocked: (event) => {
            if (disposed) return;
            event.target.mute();
            setIsMuted(true);
            event.target.playVideo();
          }
        }
      });
    });

    return () => {
      disposed = true;
      player.current?.destroy();
      player.current = null;
    };
  }, [current?.id, hasStarted, showNext]);

  useEffect(() => {
    if (!playerReady) return;
    const timer = window.setInterval(() => {
      if (!player.current) return;
      setCurrentTime(player.current.getCurrentTime());
      setDuration(player.current.getDuration());
    }, 250);
    return () => window.clearInterval(timer);
  }, [playerReady]);

  const togglePlayback = () => {
    if (!player.current) return;
    if (isPlaying) player.current.pauseVideo();
    else player.current.playVideo();
  };

  const toggleMute = () => {
    if (!player.current) return;
    if (isMuted) player.current.unMute();
    else player.current.mute();
    setIsMuted(!isMuted);
  };

  const seek = (value: number) => {
    player.current?.seekTo(value, true);
    setCurrentTime(value);
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void playerContainer.current?.requestFullscreen();
    }
  };

  const playPrevious = () => {
    autoplayNext.current = true;
    showPrevious();
  };

  const playNext = () => {
    autoplayNext.current = true;
    showNext();
  };

  const startShorts = () => {
    autoplayNext.current = true;
    setHasStarted(true);
  };

  return (
    <aside className="shorts-panel" aria-label="Age of Empires II YouTube Shorts">
      <div className="shorts-heading">
        <span><Youtube size={18} aria-hidden="true" /> AoE2 Shorts</span>
        {shorts.length > 0 && <small>{currentIndex + 1} / {shorts.length}</small>}
      </div>
      <div className="shorts-stage" ref={playerContainer}>
        <div className="shorts-player">
          {!hasStarted ? (
            <button
              className="shorts-launch"
              type="button"
              onClick={startShorts}
              disabled={!current}
              aria-label="Load and play the first Age of Empires II short"
            >
              <span className="shorts-launch-emblem" aria-hidden="true">
                <Play size={30} fill="currentColor" />
              </span>
            </button>
          ) : current ? (
            <iframe
              ref={playerFrame}
              key={current.id}
              id={`aoe2-short-${current.id}`}
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(current.id)}?playsinline=1&rel=0&enablejsapi=1&controls=0&disablekb=1&fs=0&iv_load_policy=3`}
              title={current.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="shorts-loading">Finding AoE2 shorts…</div>
          )}
          <button className="shorts-fullscreen-arrow previous" type="button" onClick={playPrevious} disabled={!hasStarted || shorts.length < 2} aria-label="Previous short">
            <ChevronLeft size={34} />
          </button>
          <button className="shorts-fullscreen-arrow next" type="button" onClick={playNext} disabled={!hasStarted || shorts.length < 2} aria-label="Next short">
            <ChevronRight size={34} />
          </button>
        </div>
        <div className="shorts-controls" aria-label="Video controls">
          <button type="button" onClick={togglePlayback} disabled={!playerReady} aria-label={isPlaying ? "Pause short" : "Play short"}>
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <span className="shorts-time">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={Math.max(duration, 1)}
            step="0.1"
            value={Math.min(currentTime, Math.max(duration, 1))}
            disabled={!playerReady}
            onChange={(event) => seek(Number(event.target.value))}
            aria-label="Video progress"
            style={{ "--short-progress": `${duration > 0 ? (currentTime / duration) * 100 : 0}%` } as React.CSSProperties}
          />
          <span className="shorts-time">{formatTime(duration)}</span>
          <button type="button" onClick={toggleMute} disabled={!playerReady} aria-label={isMuted ? "Unmute short" : "Mute short"}>
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <button type="button" onClick={toggleFullscreen} disabled={!hasStarted} aria-label={isFullscreen ? "Exit fullscreen" : "View short fullscreen"}>
            {isFullscreen ? <Minimize size={18} /> : <Expand size={18} />}
          </button>
        </div>
      </div>
      <div className="shorts-footer">
        <button type="button" onClick={playPrevious} disabled={!hasStarted || shorts.length < 2} aria-label="Previous short">
          <ChevronLeft size={22} />
        </button>
        <div>
          <strong>{current?.title ?? "Loading"}</strong>
          <span>{current?.channelTitle ?? "YouTube"}</span>
        </div>
        <button type="button" onClick={playNext} disabled={!hasStarted || shorts.length < 2} aria-label="Next short">
          <ChevronRight size={22} />
        </button>
      </div>
    </aside>
  );
}

function formatTime(seconds: number): string {
  const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, "0")}`;
}
