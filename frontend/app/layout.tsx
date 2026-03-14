import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { ThemeProvider } from '@/components/ThemeProvider';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'At Your Door Car Hiring Services | Reliable Car Rental in Uganda',
  description:
    'Reliable, convenient, and affordable car hire services delivered directly to your doorstep. Serving Kampala, Wakiso, and upcountry Uganda. Self-drive, chauffeur, airport transfers & more.',
  keywords: 'car rental Uganda, car hire Kampala, airport transfer Entebbe, self-drive Uganda, chauffeur service Wakiso',
  openGraph: {
    title: 'At Your Door Car Hiring Services',
    description: "Reliable Cars Delivered To Your Doorstep — Uganda's trusted car rental service.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('ayd-theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.setAttribute('data-theme', t);
              } catch(e) {
                document.documentElement.setAttribute('data-theme', 'dark');
              }
            `,
          }}
        />
      </head>
      <body className={outfit.variable}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
