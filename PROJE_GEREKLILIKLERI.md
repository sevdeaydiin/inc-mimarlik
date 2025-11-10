# Proje Gereksinimleri - Inc. Mimarlık

## Genel Standartlar

Tüm proje tek bir standartta olacak ve bu standartın dışına çıkılmayacaktır.

---

## 1. Tasarım Tutarlılığı

### 1.1 Sayfa Görünümü
- Tüm sayfalar (Anasayfa, Hakkımızda, Projeler, İletişim) tek tip görünümde olacak
- Sayfa geçişlerinde görsel ve yapısal fark olmayacak
- Tüm sayfalarda aynı layout yapısı kullanılacak
- Header ve Footer tüm sayfalarda sabit konumda ve aynı tasarımda olacak

### 1.2 Renk Standartları
- Tüm sayfaların background renkleri aynı gradient kullanacak
- Background gradient: Yukarıdan aşağıya doğru
  - Top: `#fff6eb`
  - Bottom: `#ffffff` (white)
- Tüm sayfalarda aynı renk paleti kullanılacak:
  - Primary: `#0A0A0A` (Siyah)
  - Accent: `#B8976A` (Altın/Bakır)
  - Background Gradient Top: `#fff6eb`
  - Background Gradient Bottom: `#ffffff`
  - Text Primary: `#0A0A0A`
  - Text Secondary: `#2A2A2A`
  - Background variations: `#F5F1E8`, `#FAF8F3`

### 1.3 Tipografi Standartları
- Tüm sayfalarda aynı font aileleri kullanılacak:
  - Başlıklar: `Playfair Display`
  - Body Text: `Inter`
- Font tipleri değişmeyecek, sadece kalınlık (weight) ve boyutları (size) değişebilir
- Tutarlı font boyutları:
  - Hero Başlık: `text-5xl sm:text-6xl lg:text-7xl xl:text-8xl`
  - Section Başlık: `text-4xl lg:text-6xl`
  - Body Text: `text-base lg:text-lg`
  - Navigation: `text-[16px]`
  - Small Text: `text-sm`

---

## 2. Kod Standartları

### 2.1 Clean Code Prensipleri
- Temiz, okunabilir ve anlaşılır kod yazılacak
- Fonksiyonlar tek bir sorumluluğa sahip olacak (Single Responsibility)
- Kod tekrarından kaçınılacak (DRY - Don't Repeat Yourself)
- Anlamlı değişken ve fonksiyon isimlendirmeleri yapılacak
- Yorum satırları gereksiz yere kullanılmayacak, kod kendini açıklayacak şekilde yazılacak

### 2.2 SOLID Prensipleri
- **Single Responsibility**: Her component tek bir görevi yerine getirecek
- **Open/Closed**: Componentler genişletmeye açık, değişikliğe kapalı olacak
- **Liskov Substitution**: Alt componentler üst componentlerin yerine sorunsuz kullanılabilecek
- **Interface Segregation**: Gerekli olmayan props kullanılmayacak
- **Dependency Inversion**: Yüksek seviye modüller düşük seviye modüllere bağımlı olmayacak

### 2.3 Component Yapısı
- Her component ayrı bir dosyada olacak
- Reusable componentler `components/` dizininde olacak
- Componentler prop-based ve type-safe olacak
- Component isimlendirmeleri PascalCase kullanacak

---

## 3. Reusable Elementler

### 3.1 Renk Yönetimi
- Tüm renkler merkezi bir dosyada tanımlanacak
- Tailwind config'de custom renkler belirlenecek
- Hardcoded renk kodları kullanılmayacak
- Renk değişkenleri semantic isimlendirmeye sahip olacak

### 3.2 Button Standardı
- Tüm butonlar reusable Button component'i kullanacak
- Button varyantları (primary, secondary, outline) tanımlanacak
- Tutarlı padding, border-radius ve transition değerleri kullanılacak
- Hover ve active state'ler tüm butonlarda aynı olacak

### 3.3 Spacing ve Layout
- Tailwind'in spacing scale'i kullanılacak
- Custom spacing değerleri minimize edilecek
- Tutarlı padding ve margin değerleri kullanılacak
- Responsive breakpoint'ler standardize edilecek

---

## 4. Animasyon ve Geçişler

### 4.1 Framer Motion Kullanımı
- Sayfa geçişleri ve elementlerin animasyonları Framer Motion ile yapılacak
- Tüm animasyonlar tutarlı duration ve easing kullanacak
- Performans optimizasyonu için gereksiz animasyonlardan kaçınılacak

### 4.2 Transition Standartları
- Default transition: `transition-all duration-300`
- Hover effect'ler: `duration-200`
- Page animations: `duration-600`

---

## 5. Responsive Tasarım

### 5.1 Breakpoint'ler
- Mobile: `< 640px`
- Tablet: `640px - 1024px`
- Desktop: `> 1024px`
- Large Desktop: `> 1280px`

### 5.2 Mobile-First Approach
- Önce mobile tasarım yapılacak
- Daha sonra tablet ve desktop için optimize edilecek
- Tüm sayfalarda responsive davranış test edilecek

---

## 6. Performans ve Optimizasyon

### 6.1 Image Optimization
- Next.js Image component kullanılacak
- Priority loading gerekli yerlerde belirtilecek
- Uygun image formatları kullanılacak (WebP, AVIF)

### 6.2 Code Splitting
- Dynamic imports gerektiğinde kullanılacak
- Lazy loading uygulanacak
- Bundle size minimize edilecek

---

## 7. Dosya Organizasyonu

### 7.1 Dizin Yapısı
```
/app
  /components        # Reusable components
  /constants         # Renkler, konfigürasyonlar
  /utils            # Helper functions
  /styles           # Global styles
  page.tsx           # Ana sayfa
  layout.tsx         # Root layout
```

### 7.2 İsimlendirme Konvansiyonları
- Components: PascalCase (Header.tsx)
- Utils: camelCase (formatDate.ts)
- Constants: UPPER_SNAKE_CASE veya camelCase
- CSS modules: kebab-case

---

## 8. Erişilebilirlik (Accessibility)

### 8.1 A11y Standartları
- Semantic HTML kullanılacak
- ARIA labels gerekli yerlerde eklenecek
- Keyboard navigation desteklenecek
- Contrast ratio WCAG standartlarına uygun olacak
- Alt text'ler tüm görsellerde bulunacak

---

## 9. SEO Optimizasyonu

### 9.1 Meta Tags
- Her sayfa için uygun meta tags tanımlanacak
- Open Graph tags eklenecek
- Structured data markup kullanılacak

### 9.2 Semantic HTML
- Proper heading hierarchy (h1, h2, h3) kullanılacak
- Section, article, nav gibi semantic taglar kullanılacak

---

## 10. Testing ve Quality Assurance

### 10.1 Code Quality
- ESLint rules takip edilecek
- TypeScript strict mode kullanılacak
- Prettier ile kod formatlanacak

### 10.2 Browser Compatibility
- Modern browser'larda test edilecek
- Safari, Chrome, Firefox, Edge desteği sağlanacak

---

## Sonuç

Bu proje gereksinimleri, projenin tutarlı, sürdürülebilir ve profesyonel bir şekilde geliştirilmesini sağlamak için belirlenmiştir. Tüm geliştirme süreci boyunca bu standartlara uyulacaktır.

**Son Güncelleme:** 1 Kasım 2025
