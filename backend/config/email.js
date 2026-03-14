const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendBookingConfirmation = async (booking) => {
  try {
    await transporter.sendMail({
      from: `"At Your Door Car Hiring" <${process.env.SMTP_USER}>`,
      to: booking.email,
      subject: `Booking Confirmation - ${booking.booking_ref}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; border-radius: 12px; overflow: hidden;">
          <div style="background: #D4A843; padding: 20px; text-align: center;">
            <h1 style="color: #000; margin: 0;">Booking Confirmed!</h1>
          </div>
          <div style="padding: 30px;">
            <p>Dear <strong>${booking.customer_name}</strong>,</p>
            <p>Your booking has been received. Here are your details:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr><td style="padding: 8px; color: #D4A843;">Reference:</td><td style="padding: 8px;">${booking.booking_ref}</td></tr>
              <tr><td style="padding: 8px; color: #D4A843;">Vehicle:</td><td style="padding: 8px;">${booking.vehicle_type || 'Any Available'}</td></tr>
              <tr><td style="padding: 8px; color: #D4A843;">Service:</td><td style="padding: 8px;">${booking.service_type || 'Standard'}</td></tr>
              <tr><td style="padding: 8px; color: #D4A843;">Pickup:</td><td style="padding: 8px;">${booking.pickup_location}</td></tr>
              <tr><td style="padding: 8px; color: #D4A843;">Pickup Date:</td><td style="padding: 8px;">${new Date(booking.pickup_date).toLocaleDateString()}</td></tr>
              ${booking.return_date ? `<tr><td style="padding: 8px; color: #D4A843;">Return Date:</td><td style="padding: 8px;">${new Date(booking.return_date).toLocaleDateString()}</td></tr>` : ''}
            </table>
            <p>We will contact you shortly to confirm the details.</p>
            <p style="color: #D4A843;">Thank you for choosing At Your Door Car Hiring Services!</p>
            <hr style="border-color: #333; margin: 20px 0;">
            <p style="font-size: 12px; color: #888;">📞 +256 757120939 | ✉️ musinguzijordan83@gmail.com</p>
          </div>
        </div>
      `,
    });
    console.log('Confirmation email sent to', booking.email);
  } catch (error) {
    console.error('Failed to send confirmation email:', error.message);
  }
};

const sendAdminNotification = async (booking) => {
  try {
    await transporter.sendMail({
      from: `"At Your Door System" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Booking - ${booking.booking_ref}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Booking Received</h2>
          <p><strong>Ref:</strong> ${booking.booking_ref}</p>
          <p><strong>Customer:</strong> ${booking.customer_name}</p>
          <p><strong>Phone:</strong> ${booking.phone}</p>
          <p><strong>Email:</strong> ${booking.email || 'N/A'}</p>
          <p><strong>Vehicle:</strong> ${booking.vehicle_type || 'Any'}</p>
          <p><strong>Service:</strong> ${booking.service_type || 'Standard'}</p>
          <p><strong>Pickup Location:</strong> ${booking.pickup_location}</p>
          <p><strong>Pickup Date:</strong> ${booking.pickup_date}</p>
          <p><strong>Return Date:</strong> ${booking.return_date || 'N/A'}</p>
          <p><strong>Special Requests:</strong> ${booking.special_requests || 'None'}</p>
        </div>
      `,
    });
    console.log('Admin notification sent');
  } catch (error) {
    console.error('Failed to send admin notification:', error.message);
  }
};

module.exports = { sendBookingConfirmation, sendAdminNotification };
