import { Navigation } from "@/components/Navigation";
import { BookingFlow } from "@/components/BookingFlow";
import { Footer } from "@/components/Footer";

const Booking = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <BookingFlow />
      <Footer />
    </main>
  );
};

export default Booking;
