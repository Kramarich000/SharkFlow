import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function Page({ component: Component, title, description }) {
  return (
    <>
      <Helmet>
        <title>{title || 'TaskFlow'}</title>
        {description && <meta name="description" content={description} />}
      </Helmet>
      <Component />
    </>
  );
}
