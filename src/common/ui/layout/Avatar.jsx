import React, { useState } from 'react';
import { FcRemoveImage } from 'react-icons/fc';
import { showToast } from '@utils/toast';

function AvatarLoader({ size }) {
  return (
    <div
      style={{ width: size, height: size }}
      className="animate-pulse bg-gray-500"
    />
  );
}

export const Avatar = React.memo(function Avatar({
  src,
  size = 40,
  className = '',
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-full overflow-hidden ${className}`}
    >
      {!loaded && !error && <AvatarLoader size={size} />}
      {error && <FcRemoveImage size={size - 15} className="m-auto" />}
      {!error && (
        <img
          src={src}
          alt="Avatar"
          width={size}
          height={size}
          onLoad={() => setLoaded(true)}
          onError={() => {
            showToast(
              'Не удалось загрузить фото профиля. Пожалуйста проверьте подключение к интернету',
              'error',
            );
            setError(true);
          }}
          className={`object-cover border-2 !border-[var(--main-primary)] rounded-full absolute top-0 left-0 transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
});
