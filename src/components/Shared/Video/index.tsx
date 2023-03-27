import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

export default function VideoPlayer({ src }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        var video = videoRef.current
        if (Hls.isSupported()) {
            var hls = new Hls({
                maxBufferSize: 1000 * 1000,
                maxBufferLength: 5000,
                startLevel: 1,
                backBufferLength: 1,

            });
            hls.loadSource(src);
            hls.attachMedia(video);
            video.play();
            video.muted = true;
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = src;
            video.play();
            video.muted = true;

        }
    }, [src, videoRef]);

    return (
        <>
            <video playsInline loop controls={false} data-displaymaxtap ref={videoRef} />
            <style jsx>{`

        video {
          max-width: 100%;
        }
      `}</style>
        </>
    );
}
