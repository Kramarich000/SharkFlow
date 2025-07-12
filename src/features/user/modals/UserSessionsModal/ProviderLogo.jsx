import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';

export function ProviderLogo({ domain, size = 16 }) {
  const [step, setStep] = useState(0);

  const sources = [
    `https://logo.clearbit.com/${domain}`,
    `https://icons.duckduckgo.com/ip2/${domain}.ico`,
  ];

  const handleLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth <= 1 || naturalHeight <= 1) {
      handleError();
    }
  };

  const handleError = () => {
    setStep((prev) => prev + 1);
  };

  if (!domain) {
    return (
      <FaGlobe
        size={size}
        className="inline mr-1 align-text-bottom text-gray-400"
      />
    );
  }

  if (step < sources.length) {
    return (
      <img
        src={sources[step]}
        alt={`Logo for ${domain}`}
        width={size}
        height={size}
        className="inline mr-1 align-text-bottom !bg-white"
        onLoad={handleLoad}
        onError={handleError}
      />
    );
  }

  return (
    <FaGlobe
      size={size}
      className="inline mr-1 align-text-bottom text-gray-400"
    />
  );
}
