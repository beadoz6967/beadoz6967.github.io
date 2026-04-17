import type { Metadata } from 'next'
import { Oswald, Crimson_Pro, Share_Tech_Mono } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-oswald',
})

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-crimson',
})

// Using --font-share-tech to avoid circular reference with Tailwind v4's --font-mono
const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-share-tech',
})

export const metadata: Metadata = {
  title: 'World on Fire | dihdevil.me',
  description:
    "Upload a photo. The Devil sees what you cannot. Daredevil-themed Radar Sense photo transformer.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={[
          oswald.variable,
          crimsonPro.variable,
          shareTechMono.variable,
          'bg-void text-bone antialiased',
        ].join(' ')}
      >
        <NavBar />
        {children}
        <footer className="text-center py-6">
          <p className="font-mono text-[10px] text-bone-dim opacity-40">
            dihdevil.me
          </p>
        </footer>
      </body>
    </html>
  )
}
