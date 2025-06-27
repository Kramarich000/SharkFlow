import { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';

const loadedLanguages = new Set();

const languageModules = import.meta.glob('./hljs-langs/*.js', { eager: false });

export const HighlightingContent = ({ html, className }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current || !html) return;

    const highlightAll = async () => {
      const codeBlocks = contentRef.current.querySelectorAll('pre code');
      if (!codeBlocks.length) return;

      const languagesToLoad = new Map();

      codeBlocks.forEach((block) => {
        const cls = Array.from(block.classList).find((c) =>
          c.startsWith('language-'),
        );
        if (!cls) return;

        const name = cls.replace('language-', '');
        if (name && !hljs.getLanguage(name) && !loadedLanguages.has(name)) {
          const modulePath = `highlight.js/lib/languages/${name}.js`;
          const loader = languageModules[modulePath];
          if (loader) {
            languagesToLoad.set(name, loader());
          }
        }
      });

      if (languagesToLoad.size) {
        const loaded = await Promise.all(languagesToLoad.values());
        const names = Array.from(languagesToLoad.keys());

        loaded.forEach((mod, i) => {
          const lang = names[i];
          hljs.registerLanguage(lang, mod.default);
          loadedLanguages.add(lang);
        });
      }

      codeBlocks.forEach((block) => {
        const cls = Array.from(block.classList).find((c) =>
          c.startsWith('language-'),
        );
        if (!cls) return;
        const name = cls.replace('language-', '');
        if (hljs.getLanguage(name)) {
          hljs.highlightElement(block);
        }
      });
    };

    highlightAll();
  }, [html]);

  return (
    <div
      ref={contentRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
