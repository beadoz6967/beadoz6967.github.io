'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'Radar Lab' },
  { href: '/smokedope2016', label: 'smokedope2016' },
]

export default function UniversalMenu() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Site navigation"
      className="fixed top-0 left-0 right-0 z-[9000] border-b border-crimson-dim/45 bg-black/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-3 sm:px-5">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-crimson/60">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-crimson group-hover:animate-pulse" />
          </span>
          <span className="font-oswald text-sm uppercase tracking-[0.17em] text-bone">
            dihdevil
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-bone-dim">
            system
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={[
                  'px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors border',
                  isActive
                    ? 'border-crimson/70 text-crimson bg-crimson/10'
                    : 'border-transparent text-bone-dim hover:text-bone hover:border-crimson-dim/60',
                ].join(' ')}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
