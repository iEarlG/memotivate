import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'

const inter = Poppins({
  subsets: ['latin'],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: 'Memotivate',
  description: 'A simple note web app to help you organize, manage, and track your daily tasks.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
