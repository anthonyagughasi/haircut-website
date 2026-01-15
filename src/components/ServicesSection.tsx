import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

// High-quality direct online barber images (no local assets needed)
const haircutImage = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
const beardImage = "https://images.unsplash.com/photo-1517832606295-a0d6e20f9315?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";
const toolsImage = "https://images.unsplash.com/photo-1516975080664-e2d87f69fcf1?ixlib=rb-4.0.3&auto=format&fit=crop&q=80";

const services = [
  {
    id: 1,
    name: "Classic Haircut",
    price: 35,
    duration: 30,
    description: "Precision cut with consultation, wash, and style",
    image: haircutImage,
  },
  {
    id: 2,
    name: "Executive Fade",
    price: 45,
    duration: 45,
    description: "Sharp fade with skin taper and hot towel finish",
    image: haircutImage,
  },
  {
    id: 3,
    name: "Beard Sculpting",
    price: 30,
    duration: 30,
    description: "Expert shaping, trimming, and conditioning",
    image: beardImage,
  },
  {
    id: 4,
    name: "Hot Towel Shave",
    price: 40,
    duration: 45,
    description: "Traditional straight razor luxury experience",
    image: toolsImage,
  },
  {
    id: 5,
    name: "The Full Experience",
    price: 85,
    duration: 90,
    description: "Haircut, beard trim, hot towel shave, and facial",
    image: beardImage,
  },
  {
    id: 6,
    name: "Hair & Beard Combo",
    price: 60,
    duration: 60,
    description: "Complete grooming package for the modern gentleman",
    image: haircutImage,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function ServicesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-card to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Our Craft
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Premium Services
          </h2>
          <div className="section-divider mb-6" />
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Each service is an experience crafted with precision, using only the finest products and techniques.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-xl bg-card border border-border/50 card-hover"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
               
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  ${service.price}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
               
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {service.price}
                    </span>
                  </div>
                  <Link to="/booking">
                    <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10">
                      Book →
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to="/services">
            <Button variant="elegant" size="lg">
              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
