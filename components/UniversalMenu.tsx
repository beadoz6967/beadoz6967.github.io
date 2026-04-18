'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MenuItem {
  href: string
  label: string
  initials: string
  avatarBg: string
  avatarFg: string
}

const MENU_ITEMS: MenuItem[] = [
  {
    href: '/',
    label: 'Daredevil',
    initials: 'DD',
    avatarBg: '#1a1a1a',
    avatarFg: '#e8e0d0',
  },
  {
    href: '/smokedope2016',
    label: 'smokedope2016',
    initials: 'SD',
    avatarBg: '#1a1a1a',
    avatarFg: '#e8e0d0',
  },
]

export default function UniversalMenu() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Anthology Hub"
      style={{ width: '170px' }}
      className="fixed top-0 left-0 h-full z-50 flex flex-col border-r border-white/10 bg-black"
    >
      <div className="px-4 pt-5 pb-4 border-b border-white/10">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
          anthology
        </span>
      </div>

      <ul className="flex flex-col gap-1 px-2 pt-3" role="list">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname === item.href
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={[
                  'flex items-center gap-3 px-2 py-2 rounded-sm transition-colors duration-150',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:bg-white/5 hover:text-white/80',
                ].join(' ')}
                aria-current={isActive ? 'page' : undefined}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  aria-hidden="true"
                  style={{ flexShrink: 0 }}
                >
                  <rect
                    x="0"
                    y="0"
                    width="28"
                    height="28"
                    rx="3"
                    fill={item.avatarBg}
                    stroke={isActive ? '#ffffff' : '#333333'}
                    strokeWidth="1"
                  />
                  <text
                    x="14"
                    y="19"
                    textAnchor="middle"
                    fill={isActive ? '#ffffff' : item.avatarFg}
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="monospace"
                    letterSpacing="0.5"
                  >
                    {item.initials}
                  </text>
                </svg>

                <span className="font-mono text-[11px] tracking-wide leading-tight truncate">
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
