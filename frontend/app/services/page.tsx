'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ArrowRight, Car, UserCheck, Plane, Building2, PartyPopper } from 'lucide-react';
import { SERVICES_LIST } from '@/lib/constants';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// Real Unsplash images per service
const SERVICE_IMAGES: Record<string, string> = {
  'self-drive':
    'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=85',
  chauffeur:
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=900&q=85',
  'airport-transfers':
    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=85',
  corporate:
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=85',
  'event-transport':
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=85',
};

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  'self-drive': <Car size={22} />,
  chauffeur: <UserCheck size={22} />,
  'airport-transfers': <Plane size={22} />,
  corporate: <Building2 size={22} />,
  'event-transport': <PartyPopper size={22} />,
};

// Detailed bullet points per service
const details: Record<string, string[]> = {
  'self-drive': [
    'Choose from our diverse fleet of well-maintained vehicles.',
    'All cars come fully insured for your peace of mind.',
    '24/7 roadside assistance included with every rental.',
    'Flexible rental periods — from 1 day to several months.',
    'Free delivery and pickup within Kampala and Wakiso.',
  ],
  chauffeur: [
    'Professional, vetted, and experienced drivers.',
    'Drivers knowledgeable about all routes in Uganda.',
    'Executive chauffeur service for VIP and business clients.',
    'Available for daily hire, tours, and special occasions.',
    'Multilingual drivers available on request.',
  ],
  'airport-transfers': [
    'Entebbe International Airport pickup and drop-off.',
    'Flight tracking — we monitor your arrival time.',
    'Meet and greet service with a name board.',
    'Comfortable vehicles with space for luggage.',
    'Available 24/7 including holidays.',
  ],
  corporate: [
    'Dedicated account manager for your company.',
    'Monthly billing and flexible payment terms.',
    'Priority vehicle availability and booking.',
    'Customized fleet solutions for your business needs.',
    'Volume discounts for long-term contracts.',
  ],
  'event-transport': [
    'Wedding car hire with decoration options.',
    'Conference and seminar shuttle services.',
    'Coordinated multi-vehicle event transportation.',
    'Luxury vehicles for special VIP events.',
    'Experienced event logistics coordination.',
  ],
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-16 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-5">
              <span className="badge-gold">Our Services</span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-black mb-6 leading-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Complete Car <span className="text-gradient-gold">Solutions</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              From self-drive rentals to corporate fleet management — we offer comprehensive
              transportation solutions tailored to your needs.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="pb-28 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-6xl mx-auto space-y-14">
          {SERVICES_LIST.map((service, i) => (
            <motion.div
              key={service.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className={`glass-card rounded-3xl overflow-hidden flex flex-col ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Real Image Panel */}
              <div className="md:w-2/5 relative min-h-[280px] md:min-h-[380px] overflow-hidden group">
                <Image
                  src={SERVICE_IMAGES[service.slug] || ''}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      i % 2 === 0
                        ? 'linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0.5))'
                        : 'linear-gradient(to left, rgba(0,0,0,0.1), rgba(0,0,0,0.5))',
                  }}
                />
                {/* Icon badge over image */}
                <div
                  className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 rounded-xl"
                  style={{
                    background: 'rgba(212,168,67,0.92)',
                    color: '#000',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {SERVICE_ICONS[service.slug]}
                  <span className="font-bold text-sm">{service.title}</span>
                </div>
              </div>

              {/* Content Panel */}
              <div
                className="md:w-3/5 p-8 md:p-12 flex flex-col justify-center"
                style={{ background: 'var(--bg-card)' }}
              >
                <h2
                  className="text-2xl md:text-3xl font-bold mb-3"
                  style={{ color: 'var(--color-gold)' }}
                >
                  {service.title}
                </h2>
                <p
                  className="leading-relaxed mb-7 text-base"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {service.description}
                </p>

                <ul className="space-y-3 mb-9">
                  {(details[service.slug] || []).map((point, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <CheckCircle
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: 'var(--color-gold)' }}
                      />
                      <span style={{ color: 'var(--text-secondary)' }}>{point}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/booking?service=${service.title}`}
                  className="btn-primary self-start"
                >
                  Book This Service <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
