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
    const result = await createBooking({
      service_id: selectedService.id,
      assistant_id: selectedAssistant?.id,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      customer_name: customerDetails.name,
      customer_email: customerDetails.email,
      customer_phone: customerDetails.phone,
      notes: customerDetails.notes,
    });
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
        return customerDetails.name && customerDetails.email && customerDetails.phone;
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
                    className={w-12 h-12 rounded-full flex items-center justify-center transition-colors ${ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentStep >= step.id ? "text-primary-foreground" : "text-muted-foreground" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </motion.div>
                  <span className={text-xs mt-2 font-medium ${ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentStep >= step.id ? "text-primary" : "text-muted-foreground" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}>
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={hidden sm:block w-16 md:w-24 h-0.5 mx-2 transition-colors ${ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;currentStep > step.id ? "bg-primary" : "bg-muted" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}
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
// Step 1: Select Service
function StepOne({
  services,
  selectedService,
  onSelect,
  isLoading
}: {
  services: Service[];
  selectedService: Service | null;
  onSelect: (service: Service) => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-serif text-2xl font-bold mb-6 text-center">Select Your Service</h2>
     
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 rounded-lg barber-pole" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <motion.button
              key={service.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(service)}
              className={p-6 rounded-xl border text-left transition-all ${ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selectedService?.id === service.id &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;? "border-primary bg-primary/10 ring-2 ring-primary" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: "border-border bg-card hover:border-primary/50" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-serif font-semibold text-lg">{service.name}</h3>
                <span className="text-primary font-bold">${service.price}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {service.duration} min
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
// Step 2: Select Stylist (Optional)
function StepTwo({
  assistants,
  selectedAssistant,
  onSelect,
  isLoading
}: {
  assistants: Assistant[];
  selectedAssistant: Assistant | null;
  onSelect: (assistant: Assistant | null) => void;
  isLoading: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-serif text-2xl font-bold mb-2 text-center">Choose Your Stylist</h2>
      <p className="text-muted-foreground text-center mb-6">Optional - or let us assign the next available</p>
     
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 rounded-lg barber-pole" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* No Preference Option */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(null)}
            className={p-6 rounded-xl border text-center transition-all ${ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selectedAssistant === null &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;? "border-primary bg-primary/10 ring-2 ring-primary" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: "border-border bg-card hover:border-primary/50" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}
          >
            <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif font-semibold">No Preference</h3>
            <p className="text-sm text-muted-foreground mt-1">Next available stylist</p>
          </motion.button>
          {assistants.map((assistant) => (
            <motion.button
              key={assistant.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(assistant)}
              className={p-6 rounded-xl border text-center transition-all ${ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selectedAssistant?.id === assistant.id &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;? "border-primary bg-primary/10 ring-2 ring-primary" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: "border-border bg-card hover:border-primary/50" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}
            >
              <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center overflow-hidden">
                {assistant.image ? (
                  <img src={assistant.image} alt={assistant.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-muted-foreground" />
                )}
              </div>
              <h3 className="font-serif font-semibold">{assistant.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{assistant.description}</p>
            </motion.button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
// Step 3: Select Date & Time
function StepThree({
  selectedDate,
  selectedTime,
  timeSlots,
  onDateChange,
  onTimeSelect,
  isLoading
}: {
  selectedDate: Date | null;
  selectedTime: string | null;
  timeSlots: TimeSlot[];
  onDateChange: (date: Date | null) => void;
  onTimeSelect: (time: string) => void;
  isLoading: boolean;
}) {
  const availableSlots = timeSlots.filter(slot => slot.available);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-serif text-2xl font-bold mb-6 text-center">Pick Your Date & Time</h2>
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Date Picker */}
        <div className="flex justify-center">
          <DatePicker
            selected={selectedDate}
            onChange={onDateChange}
            minDate={new Date()}
            inline
            calendarClassName="!bg-card !border-border rounded-xl"
            filterDate={(date) => {
              const day = date.getDay();
              return day !== 0 && day !== 1; // Closed Sunday & Monday
            }}
          />
        </div>
        {/* Time Slots */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            Available Times
          </h3>
         
          {!selectedDate ? (
            <p className="text-muted-foreground text-center py-8">
              Please select a date first
            </p>
          ) : isLoading ? (
            <div className="flex justify-center py-8">
              <div className="w-10 h-10 rounded-lg barber-pole" />
            </div>
          ) : availableSlots.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No available slots for this date. Please try another day.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => slot.available && onTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={py-3 px-4 rounded-lg text-sm font-medium transition-all ${ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;selectedTime === slot.time &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;? "bg-primary text-primary-foreground" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: slot.available &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;? "bg-card border border-border hover:border-primary" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: "bg-muted/50 text-muted-foreground cursor-not-allowed line-through" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}}
                >
                  {slot.time}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
// Step 4: Customer Details
function StepFour({
  customerDetails,
  onChange,
  selectedService,
  selectedAssistant,
  selectedDate,
  selectedTime
}: {
  customerDetails: CustomerDetails;
  onChange: (details: CustomerDetails) => void;
  selectedService: Service | null;
  selectedAssistant: Assistant | null;
  selectedDate: Date | null;
  selectedTime: string | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-serif text-2xl font-bold mb-6 text-center">Complete Your Booking</h2>
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="name"
              value={customerDetails.name}
              onChange={(e) => onChange({ ...customerDetails, name: e.target.value })}
              placeholder="John Smith"
              className="bg-card"
            />
          </div>
          <div>
            <Label htmlFor="email" className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4" />
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              value={customerDetails.email}
              onChange={(e) => onChange({ ...customerDetails, email: e.target.value })}
              placeholder="john@example.com"
              className="bg-card"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
              <Phone className="w-4 h-4" />
              Phone *
            </Label>
            <Input
              id="phone"
              type="tel"
              value={customerDetails.phone}
              onChange={(e) => onChange({ ...customerDetails, phone: e.target.value })}
              placeholder="(555) 123-4567"
              className="bg-card"
            />
          </div>
          <div>
            <Label htmlFor="notes" className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4" />
              Special Requests
            </Label>
            <Textarea
              id="notes"
              value={customerDetails.notes}
              onChange={(e) => onChange({ ...customerDetails, notes: e.target.value })}
              placeholder="Any specific requests or preferences..."
              className="bg-card resize-none"
              rows={3}
            />
          </div>
        </div>
        {/* Summary */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-serif text-lg font-semibold mb-4">Booking Summary</h3>
         
          <div className="space-y-4">
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium">{selectedService?.name}</span>
            </div>
           
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Stylist</span>
              <span className="font-medium">{selectedAssistant?.name || "Next Available"}</span>
            </div>
           
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">
                {selectedDate?.toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
           
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Time</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
           
            <div className="flex justify-between pb-3 border-b border-border">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium">{selectedService?.duration} min</span>
            </div>
           
            <div className="flex justify-between pt-2">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-bold text-xl text-primary">${selectedService?.price}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
// Booking Confirmation
function BookingConfirmation({
  bookingId,
  service,
  date,
  time
}: {
  bookingId: number | null;
  service: Service | null;
  date: Date | null;
  time: string | null;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-card to-background flex items-center justify-center py-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mx-auto mb-8"
        >
          <Check className="w-10 h-10 text-primary-foreground" />
        </motion.div>
        <h1 className="font-serif text-4xl font-bold mb-4">
          You're All Set!
        </h1>
       
        <p className="text-muted-foreground text-lg mb-8">
          Your appointment has been confirmed. A confirmation email is on its way.
        </p>
        <div className="bg-card border border-border rounded-xl p-6 mb-8 text-left">
          <div className="space-y-3">
            {bookingId && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confirmation #</span>
                <span className="font-mono font-semibold text-primary">#{bookingId}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Service</span>
              <span className="font-medium">{service?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">
                {date?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time</span>
              <span className="font-medium">{time}</span>
            </div>
          </div>
        </div>
        <Button variant="hero" size="lg" onClick={() => window.location.href = "/"}>
          Back to Home
        </Button>
      </motion.div>
    </div>
  );
}
