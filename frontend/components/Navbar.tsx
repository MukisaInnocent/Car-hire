'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import Image from 'next/image';
import { NAV_LINKS, COMPANY } from '@/lib/constants';
import { useTheme } from '@/components/ThemeProvider';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400`}
      style={{
        background: scrolled
          ? `var(--bg-nav)`
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-color)' : 'none',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div
              className="flex items-center justify-center px-2 py-1 rounded-xl transition-all duration-300 group-hover:opacity-90"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)' }}
            >
              <Image
                src="/logo.png"
                alt="At Your Door Car Hiring Services"
                width={170}
                height={56}
                className="object-contain"
                style={{ maxHeight: '56px', width: 'auto' }}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? 'bg-[var(--color-gold)] text-black'
                    : ''
                }`}
                style={
                  pathname !== link.href
                    ? { color: 'var(--text-secondary)' }
                    : {}
                }
                onMouseEnter={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLElement).style.backgroundColor = 'var(--border-color)';
                    (e.target as HTMLElement).style.color = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== link.href) {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                    (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                  }
                }}
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ml-2"
              style={{
                background: 'var(--input-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <Link href="/booking" className="btn-primary ml-3 text-sm py-2.5 px-6">
              Book Now
            </Link>
          </div>

          {/* Mobile: Theme Toggle + Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'var(--input-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                background: 'var(--input-bg)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden"
            style={{
              background: 'var(--bg-nav)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <div className="px-4 py-5 space-y-1.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    pathname === link.href
                      ? 'bg-[var(--color-gold)] text-black'
                      : ''
                  }`}
                  style={
                    pathname !== link.href
                      ? { color: 'var(--text-secondary)' }
                      : {}
                  }
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/booking" className="btn-primary w-full justify-center mt-3">
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
