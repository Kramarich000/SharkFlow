import { lazy, Suspense } from 'react';

import Hero from '../components/home-components/Hero';
import Loader from '../components/main-components/Loader';
import Separator from '../components/main-components/Separator';
import BackToTop from '../components/main-components/BackToTop';
import HowItWorks from '../components/home-components/HowItWorks';
import Partners from '../components/home-components/Partners';

const Features = lazy(() => import('../components/home-components/Features'));
const Slider = lazy(() => import('../components/home-components/Slider'));
const Advantages = lazy(() =>
  import('../components/home-components/Advantages'),
);
const Security = lazy(() => import('../components/home-components/Security'));
const FAQ = lazy(() => import('../components/home-components/FAQ'));
const Contacts = lazy(() => import('../components/home-components/Contacts'));

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
