'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenuOverlay from './MobileMenuOverlay';

const navItems = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Hakkımızda', href: '/#about' },
  { name: 'Projeler', href: '/projects' },
  { name: 'İletişim', href: '/contact', isContact: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Anasayfada mı kontrol et
  const isHomepage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
        <header className="absolute left-0 right-0 z-50 top-6">
      {/* Mobile Header Container - Logo and Menu aligned horizontally */}
      <div className="lg:hidden flex justify-between items-start px-8 sm:px-12">
        {/* Logo - Mobile */}
        <Link href="/" className="flex-shrink-0">
          <div className="flex flex-col items-start">
            <span 
              className="text-3xl sm:text-4xl font-serif font-normal leading-none tracking-tight transition-colors duration-300" 
              style={{ color: isHomepage ? '#fff6eb' : '#000000' }}
            >
              Inc.
            </span>
            <span 
              className="text-[7px] sm:text-[8px] font-light tracking-[0.3em] uppercase mt-0.5 transition-colors duration-300" 
              style={{ color: isHomepage ? '#fff6eb' : '#000000' }}
            >
              ARCHITECTURE
            </span>
          </div>
        </Link>

        {/* Menu Button - Mobile */}
        <button
          onClick={toggleMobileMenu}
          className="relative w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center justify-center flex-shrink-0"
          style={{ gap: '6px' }}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke={isHomepage ? '#fff6eb' : '#000000'} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <>
              <span className="w-5 sm:w-6 h-0.5 rounded-full transition-all duration-300" style={{ backgroundColor: isHomepage ? '#fff6eb' : '#000000' }} />
              <span className="w-5 sm:w-6 h-0.5 rounded-full transition-all duration-300" style={{ backgroundColor: isHomepage ? '#fff6eb' : '#000000' }} />
              <span className="w-5 sm:w-6 h-0.5 rounded-full transition-all duration-300" style={{ backgroundColor: isHomepage ? '#fff6eb' : '#000000' }} />
            </>
          )}
        </button>
      </div>

      {/* Desktop Logo - Always Top Left with 8px padding */}
      <div className="hidden lg:block absolute top-0 left-8">
        <Link href="/" className="flex-shrink-0">
          <div className="flex flex-col items-start">
            <span 
              className="text-5xl lg:text-6xl xl:text-7xl font-serif font-normal leading-none tracking-tight transition-colors duration-300" 
              style={{ color: isHomepage ? '#fff6eb' : '#000000' }}
            >
              Inc.
            </span>
            <span 
              className="text-[9px] lg:text-[10px] xl:text-[11px] font-light tracking-[0.3em] uppercase mt-0.5 md:mt-1 transition-colors duration-300" 
              style={{ color: isHomepage ? '#fff6eb' : '#000000' }}
            >
              ARCHITECTURE
            </span>
          </div>
        </Link>
      </div>

      {/* Center Navigation - Desktop Only */}
      <div className="hidden lg:flex justify-center pt-12">
        <nav className="flex items-center">
          <div
            className="transition-all duration-300 backdrop-blur-lg shadow-lg rounded-full"
            style={{ 
              paddingLeft: '48px', 
              paddingRight: '48px', 
              paddingTop: '12px', 
              paddingBottom: '12px',
              backgroundColor: isScrolled ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 1)'
            }}
          >
            <ul className="flex items-center" style={{ gap: '84px' }}>
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.isContact ? (
                    <Link
                      href={item.href}
                      className="text-[17px] font-medium text-text-primary hover:text-accent transition-colors duration-200 whitespace-nowrap"
                      scroll={false}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-[17px] font-medium text-text-primary hover:text-accent transition-colors duration-200 whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Mobile Menu - Full Screen */}
      <MobileMenuOverlay
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        phoneNumber="+90 536 484 55 40"
        ctaHref="/contact"
      />
    </header>
  );
}