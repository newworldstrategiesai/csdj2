import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { MainNav } from '@/components/main-nav';
import { MobileNav } from '@/components/mobile-nav';
import { config } from '@/lib/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: config.companyName,
  description: 'Comprehensive DJ business management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          suppressHydrationWarning
        >
          <div className="flex h-screen">
            <aside className="hidden md:block w-64 border-r bg-background">
              <div className="flex h-16 items-center px-6 border-b">
                <h1 className="text-xl font-bold">{config.companyName}</h1>
              </div>
              <MainNav />
            </aside>
            <main className="flex-1 overflow-y-auto bg-background pb-16 md:pb-0">
              {children}
            </main>
          </div>
          <MobileNav />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}