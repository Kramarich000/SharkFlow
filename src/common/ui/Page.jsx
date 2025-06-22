import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Suspense } from 'react';
import Loader from 'common/ui/Loader';

export function Page({ component: Component, title, description }) {
  return (
    <>
      <Helmet>
        <title>{title || 'TaskFlow'}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <Suspense fallback={<Loader />}>
        <Component />
      </Suspense>
    </>
  );
}
