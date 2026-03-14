'use client';

import { motion, Variants } from 'framer-motion';
import { COMPANY } from '@/lib/constants';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Hello! I would like to inquire about your car rental services.')}`;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              Contact Us
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6">
              Get In <span className="text-gradient-gold">Touch</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have questions? Need a quote? We&apos;re here to help 24/7. Reach out through any of the channels below.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Map */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          {/* Contact Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-6"
          >
            {/* Phone */}
            <motion.a
              href={`tel:${COMPANY.phone}`}
              variants={fadeUp}
              className="glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-[var(--color-gold)]/40 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 gradient-gold rounded-xl flex items-center justify-center text-2xl shrink-0">
                📞
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-[var(--color-gold)] transition-colors">Call Us</h3>
                <p className="text-gray-400">{COMPANY.phone}</p>
                <p className="text-xs text-gray-600 mt-1">Available 24/7</p>
              </div>
            </motion.a>

            {/* Email */}
            <motion.a
              href={`mailto:${COMPANY.email}`}
              variants={fadeUp}
              className="glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-[var(--color-gold)]/40 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 gradient-gold rounded-xl flex items-center justify-center text-2xl shrink-0">
                ✉️
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-[var(--color-gold)] transition-colors">Email Us</h3>
                <p className="text-gray-400">{COMPANY.email}</p>
                <p className="text-xs text-gray-600 mt-1">We respond within 1 hour</p>
              </div>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              className="glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-green-500/40 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center text-2xl shrink-0">
                💬
              </div>
              <div>
                <h3 className="font-bold text-lg group-hover:text-green-400 transition-colors">WhatsApp</h3>
                <p className="text-gray-400">Chat with us instantly</p>
                <p className="text-xs text-gray-600 mt-1">Quick responses guaranteed</p>
              </div>
            </motion.a>

            {/* Location */}
            <motion.div
              variants={fadeUp}
              className="glass-card rounded-2xl p-6 flex items-center gap-5"
            >
              <div className="w-14 h-14 gradient-gold rounded-xl flex items-center justify-center text-2xl shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-bold text-lg">Our Location</h3>
                <p className="text-gray-400">{COMPANY.location}</p>
                <p className="text-xs text-gray-600 mt-1">Serving Kampala, Wakiso & upcountry</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="glass-card rounded-2xl overflow-hidden min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63836.55!2d32.49!3d0.36!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbc079f89631d%3A0x3b5e0e3b9e2e3b7a!2sNansana%2C%20Uganda!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="At Your Door Car Hiring Location - Nansana, Wakiso"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
