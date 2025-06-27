import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { lazy, Suspense } from 'react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import { Loader } from '@common/ui';
import ReviewCard from '@features/home/components/Reviewers';
import { reviews } from '@features/home';

export default function Slider() {
  return (
    <section className="flex flex-col items-center justify-center py-12 mx-auto">
      <h2 className="text-2xl sm:text-3xl mb-8">Отзывы</h2>
      <motion.div
        className="w-full"
        initial={{ opacity: 0, transform: 'translateY(75px)' }}
        whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Swiper
          autoplay={{ delay: 5000 }}
          loop={true}
          spaceBetween={20}
          modules={[Autoplay]}
          slidesPerView={1}
          breakpoints={{
            700: { slidesPerView: 2 },
            1040: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide className="h-[500px] rounded-4xl" key={review.id}>
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
