import { useEffect } from 'react';

// Появление блоков при прокрутке.
// Любой элемент с атрибутом data-reveal стартует прозрачным и чуть ниже своего
// места; как только он входит в экран, получает класс is-visible и плавно
// встаёт на место (см. index.css). Срабатывает один раз, назад не прячется.
// Через style="--reveal-delay: 120ms" можно сдвинуть по времени соседние блоки.
export default function useReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll('[data-reveal]'));

    if (reduceMotion || !('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return undefined;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}
