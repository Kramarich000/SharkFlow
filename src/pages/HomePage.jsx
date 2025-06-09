import { lazy, Suspense } from 'react';

import Hero from '@components/home-components/Hero';
import Loader from '@components/main-components/Loader';
import BackToTop from '@components/main-components/BackToTop';

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
      <BackToTop />
      <Hero />

      <Suspense fallback={<Loader />}>
        <HowItWorks />
        <Separator />
        <Features />
        <Separator />
        <section>Тут будут скрины приложения</section>
        <Separator />
        <Slider />
        <Separator />
        <Advantages />
        <Separator />
        <Security />
        <Separator />
        <About />
        <Separator />
        <FAQ />
        <Separator />
        <Contacts />
        <Separator />
        <Partners />
        <Separator />
      </Suspense>
    </>
  );
}
