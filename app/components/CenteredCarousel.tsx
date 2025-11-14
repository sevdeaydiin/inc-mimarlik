'use client';

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Project from '@/app/models/Project';

interface CarouselItem {
  id: string;
  image: string;
  category: string;
  title: string;
  description: string;
}

interface CenteredCarouselProps {
  projects: Project[];
  onProjectChange?: (projectId: number | string) => void;
}

export default function CenteredCarousel({
  projects,
  onProjectChange,
}: CenteredCarouselProps) {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dragVelocityRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Random 7 görsel seç ve carousel öğeleri oluştur
  useEffect(() => {
    if (projects.length === 0) return;

    // Tüm görselleri topla
    const allImages: Array<{ image: string; category: string; title: string; description: string }> = [];
    projects.forEach((project) => {
      const images = project.getImages();
      images.forEach((image) => {
        allImages.push({
          image,
          category: project.category || 'Proje',
          title: project.name,
          description: project.description,
        });
      });
    });

    // Random 7 görsel seç
    const shuffled = allImages.sort(() => Math.random() - 0.5);
    const selectedImages = shuffled.slice(0, Math.min(7, allImages.length));

    // Carousel öğeleri oluştur
    const items: CarouselItem[] = selectedImages.map((item, index) => ({
      id: `item-${index}`,
      image: item.image,
      category: item.category,
      title: item.title,
      description: item.description,
    }));

    setCarouselItems(items);
  }, [projects]);

  // Erişilebilirlik: prefers-reduced-motion kontrol
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Autoplay mekanizması - 5 saniyede bir otomatik geçiş
  useEffect(() => {
    if (prefersReducedMotion || carouselItems.length === 0) {
      return;
    }

    const resetAutoplay = () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }

      autoplayTimeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      }, 5000); // 5 saniye
    };

    resetAutoplay();

    return () => {
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [currentIndex, carouselItems.length, prefersReducedMotion]);

  // Drag başlangıcı
  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      setIsDragging(true);
      dragStartTimeRef.current = Date.now();
      const clientX =
        e instanceof MouseEvent
          ? e.clientX
          : (e as React.TouchEvent).touches[0]?.clientX || 0;
      setDragStart(clientX);
      dragVelocityRef.current = 0;

      // Autoplay duraklat
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    },
    []
  );

  // Drag sonlandırma
  const handleDragEnd = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!isDragging || !carouselRef.current || carouselItems.length === 0) return;

      const clientX =
        e instanceof MouseEvent
          ? e.clientX
          : (e as React.TouchEvent).changedTouches[0]?.clientX || 0;
      const distance = dragStart - clientX;
      const dragDuration = Date.now() - dragStartTimeRef.current;
      dragVelocityRef.current = distance / dragDuration;

      // Hızlı swipe veya yeterince uzun drag
      const threshold = 50;
      const velocityThreshold = 0.5;

      if (
        Math.abs(distance) > threshold ||
        Math.abs(dragVelocityRef.current) > velocityThreshold
      ) {
        if (distance > 0) {
          setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
        } else {
          setCurrentIndex((prev) =>
            prev === 0 ? carouselItems.length - 1 : prev - 1
          );
        }
      }

      setIsDragging(false);
    },
    [isDragging, dragStart, carouselItems.length]
  );

  // Ok tuşları ile navigasyon
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (carouselItems.length === 0) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentIndex((prev) =>
          prev === 0 ? carouselItems.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [carouselItems.length]);

  // Project değişim callback
  useEffect(() => {
    if (onProjectChange && carouselItems[currentIndex]) {
      onProjectChange(carouselItems[currentIndex].id);
    }
  }, [currentIndex, carouselItems, onProjectChange]);

  if (carouselItems.length === 0) {
    return null;
  }

  // Responsive görünümü hesapla
  const getVisibleCards = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width < 768) return 1; // Mobile: 1 kart
    if (width < 1024) return 2; // Tablet: 2 kart
    return 3; // Desktop: 3 kart
  };

  const visibleCards = getVisibleCards();

  // Kartları düzenle (merkez + yan kartlar)
  const getCardIndices = (center: number) => {
    const indices = [center];

    if (visibleCards >= 2) {
      indices.unshift((center - 1 + carouselItems.length) % carouselItems.length);
    }

    if (visibleCards >= 3) {
      indices.push((center + 1) % carouselItems.length);
    }

    return indices;
  };

  const cardIndices = getCardIndices(currentIndex);

  return (
    <section
      className="relative w-full py-16 md:py-20 lg:py-28 bg-gradient-to-b from-bg-gradient-top to-bg-gradient-bottom overflow-hidden flex items-center justify-center"
      role="region"
      aria-roledescription="carousel"
      aria-label="Proje Galerisi"
    >
      <div className="w-full max-w-6xl mx-auto mobile-px" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
        {/* Başlık */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.6,
          }}
          viewport={{ once: true, margin: '-100px' }}
          style={{ marginBottom: '3rem', marginTop: '5rem'}}
        >
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Mimarlığın Sanat Yüzü
          </h2>
          <p className="font-inter text-base sm:text-lg text-text-secondary mx-auto">
            Mimarlık ve tasarımda en öne çıkan projelerimizi keşfedin.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative w-full h-auto">
          {/* Carousel Wrapper */}
          <div
            ref={carouselRef}
            className="relative w-full"
            onMouseDown={handleDragStart}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchEnd={handleDragEnd}
            role="group"
            aria-label={`Görsel ${currentIndex + 1} / ${carouselItems.length}`}
            aria-live="polite"
          >
            {/* Desktop Layout: 3 Kart Yan Yana */}
            <div className="hidden lg:flex items-center justify-center gap-4 xl:gap-6 perspective">
              <AnimatePresence mode="wait">
                {cardIndices.map((index, position) => {
                  const item = carouselItems[index];
                  const isCentered = position === (visibleCards >= 3 ? 1 : 0);

                  return (
                    <motion.div
                      key={`${index}-${currentIndex}`}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      animate={{
                        opacity: isCentered ? 1 : 0.6,
                        scale: isCentered ? 1 : 0.8,
                        z: isCentered ? 0 : -50,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                      }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.5,
                        ease: 'easeOut',
                      }}
                      className={`flex-1 ${isCentered ? '' : 'pointer-events-none'}`}
                    >
                      <ProjectCard
                        item={item}
                        isFocused={isCentered}
                        isPrefersReducedMotion={prefersReducedMotion}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Tablet Layout: 2 Kart */}
            <div className="hidden md:flex lg:hidden items-center justify-center gap-4">
              <AnimatePresence mode="wait">
                {cardIndices.slice(0, 2).map((index, position) => {
                  const item = carouselItems[index];
                  const isCentered = position === 1;

                  return (
                    <motion.div
                      key={`${index}-${currentIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: isCentered ? 1 : 0.6,
                        scale: isCentered ? 1 : 0.8,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.5,
                        ease: 'easeOut',
                      }}
                      className={`flex-1 ${isCentered ? '' : 'pointer-events-none'}`}
                    >
                      <ProjectCard
                        item={item}
                        isFocused={isCentered}
                        isPrefersReducedMotion={prefersReducedMotion}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Mobile Layout: 1 Kart */}
            <div className="flex md:hidden items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentIndex}-mobile`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.5,
                    ease: 'easeOut',
                  }}
                  className="w-full px-4"
                >
                  <ProjectCard
                    item={carouselItems[currentIndex]}
                    isFocused={true}
                    isPrefersReducedMotion={prefersReducedMotion}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden lg:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 justify-between px-0 lg:px-6 pointer-events-none">
            <button
              onClick={() => {
                setCurrentIndex((prev) =>
                  prev === 0 ? carouselItems.length - 1 : prev - 1
                );
              }}
              aria-label="Önceki proje"
              className="pointer-events-auto w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-accent/40 hover:border-accent/80 text-accent flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/60 hover:shadow-lg hover:shadow-accent/20"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
              }}
              aria-label="Sonraki proje"
              className="pointer-events-auto w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 border border-accent/40 hover:border-accent/80 text-accent flex items-center justify-center transition-all duration-300 backdrop-blur-md hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent/60 hover:shadow-lg hover:shadow-accent/20"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden justify-center gap-3 mt-8">
            <button
              onClick={() => {
                setCurrentIndex((prev) =>
                  prev === 0 ? carouselItems.length - 1 : prev - 1
                );
              }}
              aria-label="Önceki proje"
              className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/40 text-accent flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/60 border border-accent/30"
            >
              ←
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center justify-center gap-2">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                  }}
                  aria-label={`Görsel ${index + 1} ${index === currentIndex ? ', şu anda seçili' : ''}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-accent/60 ${
                    index === currentIndex
                      ? 'w-3 h-3 bg-accent'
                      : 'w-2 h-2 bg-accent/40 hover:bg-accent/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
              }}
              aria-label="Sonraki proje"
              className="w-10 h-10 rounded-full bg-accent/20 hover:bg-accent/40 text-accent flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/60 border border-accent/30"
            >
              →
            </button>
          </div>

          {/* Desktop Dots Indicator */}
          <div className="hidden md:flex justify-center gap-2 mt-10 lg:mt-14">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                }}
                aria-label={`Görsel ${index + 1} ${index === currentIndex ? ', şu anda seçili' : ''}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
                className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/60 focus:ring-offset-transparent ${
                  index === currentIndex
                    ? 'w-3 h-3 bg-accent'
                    : 'w-2 h-2 bg-accent/40 hover:bg-accent/60'
                }`}
              />
            ))}
          </div>

          {/* Projelerimizi Keşfet Butonu */}
          <motion.div
            className="flex justify-center mt-14 lg:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.6,
              delay: 0.2,
            }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 sm:px-10 lg:px-12 py-3 sm:py-4 font-playfair text-base sm:text-lg font-semibold rounded-xl transition-all duration-300"
                style={{ color: '#B8976A' }}
              >
                <span className="flex items-center gap-2 justify-center">
                  Projelerimizi Keşfet
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'loop',
                    }}
                  >
                    →
                  </motion.span>
                </span>
                
                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 -z-10"
                  animate={{
                    opacity: 0.3,
                    boxShadow: 'inset 0 0 20px rgba(184, 151, 106, 0.2), 0 0 30px rgba(184, 151, 106, 0.3)',
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dragging Cursor */}
      {isDragging && (
        <style>{`
          * {
            cursor: grabbing !important;
          }
        `}</style>
      )}
    </section>
  );
}

// ProjectCard Subcomponent
interface ProjectCardProps {
  item: CarouselItem;
  isFocused: boolean;
  isPrefersReducedMotion: boolean;
}

function ProjectCard({
  item,
  isFocused,
  isPrefersReducedMotion,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group rounded-2xl overflow-hidden cursor-grab active:cursor-grabbing h-full"
    >
      {/* Glow Background Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 -z-10"
        animate={{
          opacity: isFocused || isHovered ? 1 : 0,
          boxShadow: isFocused || isHovered
            ? `0 0 40px 12px rgba(184, 151, 106, 0.3), 0 0 80px 24px rgba(184, 151, 106, 0.15)`
            : `0 0 20px 8px rgba(184, 151, 106, 0.1), 0 0 40px 16px rgba(184, 151, 106, 0.05)`,
        }}
        transition={{
          duration: isPrefersReducedMotion ? 0 : 0.4,
        }}
      />

      {/* Outer Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          borderColor: isHovered || isFocused ? 'rgba(184, 151, 106, 0.8)' : 'rgba(184, 151, 106, 0.3)',
          boxShadow: isHovered || isFocused
            ? 'inset 0 0 20px rgba(184, 151, 106, 0.2), 0 0 30px rgba(184, 151, 106, 0.4)'
            : 'inset 0 0 10px rgba(184, 151, 106, 0.1), 0 0 15px rgba(184, 151, 106, 0.15)',
        }}
        transition={{
          duration: isPrefersReducedMotion ? 0 : 0.3,
        }}
        style={{
          border: '2px solid',
        }}
      />

      {/* Image Container */}
      <motion.div
        className="relative w-full aspect-[3/4] sm:aspect-[2/3] overflow-hidden bg-bg-dark"
        animate={{
          scale: isFocused ? 1 : 0.95,
        }}
        transition={{
          duration: isPrefersReducedMotion ? 0 : 0.4,
        }}
      >
        <Image
          src={item.image}
          alt={`${item.title} - ${item.description || 'Proje Görseli'}`}
          fill
          className={`object-cover transition-transform duration-700 ${
            isHovered && !isPrefersReducedMotion
              ? 'scale-110'
              : 'scale-100'
          }`}
          quality={90}
          priority={isFocused}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Overlay Gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-text-primary/95 via-text-primary/50 to-transparent"
          animate={{
            opacity: isHovered && isFocused ? 0.95 : 0.75,
          }}
          transition={{
            duration: isPrefersReducedMotion ? 0 : 0.3,
          }}
        />

        {/* Shine Effect on Hover */}
        {!isPrefersReducedMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            animate={isHovered ? { x: '100%' } : { x: '-100%' }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
              repeat: isHovered ? Infinity : 0,
              repeatDelay: 1,
            }}
          />
        )}
      </motion.div>

      {/* Content Container */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 lg:p-7 text-white pointer-events-auto"
        animate={{
          opacity: isFocused ? 1 : 0.9,
        }}
        transition={{
          duration: isPrefersReducedMotion ? 0 : 0.3,
        }}
      >
        {/* Category Badge */}
        <motion.div
          className="mb-3 sm:mb-4"
          animate={{
            scale: isFocused ? 1 : 0.95,
          }}
          transition={{ duration: isPrefersReducedMotion ? 0 : 0.3 }}
        >
          <span 
            className="inline-block font-inter text-xs sm:text-sm font-semibold text-white rounded-full shadow-lg"
            style={{ 
              backgroundColor: '#B8976A',
              paddingLeft: '0.5rem',
              paddingRight: '0.5rem',
              paddingTop: '0.2rem',
              paddingBottom: '0.2rem',
              marginLeft: '0.5rem'
            }}
          >
            {item.category}
          </span>
        </motion.div>

        {/* Title */}
        <h3 className="font-playfair text-lg sm:text-xl lg:text-2xl font-bold mb-2 line-clamp-2 leading-tight" style={{ marginLeft: '0.5rem', marginBottom: '1rem' }}>
          {item.title}
        </h3>

        {/* Description
        <motion.p
          className="font-inter text-xs sm:text-sm text-white/90 line-clamp-2 leading-relaxed"
          animate={{
            opacity: isFocused && isHovered ? 1 : 0.8,
          }}
          transition={{ duration: isPrefersReducedMotion ? 0 : 0.3 }}
        >
          {item.description}
        </motion.p> */}
      </motion.div>
    </motion.div>
  );
}
