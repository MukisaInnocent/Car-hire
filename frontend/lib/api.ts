const NEXT_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const API_BASE = NEXT_API_URL.endsWith('/api') ? NEXT_API_URL : `${NEXT_API_URL.replace(/\/$/, '')}/api`;

async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) || {}),
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return res.json();
}

export const api = {
  // Vehicles
  getVehicles: () => apiFetch('/vehicles'),
  getVehicle: (id: number) => apiFetch(`/vehicles/${id}`),
  createVehicle: (data: any) => apiFetch('/vehicles', { method: 'POST', body: JSON.stringify(data) }),
  updateVehicle: (id: number, data: any) => apiFetch(`/vehicles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteVehicle: (id: number) => apiFetch(`/vehicles/${id}`, { method: 'DELETE' }),

  // Services
  getServices: () => apiFetch('/services'),
  createService: (data: any) => apiFetch('/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id: number, data: any) => apiFetch(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Bookings
  createBooking: (data: any) => apiFetch('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getBookings: () => apiFetch('/bookings'),
  updateBookingStatus: (id: number, status: string) =>
    apiFetch(`/bookings/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) }),

  // Testimonials
  getTestimonials: () => apiFetch('/testimonials'),
  createTestimonial: (data: any) => apiFetch('/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  toggleTestimonial: (id: number) => apiFetch(`/testimonials/${id}/toggle`, { method: 'PATCH' }),
  deleteTestimonial: (id: number) => apiFetch(`/testimonials/${id}`, { method: 'DELETE' }),

  // Auth
  login: (username: string, password: string) =>
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getMe: () => apiFetch('/auth/me'),
};
