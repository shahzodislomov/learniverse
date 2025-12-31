import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/lib/authContext'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'CTFVexura - Capture The Flag Platform',
  description: 'A hacker-style CTF platform for cybersecurity challenges',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-mono`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-20">{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color: '#00ff41',
                border: '1px solid #00ff41',
                borderRadius: '4px',
                fontFamily: 'monospace',
              },
              success: {
                iconTheme: {
                  primary: '#00ff41',
                  secondary: '#0a0a0a',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff0000',
                  secondary: '#0a0a0a',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}

