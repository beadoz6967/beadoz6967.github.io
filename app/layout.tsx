import type { Metadata } from 'next'
import { Oswald, Crimson_Pro, Share_Tech_Mono } from 'next/font/google'
import './globals.css'
import UniversalMenu from '@/components/UniversalMenu'

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

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
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
        <UniversalMenu />
        {children}
        <footer className="px-4 py-6">
          <div className="mx-auto max-w-7xl border border-crimson-dim/35 bg-black/30 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[10px] text-bone-dim uppercase tracking-[0.18em]">
              dihdevil.me
            </p>
            <p className="font-mono text-[10px] text-bone-dim/70 uppercase tracking-[0.14em]">
              local processing · no cloud upload
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
