import { useEffect } from 'react';

// Появление блоков при прокрутке.
// Любой элемент с атрибутом data-reveal стартует прозрачным и чуть ниже своего
// места; как только он входит в экран, получает класс is-visible и плавно
// встаёт на место (см. index.css). Срабатывает один раз, назад не прячется.
// Через style="--reveal-delay: 120ms" можно сдвинуть по времени соседние блоки.
export default function useReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const supportsIO = 'IntersectionObserver' in window;

    const showAll = () => {
      document.querySelectorAll('[data-reveal]').forEach((n) => n.classList.add('is-visible'));
    };

    if (reduceMotion || !supportsIO) {
      showAll();
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

    const observe = (node) => {
      if (!node.classList.contains('is-visible')) io.observe(node);
    };

    document.querySelectorAll('[data-reveal]').forEach(observe);

    // блоки, которые React монтирует позже (например, мобильная лента
    // появляется при смене ширины окна), тоже должны попасть под наблюдение —
    // иначе они навсегда останутся прозрачными
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          if (node.matches('[data-reveal]')) observe(node);
          node.querySelectorAll('[data-reveal]').forEach(observe);
        });
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // страховка: то, что уже на экране, показываем через полторы секунды
    // принудительно — контент не должен остаться невидимым
    const fallback = setTimeout(() => {
      const limit = window.innerHeight * 1.1;
      document.querySelectorAll('[data-reveal]').forEach((n) => {
        if (n.getBoundingClientRect().top < limit) n.classList.add('is-visible');
      });
    }, 1500);

    return () => {
      io.disconnect();
      mo.disconnect();
      clearTimeout(fallback);
    };
  }, []);
}
