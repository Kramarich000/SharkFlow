import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Suspense } from 'react';
import Loader from '@components/main-components/Loader';

export default function Page({ component: Component, title, description }) {
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
