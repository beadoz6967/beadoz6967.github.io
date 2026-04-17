'use client'

export interface NavBarProps {}

export default function NavBar(_props: NavBarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-void/80 backdrop-blur-sm border-b border-crimson-dim/30">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" aria-label="DD logo">
          <circle cx="16" cy="16" r="14" stroke="#cc0000" strokeWidth="2" fill="none" />
          <text
            x="16"
            y="21"
            textAnchor="middle"
            fill="#cc0000"
            fontSize="12"
            fontWeight="700"
            fontFamily="sans-serif"
            letterSpacing="1"
          >
            DD
          </text>
        </svg>
        <span className="font-oswald text-bone text-lg tracking-widest uppercase">
          dihdevil.me
        </span>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-crimson animate-pulse inline-block" />
        <span className="font-mono text-xs text-bone-dim tracking-widest uppercase">
          Radar Online
        </span>
      </div>
    </nav>
  )
}
