"use client";

import Link from "next/link";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-accent text-white pt-16 pb-12 lg:pt-24 lg:pb-16 border-t border-[#B8976A]/20 flex flex-col items-center">
      <div className="max-w-7xl w-full mx-auto px-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-8 place-items-center">
          {/* Brand */}
          <div className="space-y-3">
                        <h3 className="font-playfair text-lg font-semibold text-[#B8976A]">Inc.</h3>
            <ul className="font-inter space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#B8976A]/80 hover:text-[#B8976A] transition-colors duration-200"
                >
                  Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-semibold text-[#B8976A]">Sayfalar</h4>
            <ul className="font-inter space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-[#B8976A]/80 hover:text-[#B8976A] transition-colors duration-200"
                >
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#B8976A]/80 hover:text-[#B8976A] transition-colors duration-200"
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-[#B8976A]/80 hover:text-[#B8976A] transition-colors duration-200"
                >
                  Projeler
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[#B8976A]/80 hover:text-[#B8976A] transition-colors duration-200"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-semibold text-[#B8976A]">İletişim</h4>
            <div className="font-inter space-y-2 text-sm text-[#B8976A]/80">
              <p className="font-medium">Abdulhamit İnce</p>
              <a
                href="tel:+905364845540"
                className="block hover:text-[#B8976A] transition-colors duration-200"
              >
                +90 536 484 55 40
              </a>
              <a
                href="mailto:info@incmimarlik.com"
                className="block hover:text-[#B8976A] transition-colors duration-200"
              >
                info@incmimarlik.com
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-playfair text-lg font-semibold text-[#B8976A]">Sosyal Medya</h4>
            <div className="flex gap-4 text-2xl">
              <a
                href="https://www.instagram.com/inc_arch_studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B8976A]/80 hover:text-[#E4405F] transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.youtube.com/@inc_arch_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B8976A]/80 hover:text-[#FF0000] transition-colors duration-200"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href="https://wa.me/905364845540"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#B8976A]/80 hover:text-[#25D366] transition-colors duration-200"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[#B8976A]/20 w-full flex flex-col items-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#B8976A]/70 w-full max-w-5xl px-4">
            <p className="font-inter">
              © {new Date().getFullYear()} Inc. Architecture. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-6 font-inter">
              <Link
                href="/privacy"
                className="hover:text-[#B8976A] transition-colors duration-200"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/terms"
                className="hover:text-[#B8976A] transition-colors duration-200"
              >
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
