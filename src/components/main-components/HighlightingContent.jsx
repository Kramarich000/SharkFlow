import { useEffect, useRef } from 'react';
import hljs from 'highlight.js/lib/core';

// A map to keep track of loaded languages to avoid re-loading
const loadedLanguages = new Set();

const HighlightingContent = ({ html, className }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current || !html) return;

    const highlightAll = async () => {
      const codeBlocks = contentRef.current.querySelectorAll('pre code');
      if (codeBlocks.length === 0) return;

      const languagesToLoad = new Map();

      codeBlocks.forEach((block) => {
        const languageClass = Array.from(block.classList).find((cls) =>
          cls.startsWith('language-'),
        );
        if (!languageClass) return;

        const languageName = languageClass.replace('language-', '');
        if (languageName && !hljs.getLanguage(languageName) && !loadedLanguages.has(languageName)) {
          languagesToLoad.set(languageName, import(`highlight.js/lib/languages/${languageName}`));
        }
      });

      if (languagesToLoad.size > 0) {
        const loadedModules = await Promise.all(languagesToLoad.values());
        const languageNames = Array.from(languagesToLoad.keys());
        
        loadedModules.forEach((module, index) => {
          const name = languageNames[index];
          hljs.registerLanguage(name, module.default);
          loadedLanguages.add(name);
        });
      }
      
      codeBlocks.forEach((block) => {
        // Re-check if the language is now available before highlighting
        const languageClass = Array.from(block.classList).find((cls) => cls.startsWith('language-'));
        if (languageClass) {
            const languageName = languageClass.replace('language-', '');
            if(hljs.getLanguage(languageName)) {
                 hljs.highlightElement(block);
            }
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

export default HighlightingContent; 