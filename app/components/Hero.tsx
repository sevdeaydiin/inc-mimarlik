'use client';

import { motion } from 'framer-motion';
import Button from './ui/Button';
import { colors } from '../constants/colors';
import Image from 'next/image';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/projects/background.jpeg"
          alt="Interior Design Background"
          fill
          className="object-cover object-center"
          quality={95}
          priority={true}
          sizes="100vw"
        />
        {/* Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/45 to-black/75"></div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] z-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(${colors.primary} 1px, transparent 1px), linear-gradient(90deg, ${colors.primary} 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-8 text-center" style={{ paddingTop: '140px', paddingBottom: '120px' }}>
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <span className="inline-block text-xs lg:text-sm font-light tracking-[0.35em] uppercase" style={{ color: '#B8976A' }}>
            Mimarlık & Tasarım
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
        >
          <span className="block font-playfair text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.1] tracking-tight" style={{ marginBottom: '12px', color: '#fff6eb' }}>
            Mekanlar
          </span>
          <span className="block font-playfair text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.1] tracking-tight relative inline-block" style={{ marginTop: '12px', marginBottom: '12px', color: '#fff6eb' }}>
            Hayalleri
            <motion.span
              className="absolute left-0 right-0 h-0.5 lg:h-1"
              style={{ bottom: '8px', backgroundColor: '#B8976A', transformOrigin: 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            />
          </span>
          <span className="block font-playfair text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal leading-[1.1] tracking-tight" style={{ marginTop: '12px', color: '#fff6eb' }}>
            Şekillendirir
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base lg:text-lg max-w-2xl mx-auto mb-10 lg:mb-12 leading-relaxed font-light" style={{ marginBottom: '10px', marginTop: '10px', color: '#fff6eb' }}
        >
          Modern mimarlık anlayışıyla, yaşam alanlarınızı sanatsal ve işlevsel
          çözümlerle tasarlıyoruz.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ marginBottom: '60px' }}
        >
          <Button href="/projects" variant="primary">
            Projelerimizi Keşfedin
          </Button>

          <Button href="/contact" variant="outline">
            İletişime Geçin
          </Button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
            style={{ color: '#B8976A' }}
          >
            <span className="text-xs font-light tracking-widest uppercase">Scroll</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 3L8 13M8 13L13 8M8 13L3 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
