'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Users, Fuel, Settings, Car, Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { VEHICLES } from '@/lib/constants';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

type VehicleWithImage = typeof VEHICLES[0] & { image?: string };

export default function FleetPage() {
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState('All');
  const [seatFilter, setSeatFilter] = useState('All');

  const types = ['All', ...new Set(VEHICLES.map((v) => v.type))];
  const filtered = VEHICLES.filter((v) => {
    if (typeFilter !== 'All' && v.type !== typeFilter) return false;
    if (seatFilter === '5' && v.seats !== 5) return false;
    if (seatFilter === '7' && v.seats !== 7) return false;
    if (priceFilter === 'low' && v.price > 90) return false;
    if (priceFilter === 'mid' && (v.price < 90 || v.price > 120)) return false;
    if (priceFilter === 'high' && v.price < 120) return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-36 pb-14 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-5">
              <span className="badge-gold">Our Fleet</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Choose Your <span className="text-gradient-gold">Ride</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Browse our collection of well-maintained, insured vehicles. All available for delivery to your doorstep.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="glass-card rounded-2xl p-6 flex flex-wrap gap-5 items-end">
            <div className="flex items-center gap-2 flex-shrink-0" style={{ color: 'var(--color-gold)' }}>
              <SlidersHorizontal size={18} />
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Filter:</span>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Vehicle Type</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="form-input py-2.5"
                style={{ paddingLeft: '1rem' }}
              >
                {types.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Price Range</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="form-input py-2.5"
                style={{ paddingLeft: '1rem' }}
              >
                <option value="All">All Prices</option>
                <option value="low">Under $90/day</option>
                <option value="mid">$90 – $120/day</option>
                <option value="high">Over $120/day</option>
              </select>
            </div>
            <div className="flex-1 min-w-[150px]">
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-secondary)' }}>Seating</label>
              <select
                value={seatFilter}
                onChange={(e) => setSeatFilter(e.target.value)}
                className="form-input py-2.5"
                style={{ paddingLeft: '1rem' }}
              >
                <option value="All">All</option>
                <option value="5">5 Seats</option>
                <option value="7">7 Seats</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles Grid */}
      <section className="pb-28 px-4" style={{ background: 'var(--bg-primary)' }}>
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search size={48} className="mx-auto mb-4 opacity-30" style={{ color: 'var(--text-muted)' }} />
              <p className="text-lg" style={{ color: 'var(--text-muted)' }}>No vehicles match your filters. Try adjusting your criteria.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((car) => {
                const carWithImage = car as VehicleWithImage;
                return (
                  <motion.div
                    key={car.slug}
                    variants={fadeUp}
                    className="glass-card rounded-2xl overflow-hidden group"
                    whileHover={{ y: -8 }}
                    style={{ transition: 'transform 0.3s ease' }}
                  >
                    {/* Real Car Image */}
                    <div className="relative h-52 overflow-hidden">
                      {carWithImage.image ? (
                        <Image
                          src={carWithImage.image}
                          alt={car.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          unoptimized
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center"
                          style={{ background: 'var(--bg-secondary)' }}
                        >
                          <Car size={60} style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold"
                        style={{ background: 'rgba(212,168,67,0.9)', color: '#000' }}
                      >
                        {car.type}
                      </span>
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
                        className="flex items-center gap-3 text-xs mb-5 pb-5 flex-wrap"
                        style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                      >
                        <span
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                          style={{ background: 'var(--input-bg)' }}
                        >
                          <Users size={12} style={{ color: 'var(--color-gold)' }} /> {car.seats} Seats
                        </span>
                        <span
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                          style={{ background: 'var(--input-bg)' }}
                        >
                          <Fuel size={12} style={{ color: 'var(--color-gold)' }} /> {car.fuel}
                        </span>
                        <span
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                          style={{ background: 'var(--input-bg)' }}
                        >
                          <Settings size={12} style={{ color: 'var(--color-gold)' }} /> {car.transmission}
                        </span>
                      </div>

                      <Link href={`/booking?vehicle=${car.name}`} className="btn-primary w-full justify-center text-sm py-3">
                        <Car size={15} /> Book This Vehicle <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
