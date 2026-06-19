import { useEffect, useRef } from 'react';

import firstFrames from '../assets/first-frames.mp4';

const RING_R = 86;
const RING_C = 2 * Math.PI * RING_R;

// Play forward → pause → step backward frame by frame → repeat.
function usePingPong(ref) {
  const backward = useRef(false);
  const raf = useRef(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const stepBack = () => {
      v.currentTime = Math.max(0, v.currentTime - 1 / 30);
      if (v.currentTime <= 0) {
        backward.current = false;
        v.play();
      } else {
        raf.current = requestAnimationFrame(stepBack);
      }
    };

    const onEnded = () => {
      backward.current = true;
      v.pause();
      v.currentTime = v.duration;
      raf.current = requestAnimationFrame(stepBack);
    };

    v.addEventListener('ended', onEnded);
    return () => {
      v.removeEventListener('ended', onEnded);
      cancelAnimationFrame(raf.current);
    };
  }, [ref]);
}

export default function CarStage({ progress = 0, model }) {
  const videoRef = useRef(null);
  usePingPong(videoRef);

  const p = Math.max(0, Math.min(1, progress));
  const pct = Math.round(p * 100);
  const dashOffset = RING_C * (1 - p);

  return (
    <div className="car-stage">
      <video
        ref={videoRef}
        className="car-stage__video"
        autoPlay
        muted
        playsInline
        src={firstFrames}
      />
      <div className="car-stage__ring-wrap">
        <svg className="car-stage__svg" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r={RING_R} className="car-stage__track" />
          <circle
            cx="100"
            cy="100"
            r={RING_R}
            className="car-stage__ring"
            strokeDasharray={RING_C}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 100 100)"
          />
        </svg>
      </div>
      <div className="car-stage__meta">
        <span className="car-stage__pct">{pct}%</span>
        {model && <span className="car-stage__model">{model}</span>}
      </div>
    </div>
  );
}
