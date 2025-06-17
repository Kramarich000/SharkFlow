import { lazy, Suspense } from 'react';

import Hero from '@components/home-components/Hero';
import Loader from '@components/main-components/Loader';

const HowItWorks = lazy(() => import('@components/home-components/HowItWorks'));
const Features = lazy(() => import('@components/home-components/Features'));
const Slider = lazy(() => import('@components/home-components/Slider'));
const Advantages = lazy(() => import('@components/home-components/Advantages'));
const Security = lazy(() => import('@components/home-components/Security'));
const About = lazy(() => import('@components/home-components/About'));
const FAQ = lazy(() => import('@components/home-components/FAQ'));
const Contacts = lazy(() => import('@components/home-components/Contacts'));
const Partners = lazy(() => import('@components/home-components/Partners'));
const Separator = lazy(() => import('@components/main-components/Separator'));

export default function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<Loader />}>
        <HowItWorks />
        <Separator />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Features />
        <Separator />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <section>Тут будут скрины приложения</section>
        <Separator />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Slider />
        <Separator />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Advantages />
        <Separator />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Security />
        <Separator />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <About />
        <Separator />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <FAQ />
        <Separator />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Contacts />
        <Separator />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Partners />
      </Suspense>
    </>
  );
}
