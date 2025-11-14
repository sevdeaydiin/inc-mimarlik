'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Project from '@/app/models/Project';
import { loadProjects } from '@/app/lib/projectLoader';

export default function ProjectSlider() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const loadedProjects = await loadProjects();
        setProjects(loadedProjects);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-bg-gradient-top to-bg-gradient-bottom overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Seçkin Projeler
          </h2>
          <p className="font-inter text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
            Mimarlık ve tasarımda en öne çıkan projelerimizi keşfedin.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-accent"></div>
          </div>
        )}

        {/* Slider Container */}
        {!loading && projects.length > 0 && (
          <div className="relative">
            <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              enabled: true,
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.5,
                spaceBetween: 32,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 32,
              },
            }}
            className="project-slider"
          >
            {projects.map((project: Project, index: number) => (
              <SwiperSlide key={project.id} className="h-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative h-full rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 bg-gray-200 overflow-hidden">
                    <Image
                      src={project.getImages()[0] || '/projects/proje1-1.jpeg'}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      quality={90}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content Container */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-0 group-hover:translate-y-0 transition-all duration-300">
                    {/* Category Badge */}
                    <div className="mb-3 sm:mb-4">
                      <span className="inline-block font-inter text-xs sm:text-sm font-semibold bg-accent text-black px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-playfair text-lg sm:text-xl lg:text-2xl font-bold mb-2 line-clamp-2">
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p className="font-inter text-xs sm:text-sm text-gray-200 line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.description}
                    </p>

                    {/* CTA */}
                    <Link
                      href="/projects"
                      className="inline-block font-inter text-xs sm:text-sm font-semibold text-accent hover:text-white transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Detaylarını Gör →
                    </Link>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="hidden lg:block">
              <button
                className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 bg-text-primary/80 hover:bg-text-primary text-white rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Previous slide"
              >
                ←
              </button>
              <button
                className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 bg-text-primary/80 hover:bg-text-primary text-white rounded-full flex items-center justify-center transition-all duration-300"
                aria-label="Next slide"
              >
                →
              </button>
            </div>
          </div>
        )}

        {/* View All Link */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projects"
            className="inline-block font-inter text-base sm:text-lg font-semibold text-accent hover:text-text-primary transition-colors duration-300 pb-2 border-b-2 border-accent hover:border-text-primary"
          >
            Tüm Projeleri Görüntüle
          </Link>
        </motion.div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        :global(.project-slider .swiper-pagination-bullet) {
          background-color: rgba(10, 10, 10, 0.4);
          width: 10px;
          height: 10px;
        }
        :global(.project-slider .swiper-pagination-bullet-active) {
          background-color: #0a0a0a;
        }
      `}</style>
    </section>
  );
}
