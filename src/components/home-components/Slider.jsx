import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { lazy, Suspense } from 'react';
import { Scrollbar, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import Loader from '@components/main-components/Loader';
const ReviewCard = lazy(() => import('./Reviewers'));
import reviews from '@data/reviewers';

export default function Slider() {
  return (
    <section className="flex flex-col  items-center justify-center py-12 mx-auto">
      <h2 className="text-2xl sm:text-3xl mb-8">Отзывы</h2>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, transform: 'translateY(75px) ' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px) ' }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Swiper
          scrollbar={{ hide: false }}
          autoplay={{ delay: 5000 }}
          spaceBetween={20}
          modules={[Scrollbar, Autoplay]}
          slidesPerView={1}
          breakpoints={{
            700: { slidesPerView: 2 },
            1040: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide
              className="h-[500px] bg-[#111111] rounded-4xl"
              key={review.id}
            >
              <Suspense fallback={<Loader />}>
                <ReviewCard {...review} />
              </Suspense>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
