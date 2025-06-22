import { lazy, Suspense } from 'react';

import Hero from 'features/home/components/Hero';
import Loader from 'common/ui/Loader';

const HowItWorks = lazy(() => import('features/home/components/HowItWorks'));
const Features = lazy(() => import('features/home/components/Features'));
const Slider = lazy(() => import('features/home/components/Slider'));
const Advantages = lazy(() => import('features/home/components/Advantages'));
const Security = lazy(() => import('features/home/components/Security'));
const About = lazy(() => import('features/home/components/About'));
const FAQ = lazy(() => import('features/home/components/FAQ'));
const Contacts = lazy(() => import('features/home/components/Contacts'));
const Partners = lazy(() => import('features/home/components/Partners'));
const Separator = lazy(() => import('common/ui/Separator'));

export function HomePage() {
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
