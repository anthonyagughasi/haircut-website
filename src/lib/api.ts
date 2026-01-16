// Supabase Integration for Bookings
import { supabase } from "./supabaseClient";
import { sendBookingEmail } from "./sendEmail";

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  description?: string;
}

export interface Assistant {
  id: number;
  name: string;
  description?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingData {
  name: string;
  phone: string;
  email: string;
  service: string;
  stylist?: string;
  date: string;
  time: string;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
}

// Mock data for demo (same as before so the site looks full)
export const getMockServices = (): Service[] => [
  { id: 1, name: "Classic Haircut", price: 35, duration: 30, description: "Precision cut with hot towel finish" },
  { id: 2, name: "Executive Fade", price: 45, duration: 45, description: "Sharp fade with skin taper" },
  { id: 3, name: "Beard Sculpting", price: 30, duration: 30, description: "Expert shaping and grooming" },
  { id: 4, name: "Hot Towel Shave", price: 40, duration: 45, description: "Traditional straight razor luxury" },
  { id: 5, name: "The Full Experience", price: 85, duration: 90, description: "Haircut, beard trim, and hot towel shave" },
  { id: 6, name: "Hair & Beard Combo", price: 60, duration: 60, description: "Complete grooming package" },
];

export const getMockAssistants = (): Assistant[] => [
  { id: 1, name: "Marcus Cole", description: "Master Barber • 12 years experience" },
  { id: 2, name: "James Wright", description: "Senior Stylist • Fade specialist" },
  { id: 3, name: "David Chen", description: "Beard Artist • Precision cuts" },
];

export const getMockTimeSlots = (): TimeSlot[] => {
  const slots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];

  return slots.map(time => ({
    time,
    available: Math.random() > 0.3,
  }));
};

// Use mock data for services, assistants, availability (no real API needed)
export async function fetchServices(): Promise<Service[]> {
  return getMockServices();
}

export async function fetchAssistants(): Promise<Assistant[]> {
  return getMockAssistants();
}

export async function fetchAvailability(
  date: string,
  serviceId: number,
  assistantId?: number
): Promise<TimeSlot[]> {
  return getMockTimeSlots();
}

// Real booking creation using Supabase
export async function createBooking(bookingData: BookingData): Promise<BookingResponse> {
  try {
    const { data, error } = await supabase
  .from('Bookings') // capital B
  .insert([
    {
      name: bookingData.name || null,
      phone: bookingData.phone || null,
      email: bookingData.email || null,
      service: bookingData.service || null,
      stylist: bookingData.stylist || null,
      date: bookingData.date ? new Date(bookingData.date).toISOString().split('T')[0] : null, // format as YYYY-MM-DD
      time: bookingData.time || null,
      notes: bookingData.notes || null,
    },
  ])
  .select();

    if (error) throw error;

    // Send email notification to you
    await sendBookingEmail(bookingData);

    return {
      success: true,
      message: "Your appointment has been booked! We'll contact you shortly to confirm.",
    };
  } catch (error: any) {
    console.error('Booking error:', error);
    return {
      success: false,
      message: "Booking failed. Please try again or call us directly.",
    };
  }
}
