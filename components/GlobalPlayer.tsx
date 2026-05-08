import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import { usePlayer } from '@/context/PlayerContext';

const GlobalPlayer = () => {
  const { videoId, playing, setTitle } = usePlayer();
  const playerRef = useRef<YoutubeIframeRef>(null);

  useEffect(() => {
    if (videoId) {
      fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`)
        .then(res => res.json())
        .then(data => {
          if (data.title) setTitle(data.title);
        })
        .catch(() => setTitle(`Track ${videoId}`));
    }
  }, [videoId]);

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

  return (
    <View style={{ height: 10, width: 10, opacity: 0.1, position: 'absolute', top: 50, right: 10, zIndex: 9999 }}>
      <YoutubePlayer
        ref={playerRef}
        height={10}
        width={10}
        play={playing}
        videoId={videoId}
        volume={100}
        mute={false}
        initialPlayerParams={{
          controls: false,
          modestbranding: true,
          preventFullScreen: true,
        }}
        webViewProps={{
          allowsInlineMediaPlayback: true,
          playsInline: true,
          userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
          injectedJavaScript: `
            (function() {
              window.shouldBePlaying = ${playing};
              ${injectedJS}
              const ticker = setInterval(() => {
                const videoElement = document.querySelector('video');
                if(videoElement) { 
                  videoElement.muted = false; 
                  videoElement.volume = 1; 
                  if(window.shouldBePlaying && videoElement.paused) {
                    videoElement.play().then(() => {
                       window.ReactNativeWebView.postMessage(JSON.stringify({type:'debug', message:'Global Engine: Playing Now'}));
                    }).catch(e => {
                       window.ReactNativeWebView.postMessage(JSON.stringify({type:'debug', message:'Global Engine: Auto-Play Blocked. Tap the dot.'}));
                    });
                  }
                }
              }, 2000);
            })();
            true;
          `,
          mediaPlaybackRequiresUserAction: false,
          androidLayerType: 'hardware',
          mixedContentMode: 'always'
        }}
      />
    </View>
  );
};

export default GlobalPlayer;
