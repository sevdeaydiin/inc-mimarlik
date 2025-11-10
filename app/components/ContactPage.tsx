"use client";

import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

const ContactPage = () => {
  return (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bg-gradient-top to-bg-gradient-bottom px-4 py-12 sm:px-6 sm:py-20 lg:py-28">
      {/* Başlık ve açıklama - Proje standartlarına uygun */}
      <motion.section
        className="w-full max-w-xl text-center mb-12 lg:mb-16 px-2"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ marginTop: '2rem' }}
      >
        <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
          Bize Ulaşın
        </h1>
        <p className="font-inter text-sm sm:text-base lg:text-lg text-text-secondary px-2">
          Hayalinizdeki projeyi birlikte gerçeğe dönüştürelim.
        </p>
      </motion.section>

      {/* İletişim Formu */}
      <motion.section
        className="w-full max-w-md bg-background-light/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 mb-12 lg:mb-14"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ marginTop: '1rem'}}

      >
  <form className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Ad Soyad"
            className="font-inter border border-accent/20 rounded-md py-2 bg-white/90 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent transition-all duration-300 text-sm"
            style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', paddingTop: '0.2rem', paddingBottom: '0.2rem' }}
            required
          />
          <input
            type="email"
            placeholder="E-posta"
            className="font-inter border border-accent/20 rounded-md py-2 bg-white/90 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent transition-all duration-300 text-sm"
            style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', paddingTop: '0.2rem', paddingBottom: '0.2rem' }}
            required
          />
          <input
            type="tel"
            placeholder="Telefon (opsiyonel)"
            className="font-inter border border-accent/20 rounded-md py-2 bg-white/90 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent transition-all duration-300 text-sm"
            style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', paddingTop: '0.2rem', paddingBottom: '0.2rem' }}
          />
          <textarea
            placeholder="Mesaj"
            className="font-inter border border-accent/20 rounded-md py-2 min-h-[90px] bg-white/90 focus:outline-none focus:ring-1 focus:ring-accent/40 focus:border-accent transition-all duration-300 resize-none text-sm"
            style={{ paddingLeft: '0.5rem', paddingRight: '0.5rem', paddingTop: '0.2rem', paddingBottom: '0.2rem' }}
            required
          />
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ marginBottom: '1rem',  paddingLeft: '2rem', paddingRight: '2rem' }}
              type="submit"
              className="font-inter bg-primary text-accent border border-accent/20 rounded-md px-8 py-4 font-semibold shadow-md hover:bg-accent/5 transition-all duration-300 mt-1 text-base"
            >
              Mesaj Gönder
            </motion.button>
          </div>
        </form>
      </motion.section>

      {/* Sosyal Medya Alanı */}
      <motion.section
        className="flex flex-col items-center gap-4 mb-10 lg:mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{ marginTop: '1rem', marginBottom: '1rem' }}
      >
        <span className="font-inter text-sm text-text-secondary">
          Bizi sosyal medyada takip edin
        </span>
        <div className="flex flex-row gap-6 text-2xl sm:text-3xl">
          <a
            href="https://www.instagram.com/inc_arch_studio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary transition-colors duration-200 hover:text-[#E4405F]"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.youtube.com/@inc_arch_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary transition-colors duration-200 hover:text-[#FF0000]"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
          <a
            href="https://wa.me/905364845540"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary transition-colors duration-200 hover:text-[#25D366]"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </motion.section>

      {/* Telefon Numarası */}
      <motion.section
        className="flex flex-col items-center bg-background-medium/60 backdrop-blur-sm rounded-xl px-8 sm:px-12 py-6 mb-8 lg:mb-10 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span className="font-playfair font-semibold text-lg text-text-primary mb-1">
          Abdulhamit İnce
        </span>
        <a
          href="tel:+905364845540"
          className="font-inter text-lg text-accent hover:text-accent/80 hover:underline transition-all duration-200"
        >
          +90 536 484 55 40
        </a>
      </motion.section>

      {/* Ekstra Bölüm - Samimi Mesaj */}
      <motion.section
        className="text-center max-w-md px-4 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        style={{ marginTop: '1rem' }}
      >
        <p className="font-inter text-sm sm:text-base text-text-secondary/80 italic">
          Her proje yeni bir hikâyedir. Hikayenizi bizimle paylaşın.
        </p>
      </motion.section>
    </main>
  );
};

export default ContactPage;
