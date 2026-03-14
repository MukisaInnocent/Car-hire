'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Car, Users, Fuel, Settings, ArrowRight, Phone, Star,
  MapPin, Calendar, User, Mail, Briefcase, Shield,
  Clock, Award, ChevronRight, Play,
  UserCheck, Plane, Building2, PartyPopper
} from 'lucide-react';
import { COMPANY, VEHICLES, SERVICES_LIST } from '@/lib/constants';
import { useState } from 'react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const SERVICE_ICONS = {
  'self-drive': <Car size={26} />,
  'chauffeur': <UserCheck size={26} />,
  'airport-transfers': <Plane size={26} />,
  'corporate': <Building2 size={26} />,
  'event-transport': <PartyPopper size={26} />,
};

const STATS = [
  { value: '500+', label: 'Happy Clients', icon: <Users size={22} /> },
  { value: '6', label: 'Premium Vehicles', icon: <Car size={22} /> },
  { value: '24/7', label: 'Availability', icon: <Clock size={22} /> },
  { value: '5★', label: 'Avg. Rating', icon: <Star size={22} /> },
];

export default function HomePage() {
  const popularCars = VEHICLES.slice(0, 3);
  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    pickup_location: '',
    pickup_date: '',
    vehicle_type: '',
    service_type: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleQuickBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ customer_name: '', phone: '', email: '', pickup_location: '', pickup_date: '', vehicle_type: '', service_type: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      {/* =========== HERO =========== */}
      <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden">
        {/* Real car background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=85"
            alt="Luxury car on road"
            fill
            className="object-cover object-center"
            priority
            unoptimized
          />
          <div className="absolute inset-0 hero-overlay" />
          {/* Extra dark gradient for text legibility */}
          <div className="absolute inset-0" style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)'
          }} />
        </div>

        {/* Subtle gold particle orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #D4A843, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-8"
            style={{ background: 'radial-gradient(circle, #D4A843, transparent 70%)', filter: 'blur(80px)' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center md:text-left">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-6">
              <span className="badge-gold">Premium Car Rental in Uganda</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-6 text-white"
            >
              Luxury Cars<br />
              <span className="text-gradient-gold">At Your Door</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              Experience hassle-free car rental with door-to-door delivery across
              Kampala & upcountry Uganda. 24/7 availability, insured vehicles.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-center md:items-start justify-center md:justify-start">
              <Link href="/fleet" className="btn-primary text-base px-8 py-4">
                <Car size={18} />
                View Our Fleet
                <ArrowRight size={16} />
              </Link>
              <Link href="/booking" className="btn-outline text-base px-8 py-4">
                Book Now
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar at bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0"
        >
          <div
            className="max-w-7xl mx-auto mx-auto grid grid-cols-2 md:grid-cols-4 gap-0"
            style={{
              background: 'rgba(0,0,0,0.75)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(212,168,67,0.2)',
            }}
          >
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center gap-3 p-5 sm:p-6 text-center sm:text-left"
                style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
              >
                <span style={{ color: 'var(--color-gold)', opacity: 0.9 }}>{stat.icon}</span>
                <div>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-36 md:bottom-28 right-8 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.4)', writingMode: 'vertical-rl' }}>SCROLL</span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-transparent to-[var(--color-gold)] rounded-full" />
        </motion.div>
      </section>

      {/* =========== SERVICES OVERVIEW =========== */}
      <section className="py-28 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-4">
              <span className="badge-gold">What We Offer</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">
              Our Premium <span className="text-gradient-gold">Services</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              From self-drive rentals to executive chauffeur services — we&apos;ve got every journey covered.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES_LIST.map((service) => (
                <motion.div
                  key={service.slug}
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-8 group cursor-default"
                  style={{ transition: 'transform 0.3s ease' }}
                  whileHover={{ y: -6 }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: 'rgba(212,168,67,0.1)',
                      color: 'var(--color-gold)',
                      border: '1px solid rgba(212,168,67,0.2)',
                    }}
                  >
                    {SERVICE_ICONS[service.slug as keyof typeof SERVICE_ICONS] || <Car size={26} />}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3 transition-colors duration-300"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    {service.description}
                  </p>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    Book This Service <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========== WHY CHOOSE US =========== */}
      <section className="py-20 px-4" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden h-[450px]"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=85"
                alt="Toyota Harrier SUV"
                fill
                className="object-cover"
                unoptimized
              />
              <div
                className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl"
                style={{
                  background: 'rgba(8,8,8,0.82)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(212,168,67,0.2)',
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold">Toyota Harrier</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Premium SUV • 5 Seats</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{ color: 'var(--color-gold)' }}>$120</p>
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>per day</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text side */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-4">
                <span className="badge-gold">Why Choose Us</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
                Uganda&apos;s Most{' '}
                <span className="text-gradient-gold">Trusted</span>{' '}
                Car Rental
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                We go beyond just renting cars — we deliver a seamless, reliable experience from booking to drop-off.
              </motion.p>

              <motion.div variants={stagger} className="space-y-4">
                {[
                  { icon: <Shield size={20} />, title: 'Fully Insured Vehicles', desc: 'Every car in our fleet is comprehensively insured for your peace of mind.' },
                  { icon: <Clock size={20} />, title: '24/7 Availability', desc: 'Day or night, we are always available to serve you across Uganda.' },
                  { icon: <MapPin size={20} />, title: 'Door-to-Door Delivery', desc: 'We bring the car directly to your home, hotel, or office — no trips needed.' },
                  { icon: <Award size={20} />, title: 'Professional Drivers', desc: 'Licensed, experienced, and courteous drivers on all chauffeur bookings.' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200"
                    style={{ background: 'var(--input-bg)', border: '1px solid var(--border-color)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: 'rgba(212,168,67,0.12)', color: 'var(--color-gold)' }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{item.title}</h4>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========== POPULAR CARS =========== */}
      <section className="py-28 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-4">
              <span className="badge-gold">Our Fleet</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">
              Popular <span className="text-gradient-gold">Vehicles</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Explore our most requested cars — all well-maintained, insured, and ready for you.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularCars.map((car) => (
                <motion.div
                  key={car.slug}
                  variants={fadeUp}
                  className="glass-card rounded-2xl overflow-hidden group"
                  whileHover={{ y: -8 }}
                  style={{ transition: 'transform 0.3s ease' }}
                >
                  {/* Real Car Image */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={(car as typeof car & { image?: string }).image || ''}
                      alt={car.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    {/* Type badge */}
                    <span
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(212,168,67,0.9)',
                        color: '#000',
                      }}
                    >
                      {car.type}
                    </span>
                    {/* Price overlay */}
                    <div className="absolute bottom-4 right-4">
                      <span className="text-2xl font-black text-white">${car.price}</span>
                      <span className="text-xs text-white/70">/day</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3
                      className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-[var(--color-gold)]"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {car.name}
                    </h3>
                    <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {car.description}
                    </p>

                    {/* Specs */}
                    <div
                      className="flex items-center gap-4 text-xs mb-5 pb-5"
                      style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                    >
                      <span className="flex items-center gap-1.5">
                        <Users size={13} style={{ color: 'var(--color-gold)' }} />
                        {car.seats} Seats
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Fuel size={13} style={{ color: 'var(--color-gold)' }} />
                        {car.fuel}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Settings size={13} style={{ color: 'var(--color-gold)' }} />
                        {car.transmission}
                      </span>
                    </div>

                    <Link href="/booking" className="btn-primary w-full justify-center text-sm py-3">
                      <Car size={15} /> Book Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="text-center mt-12">
              <Link href="/fleet" className="btn-outline">
                View All Vehicles <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========== QUICK BOOKING FORM =========== */}
      <section className="py-28 px-4" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-4">
              <span className="badge-gold">Quick & Easy</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">
              Book Your <span className="text-gradient-gold">Ride</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              Fill in the form below and we&apos;ll have a car delivered to your location.
            </motion.p>

            <motion.form
              variants={fadeIn}
              onSubmit={handleQuickBook}
              className="glass-card rounded-3xl p-8 md:p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-gold)', opacity: 0.7 }} />
                    <input
                      type="text" required
                      value={formData.customer_name}
                      onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Phone *
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-gold)', opacity: 0.7 }} />
                    <input
                      type="tel" required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                      placeholder="+256 7XX XXXXXX"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Email
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-gold)', opacity: 0.7 }} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Pickup Location *
                  </label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-gold)', opacity: 0.7 }} />
                    <input
                      type="text" required
                      value={formData.pickup_location}
                      onChange={(e) => setFormData({ ...formData, pickup_location: e.target.value })}
                      className="form-input"
                      placeholder="Where should we deliver?"
                    />
                  </div>
                </div>

                {/* Pickup Date */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Pickup Date *
                  </label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-gold)', opacity: 0.7 }} />
                    <input
                      type="date" required
                      value={formData.pickup_date}
                      onChange={(e) => setFormData({ ...formData, pickup_date: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Vehicle Preference */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Vehicle Preference
                  </label>
                  <div className="relative">
                    <Car size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-gold)', opacity: 0.7 }} />
                    <select
                      value={formData.vehicle_type}
                      onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                      className="form-input"
                      style={{ paddingLeft: '2.75rem' }}
                    >
                      <option value="">Any Vehicle</option>
                      {VEHICLES.map((v) => (
                        <option key={v.slug} value={v.name}>{v.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Type */}
              <div className="mt-5">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Service Type
                </label>
                <div className="relative">
                  <Briefcase size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-gold)', opacity: 0.7 }} />
                  <select
                    value={formData.service_type}
                    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '2.75rem' }}
                  >
                    <option value="">Select service</option>
                    {SERVICES_LIST.map((s) => (
                      <option key={s.slug} value={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="btn-primary w-full justify-center mt-8 py-4 text-base disabled:opacity-50"
              >
                {formStatus === 'sending' ? 'Submitting...' : (
                  <><Car size={18} /> Submit Booking Request <ArrowRight size={16} /></>
                )}
              </button>

              {formStatus === 'success' && (
                <div
                  className="mt-4 p-4 rounded-xl text-center text-sm font-medium"
                  style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#4ade80' }}
                >
                  ✓ Booking submitted! We&apos;ll contact you shortly.
                </div>
              )}
              {formStatus === 'error' && (
                <div
                  className="mt-4 p-4 rounded-xl text-center text-sm font-medium"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}
                >
                  ✗ Something went wrong. Please try again or call us.
                </div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* =========== TESTIMONIALS =========== */}
      <section className="py-28 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="text-center mb-4">
              <span className="badge-gold">Testimonials</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="section-title">
              What Our <span className="text-gradient-gold">Clients Say</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              {[
                { name: 'Sarah Nakamya', role: 'Kampala', comment: 'Excellent service! The car was delivered right to my doorstep in Kampala. Very clean and well-maintained Toyota Harrier.', rating: 5 },
                { name: 'David Ssemakula', role: 'Wedding Client', comment: 'Used their chauffeur service for a wedding. The driver was professional, punctual, and the Alphard was spotless.', rating: 5 },
                { name: 'Grace Achieng', role: 'Mbarara Trip', comment: 'Rented a Subaru Forester for a trip to Mbarara. Great vehicle for the journey. Competitive prices.', rating: 4 },
                { name: 'James Otim', role: 'Airport Pickup', comment: 'Airport pickup was seamless. Driver was waiting when I arrived at Entebbe. Affordable and reliable.', rating: 5 },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-6"
                  whileHover={{ y: -4 }}
                  style={{ transition: 'transform 0.3s ease' }}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        size={14}
                        fill={j < t.rating ? 'var(--color-gold)' : 'none'}
                        style={{ color: 'var(--color-gold)', opacity: j < t.rating ? 1 : 0.25 }}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
                    &ldquo;{t.comment}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: 'rgba(212,168,67,0.15)', color: 'var(--color-gold)' }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========== CTA =========== */}
      <section className="py-28 px-4 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=1600&q=80"
            alt="Car on road at night"
            fill
            className="object-cover opacity-15"
            unoptimized
          />
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(212,168,67,0.08) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="mb-4">
              <span className="badge-gold">Ready to Go?</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Ready to Hit the{' '}
              <span className="text-gradient-gold">Road?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Get a car delivered to your doorstep today. Call us or book online — it&apos;s that simple.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-primary text-lg px-10 py-4">
                <Car size={20} /> Book Online Now
              </Link>
              <a href={`tel:${COMPANY.phone}`} className="btn-outline text-lg px-10 py-4">
                <Phone size={18} /> Call {COMPANY.phone}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
