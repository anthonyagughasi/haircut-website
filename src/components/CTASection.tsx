import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scissors, Clock, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-card to-background" />
      
      {/* Decorative scissors pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 transform rotate-45">
          <Scissors className="w-32 h-32 text-primary" />
        </div>
        <div className="absolute bottom-10 right-10 transform -rotate-45">
          <Scissors className="w-32 h-32 text-primary" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
              Ready?
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Book Your Experience
            </h2>
            <div className="section-divider mb-8" />
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12">
              Join the ranks of gentlemen who demand nothing but the best. 
              Your transformation awaits.
            </p>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Hours</h3>
              <p className="text-sm text-muted-foreground">
                Tue-Fri: 9AM-7PM<br />
                Sat: 9AM-5PM
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 text-center">
              <MapPin className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-sm text-muted-foreground">
                123 Style Avenue<br />
                Downtown District
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 text-center">
              <Phone className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-1">Contact</h3>
              <p className="text-sm text-muted-foreground">
                (555) 123-4567<br />
                info@bladefade.com
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/booking">
              <Button variant="hero" size="xl" className="animate-pulse-gold">
                Book Your Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
