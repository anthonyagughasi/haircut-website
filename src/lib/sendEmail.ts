export async function sendBookingEmail(booking: any) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFICATION_EMAIL) {
    console.warn('Resend not configured - skipping email');
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Bookings <onboarding@resend.dev>',
        to: [process.env.NOTIFICATION_EMAIL],
        subject: `New Booking: ${booking.name} - ${booking.service}`,
        html: `
          <h2>New Appointment Booking</h2>
          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Email:</strong> ${booking.email}</p>
          <p><strong>Service:</strong> ${booking.service}</p>
          <p><strong>Stylist:</strong> ${booking.stylist || 'Any'}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.time}</p>
          ${booking.notes ? `<p><strong>Notes:</strong> ${booking.notes}</p>` : ''}
          <hr>
          <p>View all bookings in your <a href="https://app.supabase.com">Supabase Dashboard</a></p>
        `,
      }),
    });

    if (!res.ok) {
      console.error('Failed to send email', await res.text());
    }
  } catch (err) {
    console.error('Email send error', err);
  }
}
