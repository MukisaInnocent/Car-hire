'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';
import { COMPANY, NAV_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="At Your Door Car Hiring Services"
                width={180}
                height={70}
                className="object-contain"
                style={{ maxHeight: '70px', width: 'auto' }}
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Uganda&apos;s trusted door-to-door car rental service. Reliable vehicles delivered directly to your location.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: <Facebook size={16} />, href: '#', label: 'Facebook' },
                { icon: <Instagram size={16} />, href: '#', label: 'Instagram' },
                { icon: <Twitter size={16} />, href: '#', label: 'Twitter' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{
                    border: '1px solid var(--border-gold)',
                    color: 'var(--color-gold)',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--color-gold)';
                    (e.currentTarget as HTMLElement).style.color = '#000';
                    (e.currentTarget as HTMLElement).style.border = '1px solid var(--color-gold)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'var(--color-gold)';
                    (e.currentTarget as HTMLElement).style.border = '1px solid var(--border-gold)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold mb-5 text-sm uppercase tracking-wider"
              style={{ color: 'var(--color-gold)' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--color-gold)'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-secondary)'; }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3
              className="font-semibold mb-5 text-sm uppercase tracking-wider"
              style={{ color: 'var(--color-gold)' }}
            >
              Our Services
            </h3>
            <ul className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
              <li>Self-Drive Rental</li>
              <li>Chauffeur Services</li>
              <li>Airport Transfers</li>
              <li>Corporate Contracts</li>
              <li>Event Transportation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold mb-5 text-sm uppercase tracking-wider"
              style={{ color: 'var(--color-gold)' }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-3 transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,168,67,0.1)', color: 'var(--color-gold)' }}
                  >
                    <Phone size={14} />
                  </span>
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 transition-colors duration-200"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
                >
                  <span
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(212,168,67,0.1)', color: 'var(--color-gold)' }}
                  >
                    <Mail size={14} />
                  </span>
                  <span className="truncate">{COMPANY.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3" style={{ color: 'var(--text-secondary)' }}>
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(212,168,67,0.1)', color: 'var(--color-gold)' }}
                >
                  <MapPin size={14} />
                </span>
                <span>{COMPANY.location}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border-color)' }}
        >
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Managing Director: {COMPANY.director}
          </p>
        </div>
      </div>
    </footer>
  );
}
