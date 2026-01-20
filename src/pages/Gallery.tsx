import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Import your own local images from src/assets
import photo1 from "@/assets/IMG-20251101-WA0051[1].jpg";
import photo2 from "@/assets/1697624400767[1].jpg";
// Add more when you upload more JPGs

const galleryImages = [
  { id: 1, src: photo1, alt: "Classic Haircut", category: "Haircuts" },
  { id: 2, src: photo2, alt: "Executive Fade", category: "Fades" },
  { id: 3, src: photo1, alt: "Beard Styling", category: "Beards" },
  { id: 4, src: photo2, alt: "Shop Interior", category: "Shop" },
  { id: 5, src: photo1, alt: "Skin Fade", category: "Fades" },
  { id: 6, src: photo2, alt: "Full Beard Grooming", category: "Beards" },
  { id: 7, src: photo1, alt: "Premium Tools", category: "Shop" },
  { id: 8, src: photo2, alt: "Straight Razor Shave", category: "Shop" },
  { id: 9, src: photo1, alt: "Textured Top", category: "Haircuts" },
  { id: 10, src: photo2, alt: "Groomed Look", category: "Beards" },
  { id: 11, src: photo1, alt: "Barber Chair", category: "Shop" },
  { id: 12, src: photo2, alt: "Master Barber at Work", category: "Haircuts" },
];

const categories = ["All", "Haircuts", "Fades", "Beards", "Shop"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Our Work
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Gallery
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our portfolio of precision cuts, expert fades, and beard artistry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-foreground hover:border-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium">{image.alt}</p>
                  <p className="text-xs text-muted-foreground">{image.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl max-h-[80vh] rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              ✕
            </button>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
              <p className="font-serif text-xl font-bold">{selectedImage.alt}</p>
              <p className="text-muted-foreground">{selectedImage.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* CTA */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Transformation?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Let our master barbers create your perfect look.
            </p>
            <Link to="/booking">
              <Button variant="hero" size="xl">
                Book Your Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Gallery;
