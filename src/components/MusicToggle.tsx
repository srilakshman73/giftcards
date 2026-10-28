import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

const YOUTUBE_VIDEO_ID = '2NrpwkyoTrI';
const YOUTUBE_VIDEO_URL = 'https://youtu.be/2NrpwkyoTrI?si=1feIsKT3qsvdPRXZ';
const SONG_TITLE = 'Adiye';

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  stopVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getPlayerState: () => number;
  destroy: () => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId?: string;
          width?: string | number;
          height?: string | number;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
            onError?: (event: { data: number; target: YTPlayer }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isEmbedBlocked, setIsEmbedBlocked] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const hasUserPausedRef = useRef(false);

  // Attempt to start playback with sound
  const attemptPlayback = useCallback(() => {
    if (hasUserPausedRef.current) return;
    if (playerRef.current && isReady) {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(85);
        playerRef.current.playVideo();
      } catch (err) {
        console.warn('Playback attempt error:', err);
      }
    }
  }, [isReady]);

  // One-time interaction handler for the entire page
  const handlePageInteraction = useCallback(() => {
    if (hasUserPausedRef.current) return;
    if (!isPlaying && !isEmbedBlocked) {
      attemptPlayback();
    }
  }, [isPlaying, isEmbedBlocked, attemptPlayback]);

  // Global listener for first tap/click anywhere on the page
  useEffect(() => {
    const handleFirstTouchOrClick = () => {
      handlePageInteraction();
    };

    window.addEventListener('click', handleFirstTouchOrClick, { passive: true });
    window.addEventListener('touchstart', handleFirstTouchOrClick, { passive: true });
    window.addEventListener('keydown', handleFirstTouchOrClick, { passive: true });

    return () => {
      window.removeEventListener('click', handleFirstTouchOrClick);
      window.removeEventListener('touchstart', handleFirstTouchOrClick);
      window.removeEventListener('keydown', handleFirstTouchOrClick);
    };
  }, [handlePageInteraction]);

  // Initialize YouTube IFrame Player API
  useEffect(() => {
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player('youtube-audio-iframe', {
          videoId: YOUTUBE_VIDEO_ID,
          width: '200',
          height: '200',
          playerVars: {
            autoplay: 1, // Immediately attempt autoplay
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            modestbranding: 1,
            rel: 0,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              setIsReady(true);
              event.target.setVolume(85);
              // Immediately attempt audible autoplay upon player ready
              try {
                event.target.playVideo();
              } catch {
                setAutoplayBlocked(true);
              }

              // Check if playback successfully transitioned to playing after 1.5s
              setTimeout(() => {
                if (window.YT && playerRef.current) {
                  const state = playerRef.current.getPlayerState();
                  if (state !== window.YT.PlayerState.PLAYING) {
                    setAutoplayBlocked(true);
                  }
                }
              }, 1500);
            },
            onStateChange: (event) => {
              if (window.YT) {
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                  setAutoplayBlocked(false);
                } else if (
                  event.data === window.YT.PlayerState.PAUSED ||
                  event.data === window.YT.PlayerState.ENDED
                ) {
                  setIsPlaying(false);
                }
              }
            },
            onError: (event) => {
              console.warn('YouTube error code: ' + event.data);
              // Code 100, 101, 150 = owner restricts embedding
              setIsEmbedBlocked(true);
              setIsPlaying(false);
            },
          },
        });
      } catch (err) {
        console.warn('Failed to construct YouTube player:', err);
        setIsEmbedBlocked(true);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (prevCallback) prevCallback();
        initPlayer();
      };

      if (!document.getElementById('youtube-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  // Handle Play/Pause Button Toggle
  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isEmbedBlocked) {
      window.open(YOUTUBE_VIDEO_URL, '_blank', 'noopener,noreferrer');
      return;
    }

    if (!playerRef.current || !isReady) {
      return;
    }

    try {
      if (isPlaying) {
        hasUserPausedRef.current = true;
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        hasUserPausedRef.current = false;
        playerRef.current.playVideo();
        setIsPlaying(true);
        setAutoplayBlocked(false);
      }
    } catch {
      setIsEmbedBlocked(true);
    }
  };

  // Handle Mute/Unmute
  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (playerRef.current && isReady) {
      try {
        if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        } else {
          playerRef.current.mute();
          setIsMuted(true);
        }
      } catch (err) {
        console.warn('Could not toggle mute', err);
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2 max-w-[92vw]">
      {/* Hidden YouTube IFrame Container with Autoplay Permission */}
      <div
        className="fixed -top-96 -left-96 w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <iframe
          id="youtube-audio-iframe"
          title="Romantic Background Music"
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&controls=0&disablekb=1&fs=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&modestbranding=1&rel=0&playsinline=1`}
          allow="autoplay; encrypted-media; picture-in-picture"
          className="w-1 h-1"
        />
      </div>

      {/* Polite prompt shown ONLY when browser restricts audible autoplay before interaction */}
      {!isPlaying && !isEmbedBlocked && autoplayBlocked && (
        <div
          role="status"
          onClick={handlePageInteraction}
          className="group cursor-pointer flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500/95 via-cherry/90 to-rose-600/95 text-white text-xs font-serif shadow-luxury border border-champagne/60 backdrop-blur-md animate-bounce hover:scale-105 transition-all select-none"
        >
          <Sparkles className="w-3.5 h-3.5 text-champagne animate-pulse shrink-0" />
          <span className="font-semibold tracking-wide">
            Tap anywhere to hear our song, Chella Kutty ❤️
          </span>
        </div>
      )}

      {/* Romantic Player Bar */}
      <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-champagne/60 rounded-full p-1.5 pr-3 shadow-luxury transition-all duration-300 hover:shadow-gold-glow">
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause Adiye song' : 'Play Adiye song'}
          title={isPlaying ? 'Pause song' : `Play romantic song: ${SONG_TITLE}`}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full font-serif text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-r from-rose-500 to-cherry text-white shadow-sm'
              : 'bg-rose-50 hover:bg-rose-100 text-cherry hover:text-cherry-deep border border-rose-200/70'
          }`}
        >
          {isPlaying ? (
            <>
              {/* Equalizer animation */}
              <div className="flex items-end gap-0.5 h-3.5 w-3.5 mr-0.5">
                <span className="w-0.5 h-full bg-white rounded-full animate-[pulse_0.7s_ease-in-out_infinite]" />
                <span className="w-0.5 h-2 bg-white rounded-full animate-[pulse_1.1s_ease-in-out_infinite_0.15s]" />
                <span className="w-0.5 h-3 bg-white rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.3s]" />
              </div>
              <Pause className="w-3.5 h-3.5 fill-white" />
              <span>Playing: {SONG_TITLE}</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Play Our Song ♫</span>
            </>
          )}
        </button>

        {/* Mute/Unmute */}
        {isPlaying && (
          <button
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Unmute music' : 'Mute music'}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-1.5 rounded-full text-cherry hover:bg-rose-100/60 transition-colors cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-rose-600" />
            )}
          </button>
        )}

        {/* Direct Link to YouTube Song */}
        <a
          href={YOUTUBE_VIDEO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${SONG_TITLE} on YouTube`}
          title={`Open ${SONG_TITLE} on YouTube`}
          className="flex items-center gap-1 pl-2 pr-1 py-1 text-[11px] font-sans text-cherry/75 hover:text-rose-600 border-l border-rose-200/60 transition-colors"
        >
          <Music className="w-3.5 h-3.5 text-rose-500" />
          <span className="hidden sm:inline font-cormorant italic text-xs">YouTube</span>
          <ExternalLink className="w-3 h-3 text-rose-400" />
        </a>
      </div>

      {/* If YouTube Embedding is Restricted by Owner */}
      {isEmbedBlocked && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blush-50/95 border border-rose-200 shadow-sm text-xs text-cherry-deep font-cormorant">
          <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
          <span>Copyright playback requires YouTube:</span>
          <a
            href={YOUTUBE_VIDEO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif not-italic text-xs text-rose-600 underline font-semibold hover:text-cherry"
          >
            Play “{SONG_TITLE}” on YouTube ↗
          </a>
        </div>
      )}
    </div>
  );
};
