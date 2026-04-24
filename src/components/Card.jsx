import { useRef, useEffect, useMemo } from 'react';
import { getCardArt, CARD_BACK_SVG } from '../data/tarotArt';

export default function Card({ card, onClick, isFlipped }) {
  const cardRef = useRef(null);
  const shellRef = useRef(null);

  useEffect(() => {
    const cardEl = cardRef.current;
    const shellEl = shellRef.current;
    if (!cardEl || !shellEl) return;

    let rx = 0, ry = 0;
    let targetRx = 0, targetRy = 0;
    let isHovered = false;
    let rafId;

    const onPointerMove = (e) => {
      if (!isHovered) return;
      const rect = cardEl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const mx = e.clientX;
      const my = e.clientY;

      // 3D tilt calculations
      targetRx = ((my - cy) / (rect.height / 2)) * -18;
      targetRy = ((mx - cx) / (rect.width / 2)) * 18;

      // Local iridescence sweep
      const px = ((mx - rect.left) / rect.width) * 100;
      const py = ((my - rect.top) / rect.height) * 100;
      cardEl.style.setProperty('--mx-front', px);
      cardEl.style.setProperty('--my-front', py);
    };

    const onPointerEnter = () => {
      isHovered = true;
      shellEl.style.transition = 'none';
    };

    const onPointerLeave = () => {
      isHovered = false;
      targetRx = 0;
      targetRy = 0;
      shellEl.style.transition = 'transform 220ms cubic-bezier(.2,.8,.2,1)';
      cardEl.style.setProperty('--mx-front', 50);
      cardEl.style.setProperty('--my-front', 50);
    };

    const tick = () => {
      if (isHovered) {
        rx += (targetRx - rx) * 0.15;
        ry += (targetRy - ry) * 0.15;
      } else {
        rx += (0 - rx) * 0.15;
        ry += (0 - ry) * 0.15;
      }

      // Add idle float based on time
      const time = performance.now();
      const idleRx = Math.sin(time * 0.001) * 3;
      const idleRy = Math.cos(time * 0.0012) * 3;

      let finalRx = rx + idleRx;
      let finalRy = ry + idleRy;
      
      if (isFlipped) {
        // When flipped globally, we rotate 180deg
        finalRy += 180;
      }

      shellEl.style.transform = `rotateX(${finalRx}deg) rotateY(${finalRy}deg)`;
      rafId = requestAnimationFrame(tick);
    };

    cardEl.addEventListener('pointermove', onPointerMove);
    cardEl.addEventListener('pointerenter', onPointerEnter);
    cardEl.addEventListener('pointerleave', onPointerLeave);
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      cardEl.removeEventListener('pointermove', onPointerMove);
      cardEl.removeEventListener('pointerenter', onPointerEnter);
      cardEl.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [isFlipped]);

  const svgArt = getCardArt(card.id);

  // Build a white-on-black version of the art SVG for use as an iridescence mask,
  // so the rainbow effect only shows through the actual line work.
  const frontMaskUrl = useMemo(() => {
    if (!svgArt) return 'none';
    const whiteArt = svgArt.replace(/currentColor/g, '#fff');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 520">${whiteArt}</svg>`;
    return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`;
  }, [svgArt]);

  // Set noise texture URL for the card mask
  const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <div className="stage" ref={cardRef} style={{ '--noise-url': noiseUrl }} onClick={onClick}>
      <div className="card-shell" ref={shellRef}>
        
        {/* Front Face (Tarot Art) */}
        <div className="face face-front">
          <div className="art">
            <svg viewBox="0 0 340 520" preserveAspectRatio="none" dangerouslySetInnerHTML={{ __html: svgArt }} />
          </div>
          <div className="iri" style={{ WebkitMaskImage: frontMaskUrl, maskImage: frontMaskUrl }} />
          <div className="spec" />
          <div className="noise" />
          <div className="rim" />
        </div>

        {/* Back Face (Card Back) */}
        <div className="face face-back">
          <div className="art">
            <svg viewBox="0 0 340 520" preserveAspectRatio="none" dangerouslySetInnerHTML={{ __html: CARD_BACK_SVG }} />
          </div>
          <div className="iri" style={{ mixBlendMode: 'color-dodge', opacity: 0.5 }} />
          <div className="noise" />
          <div className="rim" />
        </div>

        <div className="glow" />
      </div>
    </div>
  );
}
