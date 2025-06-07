import { lazy, Suspense } from 'react';

import HomeHero from '../components/home-components/HomeHero';
import Loader from '../components/main-components/Loader';
const HomeFeatures = lazy(() =>
  import('../components/home-components/HomeFeatures'),
);

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <Suspense fallback={<Loader />}></Suspense>
      <HomeFeatures />
      <section>Тут будут скрины приложения</section>
      <section>тут будут отзывы приложения</section>
      <section>тут преимуущества будут</section>
      <section>тут контакты будут</section>
    </>
  );
}
