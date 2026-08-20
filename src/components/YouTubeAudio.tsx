import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT?: any;
  }
}

export const YOUTUBE_VIDEO_ID = '8vlEev1_19U';
export const YOUTUBE_START_SECONDS = 20;
const TARGET_VOLUME = 35; // 35% background volume

interface YouTubeAudioProps {
  isPlaying: boolean;
  onAutoplaySuccess?: () => void;
}

// Global player reference to start audio on direct user interaction
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let globalYTPlayer: any = null;

export const playBackgroundSongDirectly = () => {
  try {
    if (globalYTPlayer && typeof globalYTPlayer.playVideo === 'function') {
      globalYTPlayer.unMute();
      globalYTPlayer.setVolume(TARGET_VOLUME);
      globalYTPlayer.seekTo(YOUTUBE_START_SECONDS, true);
      globalYTPlayer.playVideo();
    }
    // Also postMessage to the iframe directly
    const iframe = document.querySelector('iframe#yt-bg-player-frame') as HTMLIFrameElement | null;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
      iframe.contentWindow.postMessage(`{"event":"command","func":"setVolume","args":[${TARGET_VOLUME}]}`, '*');
      iframe.contentWindow.postMessage(`{"event":"command","func":"seekTo","args":[${YOUTUBE_START_SECONDS}, true]}`, '*');
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
  } catch (err) {
    console.warn('Error starting song on user gesture:', err);
  }
};

export const YouTubeAudio: React.FC<YouTubeAudioProps> = ({ isPlaying, onAutoplaySuccess }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  const autoplaySuccessRef = useRef(onAutoplaySuccess);
  autoplaySuccessRef.current = onAutoplaySuccess;

  useEffect(() => {
    let isMounted = true;

    const setupPlayer = () => {
      if (!isMounted || !containerRef.current || playerRef.current) return;
      if (!window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player(containerRef.current, {
          height: '200',
          width: '200',
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            start: YOUTUBE_START_SECONDS,
            controls: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin,
            rel: 0,
            modestbranding: 1,
            showinfo: 0,
            iv_load_policy: 3,
            fs: 0,
          },
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              if (!isMounted) return;
              globalYTPlayer = event.target;
              try {
                // Set ID on iframe so we can target it via postMessage fallback
                const iframe = event.target.getIframe();
                if (iframe) {
                  iframe.id = 'yt-bg-player-frame';
                  iframe.setAttribute('allow', 'autoplay; encrypted-media');
                }
                event.target.unMute();
                event.target.setVolume(TARGET_VOLUME);
                event.target.seekTo(YOUTUBE_START_SECONDS, true);

                const playPromise = event.target.playVideo();
                if (playPromise && typeof playPromise.catch === 'function') {
                  playPromise.catch(() => {
                    // Browser requires user gesture (Tap to enter)
                  });
                }
              } catch (e) {
                console.warn('onReady error', e);
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              if (!isMounted) return;
              // 1 is YT.PlayerState.PLAYING
              if (event.data === 1 && autoplaySuccessRef.current) {
                autoplaySuccessRef.current();
              }
              // 0 is YT.PlayerState.ENDED -> loop from 10s
              if (event.data === 0) {
                event.target.seekTo(YOUTUBE_START_SECONDS, true);
                event.target.playVideo();
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (err: any) => {
              console.warn('YouTube Player error code:', err?.data);
            },
          },
        });
      } catch (err) {
        console.warn('Failed to initialize YouTube Player:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      setupPlayer();
    } else {
      if (!document.getElementById('youtube-iframe-api-tag')) {
        const tag = document.createElement('script');
        tag.id = 'youtube-iframe-api-tag';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);
      }
      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        setupPlayer();
      };
    }

    // Global listener for first user touch / click anywhere on screen as an extra safety guarantee
    const handleFirstInteraction = () => {
      playBackgroundSongDirectly();
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      isMounted = false;
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
        playerRef.current = null;
        globalYTPlayer = null;
      }
    };
  }, []);

  // Handle Play/Pause toggle
  useEffect(() => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        if (typeof playerRef.current.playVideo === 'function') {
          playerRef.current.unMute();
          playerRef.current.setVolume(TARGET_VOLUME);
          playerRef.current.playVideo();
        }
      } else {
        if (typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
      }
    } catch {
      // Ignore
    }
  }, [isPlaying]);

  return (
    // Kept in DOM with genuine dimensions so YouTube/Browser allows audio playback, while visually transparent & non-blocking
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '200px',
        height: '200px',
        opacity: 0.001,
        pointerEvents: 'none',
        zIndex: -999,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div ref={containerRef} id="yt-bg-player" />
    </div>
  );
};
