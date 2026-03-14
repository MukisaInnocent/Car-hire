'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface Booking {
  id: number;
  booking_ref: string;
  customer_name: string;
  phone: string;
  email: string;
  pickup_location: string;
  dropoff_location: string;
  pickup_date: string;
  return_date: string;
  vehicle_type: string;
  service_type: string;
  special_requests: string;
  status: string;
  created_at: string;
}

interface Vehicle {
  id: number;
  name: string;
  slug: string;
  seating_capacity: number;
  fuel_type: string;
  transmission: string;
  price_per_day: number;
  description: string;
  vehicle_type: string;
  is_available: boolean;
}

interface Testimonial {
  id: number;
  customer_name: string;
  rating: number;
  comment: string;
  is_visible: boolean;
  created_at: string;
}

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

type Tab = 'bookings' | 'vehicles' | 'testimonials';

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [adminName, setAdminName] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('bookings');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('admin_token');
    const storedUser = localStorage.getItem('admin_user');
    if (!storedToken) {
      router.push('/admin/login');
      return;
    }
    setToken(storedToken);
    if (storedUser) {
      try {
        setAdminName(JSON.parse(storedUser).full_name || 'Admin');
      } catch {
        setAdminName('Admin');
      }
    }
  }, [router]);

  const authFetch = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const res = await fetch(`${API}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...((options.headers as Record<string, string>) || {}),
      },
    });
    if (res.status === 401) {
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
      throw new Error('Unauthorized');
    }
    return res.json();
  }, [token, router]);

  const loadData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [b, v, t] = await Promise.all([
        authFetch('/bookings'),
        authFetch('/vehicles'),
        authFetch('/testimonials'),
      ]);
      setBookings(b);
      setVehicles(v);
      setTestimonials(t);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  }, [token, authFetch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateBookingStatus = async (id: number, status: string) => {
    try {
      await authFetch(`/bookings/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await authFetch(`/testimonials/${id}`, { method: 'DELETE' });
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    confirmed: 'bg-blue-500/20 text-blue-400',
    completed: 'bg-green-500/20 text-green-400',
    cancelled: 'bg-red-500/20 text-red-400',
  };

  const tabs: { key: Tab; label: string; icon: string; count: number }[] = [
    { key: 'bookings', label: 'Bookings', icon: '📋', count: bookings.length },
    { key: 'vehicles', label: 'Vehicles', icon: '🚗', count: vehicles.length },
    { key: 'testimonials', label: 'Testimonials', icon: '⭐', count: testimonials.length },
  ];

  if (!token) return null;

  return (
    <div className="pt-24 pb-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-black">Dashboard</h1>
            <p className="text-gray-500">Welcome back, <span className="text-[var(--color-gold)]">{adminName}</span></p>
          </div>
          <div className="flex gap-3">
            <button onClick={loadData} className="btn-outline text-sm py-2 px-4">
              🔄 Refresh
            </button>
            <button onClick={handleLogout} className="text-sm py-2 px-4 border border-red-500/30 text-red-400 rounded-full hover:bg-red-500/10 transition-colors">
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-xl p-5">
            <p className="text-gray-500 text-sm">Total Bookings</p>
            <p className="text-3xl font-black text-[var(--color-gold)]">{bookings.length}</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-3xl font-black text-yellow-400">{bookings.filter((b) => b.status === 'pending').length}</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <p className="text-gray-500 text-sm">Vehicles</p>
            <p className="text-3xl font-black text-blue-400">{vehicles.length}</p>
          </div>
          <div className="glass-card rounded-xl p-5">
            <p className="text-gray-500 text-sm">Reviews</p>
            <p className="text-3xl font-black text-green-400">{testimonials.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-[var(--color-gold)] text-black'
                  : 'text-gray-400 hover:bg-white/5 border border-[var(--color-dark-border)]'
              }`}
            >
              {tab.icon} {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <p>Loading data...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* BOOKINGS TAB */}
            {activeTab === 'bookings' && (
              <motion.div
                key="bookings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {bookings.length === 0 ? (
                  <div className="text-center py-20 glass-card rounded-2xl text-gray-500">
                    <p className="text-4xl mb-3">📋</p>
                    <p>No bookings yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <div key={booking.id} className="glass-card rounded-xl p-5">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                            <div>
                              <p className="text-gray-600 text-xs">Customer</p>
                              <p className="font-semibold">{booking.customer_name}</p>
                              <p className="text-gray-500">{booking.phone}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs">Vehicle / Service</p>
                              <p className="text-[var(--color-gold)]">{booking.vehicle_type || 'Any'}</p>
                              <p className="text-gray-500">{booking.service_type || '—'}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs">Pickup</p>
                              <p>{booking.pickup_location}</p>
                              <p className="text-gray-500">{new Date(booking.pickup_date).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-gray-600 text-xs">Reference</p>
                              <p className="font-mono text-[var(--color-gold)]">{booking.booking_ref}</p>
                              <p className={`inline-block px-2 py-0.5 rounded-full text-xs mt-1 ${statusColors[booking.status] || ''}`}>
                                {booking.status}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            {booking.status === 'pending' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="text-xs px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                              >
                                Confirm
                              </button>
                            )}
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'completed')}
                                className="text-xs px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                              >
                                Complete
                              </button>
                            )}
                            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                              <button
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="text-xs px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                        {booking.special_requests && (
                          <p className="text-xs text-gray-500 mt-3 border-t border-[var(--color-dark-border)] pt-3">
                            💬 {booking.special_requests}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* VEHICLES TAB */}
            {activeTab === 'vehicles' && (
              <motion.div
                key="vehicles"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="glass-card rounded-xl p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-bold text-lg">{vehicle.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${vehicle.is_available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {vehicle.is_available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-3">{vehicle.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        <span className="bg-[var(--color-dark)] px-2 py-1 rounded">👤 {vehicle.seating_capacity} seats</span>
                        <span className="bg-[var(--color-dark)] px-2 py-1 rounded">⛽ {vehicle.fuel_type}</span>
                        <span className="bg-[var(--color-dark)] px-2 py-1 rounded">⚙️ {vehicle.transmission}</span>
                        <span className="bg-[var(--color-dark)] px-2 py-1 rounded text-[var(--color-gold)]">${vehicle.price_per_day}/day</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {testimonials.length === 0 ? (
                  <div className="text-center py-20 glass-card rounded-2xl text-gray-500">
                    <p className="text-4xl mb-3">⭐</p>
                    <p>No testimonials yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                      <div key={t.id} className="glass-card rounded-xl p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">{t.customer_name}</p>
                            <div className="flex gap-0.5 text-sm">
                              {Array.from({ length: t.rating }).map((_, i) => (
                                <span key={i} className="text-[var(--color-gold)]">★</span>
                              ))}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <span className={`text-xs px-2 py-1 rounded-full ${t.is_visible ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                              {t.is_visible ? 'Visible' : 'Hidden'}
                            </span>
                            <button
                              onClick={() => deleteTestimonial(t.id)}
                              className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm">&ldquo;{t.comment}&rdquo;</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
