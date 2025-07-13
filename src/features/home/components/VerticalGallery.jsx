import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useAnimation,
  useMotionValue,
} from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import { useResponsive } from '@common/hooks';

import img1 from '@assets/images/screenshoots/1.png';
import img2 from '@assets/images/screenshoots/2.png';
import img3 from '@assets/images/screenshoots/3.png';
import img4 from '@assets/images/screenshoots/4.png';
import img5 from '@assets/images/screenshoots/5.png';
import img6 from '@assets/images/screenshoots/6.png';

const images = [img1, img2, img3, img4, img5, img6];

function ScrollingColumn({ images, direction = 'up', onImageClick }) {
  const imgHeight = 280;
  const gap = 12;
  const count = images.length;
  const listHeight = count * imgHeight + (count - 1) * gap;

  const controls = useAnimation();
  const y = useMotionValue(0);

  useEffect(() => {
    controls.start({
      y: direction === 'up' ? [0, -listHeight] : [-listHeight, 0],
      transition: {
        duration: 60,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  }, [controls, direction, listHeight]);

  const handleTouchStart = () => {
    controls.stop();
  };
  const handleTouchEnd = () => {
    controls.start({
      y: direction === 'up' ? [y.get(), -listHeight] : [-listHeight, y.get()],
      transition: {
        duration: 60,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    });
  };

  return (
    <div className="overflow-hidden h-[500px] w-[400px]">
      <motion.div
        style={{
          gap,
          height: listHeight * 2,
          position: 'relative',
          pointerEvents: 'auto',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          y,
        }}
        className="flex flex-col"
        animate={controls}
      >
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            draggable={false}
            className="w-full object-cover rounded-2xl hover:scale-110 cursor-pointer transition-transform"
            style={{
              height: imgHeight,
              pointerEvents: 'auto',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
            }}
            onTouchStart={handleTouchStart} // ← добавили
            onTouchEnd={handleTouchEnd} // ← добавили
            onClick={() => onImageClick(i % count)}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function InfiniteVerticalScroll() {
  const { isDesktop } = useResponsive();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = images.map((src) => ({ src }));

  const handleImageClick = (i) => {
    setIndex(i);
    setOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const insideLightbox = event.target.closest('.yarl__container');
      if (!insideLightbox) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <section className="relative mx-auto py-12">
      <h2 className="text-3xl mb-8">Скриншоты</h2>

      {isDesktop ? (
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(50px)' }}
          whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex gap-[20px] mx-auto justify-center p-4"
        >
          <ScrollingColumn
            images={images}
            direction="up"
            onImageClick={handleImageClick}
          />
          <ScrollingColumn
            images={images}
            direction="down"
            onImageClick={handleImageClick}
          />
        </motion.div>
      ) : (
        <div className="flex max-h-[600px] pr-4 gap-4 flex-col overflow-y-auto">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Screenshot ${i + 1}`}
              className="inline object-contain rounded-2xl hover:scale-110 cursor-pointer transition-transform"
              draggable={false}
              onClick={() => handleImageClick(i)}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[9999]"
          />
        )}
      </AnimatePresence>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        onIndexChange={setIndex}
        plugins={[Captions, Zoom, Fullscreen, Slideshow]}
        slideshow={{
          autoplay: true,
          delay: 5000,
        }}
        zoom={{
          maxZoomPixelRatio: 5,
        }}
        styles={{
          container: {
            maxWidth: '75%',
            maxHeight: '85%',
            margin: 'auto',
            backgroundColor: 'transparent',
          },
          slide: {
            outline: 'none',
            backgroundColor: 'transparent',
          },
          arrowPrev: { left: 10 },
          arrowNext: { right: 10 },
        }}
      />
    </section>
  );
}
