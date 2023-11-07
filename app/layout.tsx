import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

const inter = Poppins({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: 'Memotivate',
  description: 'A simple note web app to help you organize, manage, and track your daily tasks.',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/dark-logo.svg",
        href: "/dark-logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="memotivate-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
