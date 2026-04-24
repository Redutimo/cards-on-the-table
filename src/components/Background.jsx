import { useEffect, useRef } from 'react';
import { initCanvases, cleanupCanvases } from '../utils/canvasFX';

export default function Background() {
  const bgRef = useRef(null);
  const pRef = useRef(null);

  useEffect(() => {
    if (bgRef.current && pRef.current) {
      initCanvases(bgRef.current, pRef.current);
    }
    return () => {
      cleanupCanvases();
    };
  }, []);

  return (
    <>
      <canvas id="bg-canvas" ref={bgRef} />
      <canvas id="particle-canvas" ref={pRef} />
    </>
  );
}
