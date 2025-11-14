'use client';

import { useEffect, useRef, useCallback, ReactNode } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
  isContact?: boolean;
}

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  phoneNumber?: string;
  ctaHref?: string;
}

const defaultNavItems: NavItem[] = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Hakkımızda', href: '/#about' },
  { name: 'Projeler', href: '/projects' },
  { name: 'İletişim', href: '/contact', isContact: true },
];

/**
 * MobileMenuOverlay Component
 * 
 * Prodüksiyon kalitesinde mobil menü overlay bileşeni.
 * - Logo sol üstte
 * - Kapatma butonu sağ üstte (44x44px, erişilebilir)
 * - Nav öğeleri merkezde, büyük font
 * - Divider çizgisi
 * - Alt kısımda telefon ikonu + numara
 * - Framer Motion animasyonları
 * - Erişilebilirlik özellikleri (ARIA, ESC ile kapanma, focus trap)
 */
export default function MobileMenuOverlay({
  isOpen,
  onClose,
  navItems = defaultNavItems,
  phoneNumber = '+90 536 484 55 40',
  ctaHref = '/contact',
}: MobileMenuOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const firstNavItemRef = useRef<HTMLAnchorElement>(null);

  // ESC ile kapanma
  useEffect(() => {
    if (!isOpen) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isOpen, onClose]);

  // Body scroll kilitleme açık olduğunda
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Fokus yönetimi: menu açılırken kapatma butonuna fokus
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  const handleNavItemClick = () => {
    onClose();
  };

  // prefers-reduced-motion kontrol
  const prefersReducedMotion = () => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  };

  const transition = prefersReducedMotion()
    ? { duration: 0 }
    : { duration: 0.3 };

  const navItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: prefersReducedMotion() ? 0 : i * 0.05,
        duration: 0.2,
      },
    }),
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center lg:hidden w-screen h-screen overflow-hidden"
          onClick={handleOverlayClick}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={transition}
          role="presentation"
        >
          {/* Backdrop with shadow effect */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            aria-hidden="true"
          />

          {/* Content Container - Full screen */}
          <motion.div
            className="relative z-10 w-full h-full max-w-md mx-auto flex flex-col items-center justify-center bg-bg-light rounded-2xl shadow-2xl overflow-hidden"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={transition}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Close Button - Top Right, Absolute Position */}
            <motion.button
              ref={closeButtonRef}
              onClick={onClose}
              className="absolute top-8 right-6 sm:right-8 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-text-primary hover:bg-text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-text-primary focus:ring-offset-2 focus:ring-offset-white shadow-lg"
              aria-label="Close menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* Scrollable Content - Centered vertically and horizontally */}
            <div className="flex flex-col items-center justify-center px-8 py-12 w-full h-full overflow-y-auto">
              {/* Navigation Items - Centered */}
              <nav className="flex flex-col items-center gap-8 mb-12">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      ref={index === 0 ? firstNavItemRef : null}
                      href={item.href}
                      onClick={handleNavItemClick}
                      className="font-playfair text-4xl sm:text-5xl font-light text-text-primary hover:text-accent focus:outline-none focus:underline transition-colors duration-200"
                      tabIndex={isOpen ? 0 : -1}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Divider */}
              <motion.div
                className="w-16 h-px bg-text-primary/20 mx-auto mb-12"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              />

              {/* Contact Section - Centered */}
              <motion.div
                // Header ile telefon numarası arasındaki boşluğu maksimum artırmak için mt-40 ve gap-16 kullanıldı
                className="flex flex-col items-center gap-16 mt-40"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
              >
                {/* Phone */}
                <a
                  href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 text-2xl sm:text-3xl font-inter text-text-primary/80 hover:text-accent focus:outline-none focus:text-accent transition-colors duration-200 font-bold"
                  tabIndex={isOpen ? 0 : -1}
                  style={{ paddingTop: '3rem' }}
                >
                  <span className="text-2xl sm:text-3xl">📞</span>
                  <span className="text-2xl sm:text-3xl font-bold">{phoneNumber}</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * KULLANIM ÖRNEĞİ:
 * 
 * import { useState } from 'react';
 * import MobileMenuOverlay from '@/app/components/MobileMenuOverlay';
 * 
 * export default function MyComponent() {
 *   const [isMenuOpen, setIsMenuOpen] = useState(false);
 * 
 *   const navItems = [
 *     { name: 'Anasayfa', href: '/' },
 *     { name: 'Hakkımızda', href: '/#about' },
 *     { name: 'Projeler', href: '/projects' },
 *     { name: 'İletişim', href: '/contact' },
 *   ];
 * 
 *   return (
 *     <>
 *       <button onClick={() => setIsMenuOpen(true)}>Menüyü Aç</button>
 *       <MobileMenuOverlay
 *         isOpen={isMenuOpen}
 *         onClose={() => setIsMenuOpen(false)}
 *         navItems={navItems}
 *         phoneNumber="+90 536 484 55 40"
 *         ctaHref="/contact"
 *       />
 *     </>
 *   );
 * }
 */

/**
 * TAILWIND SINIFLAR ÖZETİ:
 * 
 * ┌─────────────────────────────────┬──────────────────────────────────────┐
 * │ Sınıf                           │ Amaç                                 │
 * ├─────────────────────────────────┼──────────────────────────────────────┤
 * │ fixed inset-0 z-40              │ Tam ekran overlay, z-index kontrol   │
 * │ bg-black/50 backdrop-blur-sm    │ Koyu backdrop ve bulanık efekt      │
 * │ rounded-t-3xl                   │ Üst köşeler yuvarlatılmış           │
 * │ bg-primary/95                   │ Koyu gri background (token)         │
 * │ w-11 h-11                       │ 44x44px erişilebilir buton hedefi   │
 * │ rounded-full                    │ Yuvarlak buton                      │
 * │ font-playfair text-3xl          │ Büyük başlık fontu                  │
 * │ text-white hover:text-accent    │ Beyaz yazı, altın hover             │
 * │ focus:ring-2 focus:ring-accent  │ Klavye navigasyon göstergesi        │
 * │ w-56                            │ CTA button genişliği (~224px)       │
 * │ bg-accent rounded-full          │ Altın background, pill şekli        │
 * │ gap-8                           │ Öğeler arasında 32px boşluk         │
 * │ max-h-[90vh]                    │ Maksimum yükseklik 90% viewport     │
 * │ flex-1 overflow-y-auto          │ Scrollable içerik alanı             │
 * └─────────────────────────────────┴──────────────────────────────────────┘
 */
