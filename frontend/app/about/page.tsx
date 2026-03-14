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

const values = [
  { icon: '🎯', title: 'Reliability', desc: 'We deliver on our promises — every time, on time.' },
  { icon: '💎', title: 'Quality', desc: 'Well-maintained, insured vehicles that exceed expectations.' },
  { icon: '🤝', title: 'Customer First', desc: 'Your convenience is our top priority in everything we do.' },
  { icon: '💰', title: 'Affordability', desc: 'Competitive rates without compromising on service quality.' },
  { icon: '🔒', title: 'Safety', desc: 'Fully insured vehicles and professional, vetted drivers.' },
  { icon: '🌍', title: 'Accessibility', desc: 'Serving Kampala, Wakiso, and all of upcountry Uganda.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} className="text-[var(--color-gold)] uppercase tracking-[0.3em] text-sm font-semibold mb-4">
              About Us
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black mb-6">
              Driving Uganda <span className="text-gradient-gold">Forward</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Learn about our story, our mission, and the values that make us Uganda&apos;s most trusted car rental service.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4 bg-[var(--color-dark-lighter)]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp}>
              <div className="w-full h-80 glass-card rounded-2xl flex items-center justify-center">
                <span className="text-8xl">🚗</span>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <h2 className="text-3xl font-bold mb-6">Our <span className="text-gradient-gold">Story</span></h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                At Your Door Car Hiring Services was founded with a simple yet powerful idea: car rental should be
                effortless. Based in Nansana-Wakiso, Uganda, we recognized that many people needed reliable
                transportation but found the process of renting a car stressful and time-consuming.
              </p>
              <p className="text-gray-400 leading-relaxed mb-4">
                Under the leadership of Managing Director Jordan Musinguzi, we built a service that brings the car
                directly to the customer&apos;s door — eliminating the hassle of travelling to pick up a vehicle.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Today, we serve clients across Kampala, Wakiso, and upcountry Uganda with a fleet of well-maintained,
                insured vehicles and a team of professional drivers available 24/7.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-10 gold-border">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-[var(--color-gold)] mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed text-lg">{COMPANY.mission}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="glass-card rounded-2xl p-10 gold-border">
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-2xl font-bold text-[var(--color-gold)] mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed text-lg">{COMPANY.vision}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-[var(--color-dark-lighter)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeUp} className="section-title">
              Our <span className="text-gradient-gold">Values</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="section-subtitle">
              The principles that guide everything we do.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-4xl mb-3">{v.icon}</div>
                  <h4 className="text-xl font-bold mb-2">{v.title}</h4>
                  <p className="text-gray-400 text-sm">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
