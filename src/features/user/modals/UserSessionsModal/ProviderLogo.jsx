import React, { useState } from 'react';
import { FaGlobe } from 'react-icons/fa';

export function ProviderLogo({ domain, size = 16 }) {
  const [step, setStep] = useState(0);

  const sources = [
    `https://logo.clearbit.com/${domain}?size=${size}&format=svg`,
    `https://icons.duckduckgo.com/ip2/${domain}.ico?size=${size}`,
  ];

  const handleError = () => {
    setStep(prev => prev + 1);
  };

  if (step === 0) {
    return (
      <img
        src={sources[0]}
        alt="logo"
        width={size}
        height={size}
        className="inline mr-1 align-text-bottom"
        onError={handleError}
      />
    );
  }

  if (step === 1) {
    return (
      <img
        src={sources[1]}
        alt="favicon"
        width={size}
        height={size}
        className="inline mr-1 align-text-bottom"
        onError={handleError}
      />
    );
  }

  return <FaGlobe size={size} className="inline mr-1 align-text-bottom text-gray-400" />;
}
