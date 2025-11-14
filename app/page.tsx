'use client';

import Header from './components/Header';
import Hero from './components/Hero';
import CenteredCarousel from './components/CenteredCarousel';
import SmoothScrollProvider from './components/SmoothScrollProvider';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { loadProjects } from './lib/projectLoader';
import Project from './models/Project';

export default function Home() {
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
    <SmoothScrollProvider>
      <div className="min-h-screen">
        <Header />
        <Hero />
        
        {/* Project Slider Section */}
        {!loading && projects.length > 0 && (
          <CenteredCarousel projects={projects} />
        )}
        
        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-bg-gradient-top to-bg-gradient-bottom py-20 sm:py-28 lg:py-36">
          <div className="max-w-5xl mx-auto text-center mobile-px" style={{paddingLeft: '1rem', paddingRight: '1rem'}}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{ marginTop: '3rem'}}
            >
              <h2 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary mb-16">
                Hakkımızda
              </h2>
              
              <div className="space-y-8 text-left max-w-4xl mx-auto">
                <motion.p 
                  className="font-inter text-base sm:text-lg text-text-secondary leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  style={{ marginTop: '1.5rem'}}
                >
                  Çağdaş tasarım anlayışını insan odaklı yaklaşımla birleştirerek mekânları yalnızca şekillendirmeyi değil, onlara ruh kazandırmayı hedefler. Her projemizde; estetik, işlevsellik ve sürdürülebilirlik kavramlarını bir bütün olarak ele alırız.
                </motion.p>

                <motion.p 
                  className="font-inter text-base sm:text-lg text-text-secondary leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  Tasarım sürecine her zaman "kullanıcının deneyimi" ile başlarız. Çünkü iyi bir mekân sadece güzel görünen değil, aynı zamanda içinde yaşamayı kolaylaştıran, duygusal bir bağ kurduran mekândır. Bu nedenle; malzeme seçiminden mekânsal akışa, ışık dengesinden renk ilişkilerine kadar her detayı titizlikle planlarız.
                </motion.p>

                <motion.p 
                  className="font-inter text-base sm:text-lg text-text-secondary leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Inc Mimarlık; konut, ticari alan, ofis, mağaza ve iç mekân tasarımı gibi birçok farklı ölçekte projeler üretir. Her proje, bulunduğu çevreyle diyalog kurar, kullanıcıyı merkeze alır ve zamanın ötesinde bir estetik anlayış taşır.
                </motion.p>

                <motion.p 
                  className="font-inter text-base sm:text-lg text-text-secondary leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  Müşterilerimizle kurduğumuz her iletişim, güven ve şeffaflık üzerine inşa edilir. Amacımız yalnızca proje teslim etmek değil; insanların yaşam kalitesini yükselten, kendilerini iyi hissettikleri alanlar yaratmaktır.
                </motion.p>

                <motion.div 
                  className="text-center pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  style={{ marginTop: '1.5rem'}}
                >
                  <blockquote className="font-playfair text-xl sm:text-2xl text-accent font-medium italic leading-relaxed">
                    "Bizim için mimarlık, bir duvar örmek değil; insanla mekân arasında duygusal bir köprü kurmaktır."
                  </blockquote>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </SmoothScrollProvider>
  );
}

