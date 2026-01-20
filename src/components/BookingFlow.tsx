import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import confetti from "canvas-confetti";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  User,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Clock,
  Scissors,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  fetchServices,
  fetchAssistants,
  fetchAvailability,
  createBooking,
  type Service,
  type Assistant,
  type TimeSlot
} from "@/lib/api";

const steps = [
  { id: 1, name: "Service", icon: Scissors },
  { id: 2, name: "Stylist", icon: User },
  { id: 3, name: "Date & Time", icon: Calendar },
  { id: 4, name: "Details", icon: MessageSquare },
];

interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
  notes: string;
}

export function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch services on mount
  useEffect(() => {
    const loadServices = async () => {
      setIsLoading(true);
      const data = await fetchServices();
      setServices(data);
      setIsLoading(false);
    };
    loadServices();
  }, []);

  // Fetch assistants when moving to step 2
  useEffect(() => {
    if (currentStep === 2 && assistants.length === 0) {
      const loadAssistants = async () => {
        setIsLoading(true);
        const data = await fetchAssistants();
        setAssistants(data);
        setIsLoading(false);
      };
      loadAssistants();
    }
  }, [currentStep, assistants.length]);

  // Fetch availability when date changes
  useEffect(() => {
    if (selectedDate && selectedService) {
      const loadAvailability = async () => {
        setIsLoading(true);
        setSelectedTime(null);
        const dateStr = selectedDate.toISOString().split("T")[0];
        const data = await fetchAvailability(
          dateStr,
          selectedService.id,
          selectedAssistant?.id
        );
        setTimeSlots(data);
        setIsLoading(false);
      };
      loadAvailability();
    }
  }, [selectedDate, selectedService, selectedAssistant]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setError(null);

    // === DEBUG: Log the exact data being sent ===
    const formData = {
      name: customerDetails.name,
      phone: customerDetails.phone,
      email: customerDetails.email,
      service: selectedService.name,
      stylist: selectedAssistant?.name,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      notes: customerDetails.notes,
    };

    console.log('Form data being sent to createBooking:', formData);

    const result = await createBooking(formData);

    setIsSubmitting(false);

    if (result.success) {
      setBookingId(result.booking_id || null);
      setBookingComplete(true);

      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#d4af37", "#c9a227", "#b8972f"],
      });
    } else {
      setError(result.message || "Failed to create booking. Please try again.");
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedService !== null;
      case 2:
        return true; // Assistant selection is optional
      case 3:
        return selectedDate !== null && selectedTime !== null;
      case 4:
        return customerDetails.name && customerDetails.phone; // email optional
      default:
        return false;
    }
  };

  if (bookingComplete) {
    return <BookingConfirmation bookingId={bookingId} service={selectedService} date={selectedDate} time={selectedTime} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-primary uppercase tracking-[0.3em] text-sm mb-4">
            Book Online
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Reserve Your Seat
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Select your service and preferred time. We'll confirm your appointment instantly.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{
                      scale: currentStep >= step.id ? 1 : 0.8,
                      backgroundColor: currentStep >= step.id
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted))"
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      currentStep >= step.id ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span className={`text-xs mt-2 font-medium ${
                    currentStep >= step.id ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-16 md:w-24 h-0.5 mx-2 transition-colors ${
                      currentStep > step.id ? "bg-primary" : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <StepOne
                key="step1"
                services={services}
                selectedService={selectedService}
                onSelect={setSelectedService}
                isLoading={isLoading}
              />
            )}
            {currentStep === 2 && (
              <StepTwo
                key="step2"
                assistants={assistants}
                selectedAssistant={selectedAssistant}
                onSelect={setSelectedAssistant}
                isLoading={isLoading}
              />
            )}
            {currentStep === 3 && (
              <StepThree
                key="step3"
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                timeSlots={timeSlots}
                onDateChange={setSelectedDate}
                onTimeSelect={setSelectedTime}
                isLoading={isLoading}
              />
            )}
            {currentStep === 4 && (
              <StepFour
                key="step4"
                customerDetails={customerDetails}
                onChange={setCustomerDetails}
                selectedService={selectedService}
                selectedAssistant={selectedAssistant}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
            )}
          </AnimatePresence>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-destructive/10 border border-destructive/50 rounded-lg text-center text-destructive"
            >
              {error}
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex justify-between mt-12"
          >
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="min-w-[120px]"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            {currentStep < 4 ? (
              <Button
                variant="hero"
                onClick={handleNext}
                disabled={!canProceed()}
                className="min-w-[120px]"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="min-w-[160px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </Button>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// The rest of your StepOne, StepTwo, StepThree, StepFour, BookingConfirmation remain the same
// (keep them exactly as you have them)

function StepOne({ /* props */ }) { /* your code */ }
function StepTwo({ /* props */ }) { /* your code */ }
function StepThree({ /* props */ }) { /* your code */ }
function StepFour({ /* props */ }) { /* your code */ }
function BookingConfirmation({ /* props */ }) { /* your code */ }
