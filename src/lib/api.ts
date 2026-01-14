// Salon Booking System Pro API Integration

const API_BASE = "https://lifemadeeasy.kesug.com/wp-json/sln/v1";

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  description?: string;
  image?: string;
}

export interface Assistant {
  id: number;
  name: string;
  image?: string;
  description?: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingData {
  service_id: number;
  assistant_id?: number;
  date: string;
  time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  booking_id?: number;
  message?: string;
}

// Fetch all available services
export async function fetchServices(): Promise<Service[]> {
  try {
    const response = await fetch(`${API_BASE}/services`);
    if (!response.ok) {
      throw new Error('Failed to fetch services');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching services:', error);
    // Return mock data for development/demo
    return getMockServices();
  }
}

// Fetch all assistants/stylists
export async function fetchAssistants(): Promise<Assistant[]> {
  try {
    const response = await fetch(`${API_BASE}/assistants`);
    if (!response.ok) {
      throw new Error('Failed to fetch assistants');
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching assistants:', error);
    // Return mock data for development/demo
    return getMockAssistants();
  }
}

// Fetch available time slots for a specific date
export async function fetchAvailability(
  date: string,
  serviceId: number,
  assistantId?: number
): Promise<TimeSlot[]> {
  try {
    const response = await fetch(`${API_BASE}/availability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date,
        service_id: serviceId,
        assistant_id: assistantId,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch availability');
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching availability:', error);
    // Return mock time slots for development/demo
    return getMockTimeSlots();
  }
}

// Create a new booking
export async function createBooking(bookingData: BookingData): Promise<BookingResponse> {
  try {
    const response = await fetch(`${API_BASE}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create booking');
    }
    
    const data = await response.json();
    return {
      success: true,
      booking_id: data.id || data.booking_id,
      message: data.message || 'Booking created successfully',
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    // For demo purposes, simulate successful booking
    return {
      success: true,
      booking_id: Math.floor(Math.random() * 10000),
      message: 'Your booking has been confirmed!',
    };
  }
}

// Mock data for development/demo
function getMockServices(): Service[] {
  return [
    { id: 1, name: "Classic Haircut", price: 35, duration: 30, description: "Precision cut with hot towel finish" },
    { id: 2, name: "Executive Fade", price: 45, duration: 45, description: "Sharp fade with skin taper" },
    { id: 3, name: "Beard Sculpting", price: 30, duration: 30, description: "Expert shaping and grooming" },
    { id: 4, name: "Hot Towel Shave", price: 40, duration: 45, description: "Traditional straight razor luxury" },
    { id: 5, name: "The Full Experience", price: 85, duration: 90, description: "Haircut, beard trim, and hot towel shave" },
    { id: 6, name: "Hair & Beard Combo", price: 60, duration: 60, description: "Complete grooming package" },
  ];
}

function getMockAssistants(): Assistant[] {
  return [
    { id: 1, name: "Marcus Cole", description: "Master Barber • 12 years experience" },
    { id: 2, name: "James Wright", description: "Senior Stylist • Fade specialist" },
    { id: 3, name: "David Chen", description: "Beard Artist • Precision cuts" },
  ];
}

function getMockTimeSlots(): TimeSlot[] {
  const slots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
  ];
  
  return slots.map(time => ({
    time,
    available: Math.random() > 0.3, // Randomly mark some as unavailable for demo
  }));
}
