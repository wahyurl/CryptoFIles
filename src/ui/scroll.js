import { MOBILE_BP, PEEK } from '../core/config.js';

/** Animasi scroll: panel muncul bertahap + folder lama meredup saat tertimpa folder berikutnya. */
export function initScroll(root) {
  const folders = [...root.querySelectorAll('.fd')];
  const io = new IntersectionObserver(es => es.forEach(en => en.target.classList.toggle('vis', en.isIntersecting)), { threshold: 0.2 });
  folders.forEach(f => io.observe(f));

  let ticking = false;
  const update = () => {
    ticking = false; const wide = innerWidth > MOBILE_BP;
    folders.forEach((f, i) => {
      const next = folders[i + 1]; if (!next || !wide) { f.style.setProperty('--dim', 0); return; }
      const p = Math.min(1, Math.max(0, (innerHeight - next.getBoundingClientRect().top) / (innerHeight - (i + 1) * PEEK)));
      f.style.setProperty('--dim', (p * 0.5).toFixed(3));
      f.querySelector('.pn').style.transform = `translateY(${(-p * 24).toFixed(1)}px)`;
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update); update();
}
