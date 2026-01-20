import { motion } from "framer-motion";
import { Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Import your own local images from src/assets
import photo1 from "@/assets/IMG-20251101-WA0051[1].jpg";
import photo2 from "@/assets/1697624400767[1].jpg";

const services = [
  {
    id: 1,
    name: "Classic Haircut",
    price: 35,
    duration: 30,
    description: "Precision cut with consultation, shampoo, and finish styling. Includes hot towel treatment.",
    image: photo1,
    category: "Hair",
  },
  {
    id: 2,
    name: "Executive Fade",
    price: 45,
    duration: 45,
    description: "Sharp skin fade with taper, line-up, and hot towel finish. Perfect for the modern professional.",
    image: photo2,
    category: "Hair",
  },
  {
    id: 3,
    name: "Buzz Cut",
    price: 25,
    duration: 20,
    description: "Clean, uniform length all around. Low maintenance, high style.",
    image: photo1,
    category: "Hair",
  },
  {
    id: 4,
    name: "Kids Haircut",
    price: 25,
    duration: 25,
    description: "Patient, friendly service for our youngest clients (12 and under).",
    image: photo2,
    category: "Hair",
  },
  {
    id: 5,
    name: "Beard Sculpting",
    price: 30,
    duration: 30,
    description: "Expert shaping, trimming, and conditioning. Includes beard oil treatment.",
    image: photo1,
    category: "Beard",
  },
  {
    id: 6,
    name: "Beard Trim",
    price: 20,
    duration: 20,
    description: "Quick maintenance trim to keep your beard looking sharp.",
    image: photo2,
    category: "Beard",
  },
  {
    id: 7,
    name: "Hot Towel Shave",
    price: 40,
    duration: 45,
    description: "Traditional straight razor experience with pre-shave oil, hot towels, and aftershave balm.",
    image: photo1,
    category: "Shave",
  },
  {
    id: 8,
    name: "Head Shave",
    price: 35,
    duration: 40,
    description: "Complete head shave with hot towel treatment and moisturizing finish.",
    image: photo2,
    category: "Shave",
  },
  {
    id: 9,
    name: "The Full Experience",
    price: 85,
    duration: 90,
    description: "Our signature package: haircut, beard sculpting, hot towel shave, and facial massage.",
    image: photo1,
    category: "Packages",
    featured: true,
  },
  {
    id: 10,
    name: "Hair & Beard Combo",
    price: 60,
    duration: 60,
    description: "Complete grooming with haircut and full beard service.",
    image: photo2,
    category: "Packages",
  },
  {
    id: 11,
    name: "Groom's Package",
    price: 120,
    duration: 120,
    description: "Look your best on the big day. Full service with premium products and relaxation time.",
    image: photo1,
    category: "Packages",
    featured: true,
  },
];

const categories = ["All", "Hair", "Beard", "Shave", "Packages"];

const Services = () => {
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
              Our Services
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Premium Grooming Menu
            </h1>
            <div className="section-divider mb-6" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every service is an experience. We use only the finest products and techniques
              to ensure you leave looking and feeling your absolute best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group relative overflow-hidden rounded-xl bg-card border border-border/50 card-hover ${
                  service.featured ? "ring-2 ring-primary" : ""
                }`}
              >
                {/* Featured Badge */}
                {service.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    Popular
                  </div>
                )}
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
                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded text-xs uppercase tracking-wider">
                    {service.category}
                  </div>
                </div>
                {/* Content */}
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
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
          </div>
        </div>
      </section>

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
              Ready to Look Your Best?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Book your appointment now and experience the difference.
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

export default Services;
