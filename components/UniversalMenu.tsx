'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Matt Murdock' },
  { href: '/smokedope2016', label: 'smokedope2016' },
]

export default function UniversalMenu() {
  const pathname = usePathname()
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <nav
      aria-label="Site navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9000,
        backgroundColor: '#f2f2f2',
        borderBottom: '1px solid #888888',
        height: '32px',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Pixel icon box */}
      <div
        style={{
          width: '32px',
          height: '32px',
          flexShrink: 0,
          backgroundColor: '#c0c0c0',
          borderRight: '1px solid #888888',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <rect x="1" y="1" width="7" height="7" fill="#000080" />
          <rect x="10" y="1" width="7" height="7" fill="#800000" />
          <rect x="1" y="10" width="7" height="7" fill="#006400" />
          <rect x="10" y="10" width="7" height="7" fill="#000000" />
        </svg>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href
          const isHovered = hovered === href
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 12px',
                height: '100%',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: '12px',
                color: '#000000',
                textDecoration: 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                borderBottom: isActive ? '2px solid #000000' : '2px solid transparent',
                backgroundColor: isHovered ? '#e0e0e0' : isActive ? '#dcdcdc' : 'transparent',
                borderRight: '1px solid #cccccc',
              }}
              onMouseEnter={() => setHovered(href)}
              onMouseLeave={() => setHovered(null)}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
