import { Suspense } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import { Loader } from '@common/ui/feedback';

export function Page({ component: Component, title, description }) {
  return (
    <>
      <Helmet>
        <title>{title || 'SharkFlow'}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <Suspense fallback={<Loader />}>
        <Component />
      </Suspense>
    </>
  );
}
