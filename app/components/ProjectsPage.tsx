
"use client";
import { SPACING } from "../constants/spacing";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

enum ProjectCategory {
  ALL = "ALL",
  RESIDENTIAL = "RESIDENTIAL",
  INTERIOR = "INTERIOR", 
  OFFICE = "OFFICE",
  LANDSCAPE = "LANDSCAPE"
}

interface Project {
  id: number;
  title: string;
  category: ProjectCategory;
  coverImage: string;
  images: string[];
  description: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Doğal Işıkla Bütünleşen Modern Yatak Odası",
    category: ProjectCategory.INTERIOR,
    coverImage: "/projects/proje1-1.jpeg",
    images: [
      "/projects/proje1-1.jpeg",
      "/projects/proje1-2.jpeg",
      "/projects/proje1-3.jpeg",
      "/projects/proje1-4.jpeg",
      "/projects/proje1-5.jpeg",
      "/projects/proje1-6.jpeg",
    ],
    description: "Minimalist tasarıma sahip, ışık ve mekan oyunuyla hazırlanmış çağdaş konut projesi.",
  },
  {
    id: 2,
    title: "Modern-Lüks Salon Tasarımı",
    category: ProjectCategory.INTERIOR,
    coverImage: "/projects/proje2-1.jpeg",
    images: [
      "/projects/proje2-1.jpeg",
      "/projects/proje2-2.jpeg",
      "/projects/proje2-3.jpeg",
      "/projects/proje2-4.jpeg",
      "/projects/proje2-5.jpeg",
      "/projects/proje2-6.jpeg",
      "/projects/proje2-7.jpeg",
      "/projects/proje2-8.jpeg",
      "/projects/proje2-9.jpeg",
    ],
    description: "Modern ofis mekanı, çalışan verimliliğini artıran ergonomik tasarım ilkeleriyle oluşturulmuş.",
  },
];

const CATEGORIES = [
  ProjectCategory.ALL,
  ProjectCategory.RESIDENTIAL,
  ProjectCategory.OFFICE,
  ProjectCategory.INTERIOR,
  ProjectCategory.LANDSCAPE
];

const getCategoryDisplayName = (category: ProjectCategory): string => {
  switch (category) {
    case ProjectCategory.ALL:
      return "Tümü";
    case ProjectCategory.RESIDENTIAL:
      return "Konut";
    case ProjectCategory.OFFICE:
      return "Ofis";
    case ProjectCategory.INTERIOR:
      return "İç Mekan";
    case ProjectCategory.LANDSCAPE:
      return "Peyzaj";
    default:
      return category;
  }
};

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(ProjectCategory.ALL);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    selectedCategory === ProjectCategory.ALL
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === selectedCategory);

  return (
  <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-bg-gradient-top to-bg-gradient-bottom px-2 sm:px-6 lg:px-16 py-10 sm:py-16 lg:py-24">
      {/* Başlık Bölümü */}
      <section className="pb-10 sm:pb-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-14">
              Projeler
            </h1>
            <p className="font-inter text-base sm:text-lg text-text-secondary max-w-2xl mx-auto">
              Mimarlık ve tasarımda yaratıcılığın sınırlarını zorlayan projelerimizi keşfedin.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kategori Filtreleri */}
      <section className="pt-8 sm:pt-12 pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
            style={{marginTop: '1.5rem', marginBottom: '1.5rem'}}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {CATEGORIES.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`font-inter px-8 sm:px-12 py-3 sm:py-4 rounded-full border transition-all duration-300 text-sm sm:text-base font-medium focus:outline-none focus:ring-2 focus:ring-accent/60 ${
                  selectedCategory === category
                    ? "bg-accent text-[#B8976A] border-accent shadow-lg"
                    : " text-text-primary border-text-primary/30 hover:bg-accent/10 hover:border-accent/60"
                }`}
                style={{paddingLeft: '2rem', paddingRight: '2rem'}}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {getCategoryDisplayName(category)}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projeler Grid */}
      <section className="pt-10 sm:pt-16 pb-20 sm:pb-28 lg:pb-36">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProject(project);
                  setIsModalOpen(true);
                }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
                  <div className="relative w-full h-64 sm:h-72 flex items-center justify-center">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-contain"
                      quality={95}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="font-inter text-white text-sm sm:text-base font-semibold">
                          Proje Detaylarını Gör
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Kart Bilgileri */}
                  <div className="bg-white py-4 sm:py-6 pr-2 sm:pr-4">
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <div>
                        <h3 className="font-playfair text-lg sm:text-xl font-bold text-text-primary pl-4 sm:pl-6" style={{paddingLeft: '1rem'}}>
                          {project.title}
                        </h3>
                      </div>
                    </div>
                    <p className="font-inter text-xs sm:text-sm text-accent font-semibold mb-3 sm:mb-4 pl-4 sm:pl-6" style={{paddingLeft: '1rem'}}>
                      {getCategoryDisplayName(project.category)}
                    </p>
                    <p className="font-inter text-sm sm:text-base text-text-secondary leading-relaxed pl-4 sm:pl-6" style={{paddingLeft: '1rem'}}>
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Boş Sonuç */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="font-inter text-lg text-text-secondary">
                Bu kategoride henüz proje bulunmamaktadır.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-accent" style={{paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '1rem', paddingRight: '1rem'}}>
                <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-text-primary">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-text-primary hover:text-accent transition-colors duration-200 text-2xl"
                  aria-label="Kapat"
                >
                  ✕
                </button>
              </div>

              {/* Carousel */}
              <div className="relative w-full h-96 sm:h-[500px] bg-primary flex items-center justify-center">
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation={{ enabled: true }}
                  pagination={{ clickable: true }}
                  className="w-full h-full"
                >
                  {selectedProject.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={image}
                          alt={`${selectedProject.title} - Görsel ${index + 1}`}
                          fill
                          className="object-contain"
                          quality={95}
                          sizes="(max-width: 768px) 100vw, 80vw"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Modal Content */}
              <div style={{paddingTop: '1rem', paddingBottom: '1rem', paddingLeft: '1rem', paddingRight: '1rem'}}>
                <div style={{marginBottom: '1rem'}}>
                  <span className="font-inter text-sm font-semibold text-white bg-text-primary rounded-full" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
                    {getCategoryDisplayName(selectedProject.category)}
                  </span>
                </div>
                <p className="font-inter text-base text-text-secondary leading-relaxed" style={{lineHeight: '1.7'}}>
                  {selectedProject.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default ProjectsPage;
