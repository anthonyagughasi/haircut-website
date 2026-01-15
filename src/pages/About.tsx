import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Award, Users, Clock, Star } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

// High-quality direct online images (no local assets needed)
const heroImage = "https://images.unsplash.com/photo-1555529771-36d2d0f9d131?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1974"; // Barber shop interior
const beardImage = "https://images.unsplash.com/photo-1517832606295-a0d6e20f9315?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1974"; // Beard styling closeup

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Clients" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Clock, value: "50,000+", label: "Haircuts Given" },
  { icon: Star, value: "4.9", label: "Average Rating" },
];

const team = [
  {
    name: "Marcus Cole",
    role: "Master Barber & Founder",
    experience: "15 years",
    specialty: "Classic cuts & razor work",
    image: beardImage,
  },
  {
    name: "James Wright",
    role: "Senior Stylist",
    experience: "10 years",
    specialty: "Modern fades & designs",
    image: beardImage,
  },
  {
    name: "David Chen",
    role: "Beard Specialist",
    experience: "8 years",
    specialty: "Beard sculpting & grooming",
    image: beardImage,
  },
];

const About = () => {
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
              Our Story
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Blade & Fade
            </h1>
            <div className="section-divider" />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={heroImage}
                alt="Our Shop"
                className="rounded-xl shadow-2xl w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Where Tradition Meets <span className="text-gold-gradient">Modern Style</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in 2012, PengFade was born from a simple vision: to create a space
                  where men could experience grooming at its finest. A place where the art of
                  barbering meets the comfort of a gentleman's club.
                </p>
                <p>
                  Our founder, Anthony, trained under some of the world's finest barbers
                  before bringing his expertise back home. His philosophy is simple – every
                  man deserves to look and feel his absolute best.
                </p>
                <p>
                  Today, our team of skilled artisans continues this legacy, blending
                  time-honored techniques with contemporary styles. From precision fades
                  to traditional straight razor shaves, we deliver an experience that
                  goes beyond just a haircut.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="font-serif text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Meet The Team
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Master Craftsmen
            </h2>
            <div className="section-divider" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                </div>
                <h3 className="font-serif text-xl font-bold">{member.name}</h3>
                <p className="text-primary text-sm mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">
                  {member.experience} • {member.specialty}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
              Our Promise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Precision</h3>
                <p className="text-muted-foreground text-sm">
                  Every cut executed with surgical accuracy and attention to detail.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Quality</h3>
                <p className="text-muted-foreground text-sm">
                  Premium products and tools for the finest results.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold mb-2">Experience</h3>
                <p className="text-muted-foreground text-sm">
                  A relaxing atmosphere that makes every visit memorable.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Experience the Difference
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join the thousands of gentlemen who trust us with their style.
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

export default About;
