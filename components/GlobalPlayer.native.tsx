import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import YoutubePlayer, { YoutubeIframeRef } from 'react-native-youtube-iframe';
import { usePlayer } from '@/context/PlayerContext';

const GlobalPlayer = () => {
  const { videoId, playing, pause, setTitle } = usePlayer();
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [playerState, setPlayerState] = useState<string>('unstarted');

  useEffect(() => {
    if (videoId) {
      fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.title) setTitle(data.title);
        })
        .catch(() => setTitle(`Track ${videoId}`));
    }
  }, [videoId, setTitle]);

  const onChangeState = useCallback(
    (state: string) => {
      console.log('GlobalPlayer state:', state);
      setPlayerState(state);
      if (state === 'ended') {
        pause();
      }
    },
    [pause]
  );

  const injectedJS = `
    (function() {
      document.addEventListener('visibilitychange', function(e) {
        e.stopImmediatePropagation();
      }, true);
      
      Object.defineProperty(document, 'visibilityState', {
        get: function() { return 'visible'; }
      });
      Object.defineProperty(document, 'hidden', {
        get: function() { return false; }
      });

      setInterval(() => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
          if (button.innerText && (button.innerText.includes('Yes') || button.innerText.includes('Confirm'))) {
            button.click();
          }
        });
      }, 5000);
      
      const v = document.querySelector('video');
      if (v) { 
        v.muted = false; 
        v.volume = 1;
        if (window.shouldBePlaying && v.paused) v.play().catch(() => {});
      }
    })();
    true;
  `;

  if (!videoId) return null;

  const needsUserUnlock = playing && playerState !== 'playing' && playerState !== 'buffering';

  return (
    <View
      pointerEvents={needsUserUnlock ? 'auto' : 'none'}
      style={{
        height: 220,
        width: 220,
        opacity: needsUserUnlock ? 1 : 0.02,
        overflow: 'hidden',
        position: 'absolute',
        top: needsUserUnlock ? 96 : 0,
        left: needsUserUnlock ? 24 : 0,
        zIndex: needsUserUnlock ? 9999 : 0,
        backgroundColor: '#000',
      }}>
      <YoutubePlayer
        ref={playerRef}
        height={220}
        width={220}
        play={playing}
        videoId={videoId}
        forceAndroidAutoplay
        onReady={() => {
          console.log('GlobalPlayer ready:', videoId);
        }}
        onError={(error) => {
          console.error('GlobalPlayer error:', error);
        }}
        onChangeState={onChangeState}
        volume={100}
        mute={false}
        initialPlayerParams={{
          controls: true,
          modestbranding: true,
          preventFullScreen: true,
        }}
        webViewProps={{
          allowsInlineMediaPlayback: true,
          playsInline: true,
          injectedJavaScript: `
            (function() {
              window.shouldBePlaying = ${playing};
              ${injectedJS}
              setInterval(() => {
                const videoElement = document.querySelector('video');
                if(videoElement) { 
                  videoElement.muted = false; 
                  videoElement.volume = 1; 
                  if(window.shouldBePlaying && videoElement.paused) {
                    videoElement.play().catch(() => {});
                  }
                }
              }, 2000);
            })();
            true;
          `,
          mediaPlaybackRequiresUserAction: false,
          androidLayerType: 'hardware',
          mixedContentMode: 'always',
        }}
      />
    </View>
  );
};

export default GlobalPlayer;
