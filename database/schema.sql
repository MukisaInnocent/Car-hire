-- At Your Door Car Hiring Services — Database Schema
-- PostgreSQL

-- Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  image_url VARCHAR(500),
  seating_capacity INT NOT NULL DEFAULT 5,
  fuel_type VARCHAR(50) NOT NULL DEFAULT 'Petrol',
  transmission VARCHAR(50) NOT NULL DEFAULT 'Automatic',
  price_per_day DECIMAL(10,2) NOT NULL DEFAULT 0,
  description TEXT,
  vehicle_type VARCHAR(100) DEFAULT 'Sedan',
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  icon VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  booking_ref VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(200),
  pickup_location VARCHAR(500) NOT NULL,
  dropoff_location VARCHAR(500),
  pickup_date TIMESTAMP NOT NULL,
  return_date TIMESTAMP,
  vehicle_type VARCHAR(200),
  service_type VARCHAR(200),
  special_requests TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(200) NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ======================
-- SEED DATA
-- ======================

-- Default admin (password: admin123)
INSERT INTO admin_users (username, password_hash, full_name)
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jordan Musinguzi')
ON CONFLICT (username) DO NOTHING;

-- Vehicles
INSERT INTO vehicles (name, slug, seating_capacity, fuel_type, transmission, price_per_day, description, vehicle_type, image_url) VALUES
('Toyota Alphard', 'toyota-alphard', 7, 'Petrol', 'Automatic', 150.00, 'Luxury MPV with spacious interior, perfect for executive travel and family trips. Features premium comfort and advanced safety systems.', 'MPV', '/vehicles/alphard.jpg'),
('Subaru Legacy', 'subaru-legacy', 5, 'Petrol', 'Automatic', 80.00, 'Reliable midsize sedan with excellent handling and fuel efficiency. Perfect for city driving and short trips.', 'Sedan', '/vehicles/legacy.jpg'),
('Subaru Forester', 'subaru-forester', 5, 'Petrol', 'Automatic', 100.00, 'Versatile SUV with all-wheel drive, ideal for both urban and upcountry adventures across Uganda.', 'SUV', '/vehicles/forester.jpg'),
('Toyota Wish', 'toyota-wish', 7, 'Petrol', 'Automatic', 90.00, 'Compact MPV that combines fuel efficiency with ample passenger space. Great for group travel.', 'MPV', '/vehicles/wish.jpg'),
('Toyota Harrier', 'toyota-harrier', 5, 'Petrol', 'Automatic', 120.00, 'Premium SUV with elegant design and powerful performance. A luxurious choice for all terrains.', 'SUV', '/vehicles/harrier.jpg'),
('Toyota Premio', 'toyota-premio', 5, 'Petrol', 'Automatic', 70.00, 'Economical and dependable sedan, perfect for everyday commuting and business travel.', 'Sedan', '/vehicles/premio.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Services
INSERT INTO services (title, slug, description, icon) VALUES
('Self-Drive Car Rental', 'self-drive', 'Rent a well-maintained vehicle and explore Uganda at your own pace. All our cars come fully insured with 24/7 roadside assistance.', 'car'),
('Chauffeur Services', 'chauffeur', 'Professional, experienced drivers who know every route. Sit back and relax while we handle the driving for you.', 'user'),
('Airport Transfers', 'airport-transfers', 'Timely and reliable airport pickup and drop-off services at Entebbe International Airport. Never miss a flight again.', 'plane'),
('Corporate Contracts', 'corporate', 'Flexible long-term car hire solutions for businesses. Dedicated fleet management and priority booking for corporate clients.', 'briefcase'),
('Event Transportation', 'event-transport', 'Weddings, conferences, and special events covered. We provide elegant vehicles and coordinated transport for any occasion.', 'calendar')
ON CONFLICT (slug) DO NOTHING;

-- Sample Testimonials
INSERT INTO testimonials (customer_name, rating, comment) VALUES
('Sarah Nakamya', 5, 'Excellent service! The car was delivered right to my doorstep in Kampala. Very clean and well-maintained Toyota Harrier. Will definitely use again.'),
('David Ssemakula', 5, 'Used their chauffeur service for a wedding. The driver was professional, punctual, and the Alphard was spotless. Highly recommended!'),
('Grace Achieng', 4, 'Rented a Subaru Forester for a trip to Mbarara. Great vehicle for the journey. Competitive prices compared to other rental companies.'),
('James Otim', 5, 'Airport pickup was seamless. Driver was waiting when I arrived at Entebbe. Affordable and reliable. Thank you At Your Door!');
