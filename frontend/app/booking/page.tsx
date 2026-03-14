'use client';

import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { VEHICLES, SERVICES_LIST } from '@/lib/constants';
import { Suspense } from 'react';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function BookingFormContent() {
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    customer_name: '',
    phone: '',
    email: '',
    pickup_location: '',
    dropoff_location: '',
    pickup_date: '',
    return_date: '',
    vehicle_type: '',
    service_type: '',
    special_requests: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    const vehicle = searchParams.get('vehicle');
    const service = searchParams.get('service');
    if (vehicle) setFormData((d) => ({ ...d, vehicle_type: vehicle }));
    if (service) setFormData((d) => ({ ...d, service_type: service }));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setBookingRef(data.booking?.booking_ref || '');
        setFormData({
          customer_name: '', phone: '', email: '', pickup_location: '', dropoff_location: '',
          pickup_date: '', return_date: '', vehicle_type: '', service_type: '', special_requests: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    'w-full bg-[var(--color-dark)] border border-[var(--color-dark-border)] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:border-[var(--color-gold)] focus:outline-none transition-colors';

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-2xl p-10 text-center max-w-lg mx-auto"
      >
        <div className="text-6xl mb-4">✅</div>
        <h2 className="text-2xl font-bold mb-2">Booking Submitted!</h2>
        {bookingRef && (
          <p className="text-[var(--color-gold)] text-lg font-mono mb-4">Ref: {bookingRef}</p>
        )}
        <p className="text-gray-400 mb-6">
          Thank you! We&apos;ll contact you shortly to confirm your booking. Check your email for a confirmation.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-primary">
          Make Another Booking
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={stagger}
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-8 md:p-10 max-w-3xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Full Name *</label>
          <input type="text" name="customer_name" required value={formData.customer_name} onChange={handleChange} className={inputClass} placeholder="Your full name" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Phone Number *</label>
          <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className={inputClass} placeholder="+256 7XX XXXXXX" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="email@example.com" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Pickup Location *</label>
          <input type="text" name="pickup_location" required value={formData.pickup_location} onChange={handleChange} className={inputClass} placeholder="Where should we deliver?" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Drop-off Location</label>
          <input type="text" name="dropoff_location" value={formData.dropoff_location} onChange={handleChange} className={inputClass} placeholder="Return location (optional)" />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Pickup Date *</label>
          <input type="date" name="pickup_date" required value={formData.pickup_date} onChange={handleChange} className={inputClass} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Return Date</label>
          <input type="date" name="return_date" value={formData.return_date} onChange={handleChange} className={inputClass} />
        </motion.div>
        <motion.div variants={fadeUp}>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Vehicle Type</label>
          <select name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} className={inputClass}>
            <option value="">Any Vehicle</option>
            {VEHICLES.map((v) => (
              <option key={v.slug} value={v.name}>{v.name} — ${v.price}/day</option>
            ))}
          </select>
        </motion.div>
        <motion.div variants={fadeUp} className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Service Type</label>
          <select name="service_type" value={formData.service_type} onChange={handleChange} className={inputClass}>
            <option value="">Select a service</option>
            {SERVICES_LIST.map((s) => (
              <option key={s.slug} value={s.title}>{s.title}</option>
            ))}
          </select>
        </motion.div>
        <motion.div variants={fadeUp} className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Special Requests</label>
          <textarea
            name="special_requests"
            value={formData.special_requests}
            onChange={handleChange}
            rows={3}
            className={inputClass}
            placeholder="Any special requirements or notes..."
          />
        </motion.div>
      </div>

      <motion.button
        variants={fadeUp}
        type="submit"
        disabled={status === 'sending'}
        className="btn-primary w-full justify-center mt-8 py-4 text-base disabled:opacity-50"
      >
        {status === 'sending' ? '⏳ Processing...' : '🚗 Submit Booking Request'}
      </motion.button>

      {status === 'error' && (
        <p className="text-red-400 text-center mt-4">❌ Something went wrong. Please try again or call us at +256 757120939.</p>
      )}
    </motion.form>
  );
}

export default function BookingPage() {
  return (
    <>
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              Booking
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6">
              Reserve Your <span className="text-gradient-gold">Vehicle</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
              Fill in the details below and we&apos;ll deliver a car to your doorstep.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-4">
        <Suspense fallback={<div className="text-center py-10 text-gray-400">Loading...</div>}>
          <BookingFormContent />
        </Suspense>
      </section>
    </>
  );
}
