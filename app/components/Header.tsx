'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Hakkımızda', href: '/#about' },
  { name: 'Projeler', href: '/projects' },
  { name: 'İletişim', href: '/contact', isContact: true },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
        <header
      className="absolute left-0 right-0 z-50 top-6">
      {/* Logo - Always Top Left with 8px padding */}
      <div className="absolute top-0 left-8">
        <Link href="/" className="flex-shrink-0">
          <div className="flex flex-col items-start">
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-normal text-primary leading-none tracking-tight">
              Inc.
            </span>
            <span className="text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] font-light tracking-[0.3em] text-primary uppercase mt-0.5 md:mt-1">
              ARCHITECTURE
            </span>
          </div>
        </Link>
      </div>

      {/* Center Navigation - Desktop Only */}
      <div className="hidden lg:flex justify-center pt-12">
        <nav className="flex items-center">
          <div
            className={`transition-all duration-300 ${
              isScrolled
                ? 'bg-white/95 backdrop-blur-lg shadow-lg'
                : 'bg-white/90 backdrop-blur-md shadow-md'
            } rounded-full`}
            style={{ paddingLeft: '48px', paddingRight: '48px', paddingTop: '12px', paddingBottom: '12px' }}
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

      {/* Mobile Menu Button - Top Right */}
      <div className="lg:hidden absolute top-8 right-8">
        <button
          className="relative w-10 h-10 sm:w-12 sm:h-12 flex flex-col items-center justify-center"
          style={{ gap: '6px' }}
          aria-label="Menu"
        >
          <span className="w-5 sm:w-6 h-0.5 bg-primary rounded-full transition-all duration-300" />
          <span className="w-5 sm:w-6 h-0.5 bg-primary rounded-full transition-all duration-300" />
          <span className="w-5 sm:w-6 h-0.5 bg-primary rounded-full transition-all duration-300" />
        </button>
      </div>
    </header>
  );
}