// smokedope2016 artist page — warm sepia / SoundCloud midnight aesthetic
'use client'

import { Anton } from 'next/font/google'
import { motion, useReducedMotion } from 'framer-motion'

const anton = Anton({ subsets: ['latin'], weight: ['400'], variable: '--font-anton' })

const C = {
  bg: '#0d0b09',
  surface: '#181410',
  surfaceHover: '#201c18',
  bone: '#e8e0d0',
  muted: '#7a7265',
  amber: '#a07840',
  border: 'rgba(184,168,152,0.08)',
  borderAmber: '#a07840',
}

const TRILOGY = [
  {
    title: 'THE COMEUP',
    year: '2024',
    vibe: 'hotboxed and ascending. CoD in a dusty bedroom.',
    href: '#', // TODO: real Spotify album URL
  },
  {
    title: 'THE PEAK',
    year: '2025',
    vibe: 'the party at its loudest. debuted 9th on Spotify US.',
    href: '#', // TODO: real Spotify album URL
  },
  {
    title: 'THE COMEDOWN',
    year: '2026',
    vibe: 'no features. 13 songs. 35 min. morning after.',
    href: '#', // TODO: real Spotify album URL
  },
]

const TRACKS: { name: string; album: string }[] = [
  { name: 'White Owls', album: 'THE COMEUP' },
  { name: 'Drank', album: 'THE COMEUP' },
  { name: 'Frat', album: 'THE COMEUP' },
  { name: 'Khalifa', album: 'THE COMEUP' },
  { name: 'Too Gone', album: 'THE COMEUP' },
  { name: 'In Da Party', album: 'THE PEAK' },
  { name: 'Damian Lillard', album: 'THE PEAK' },
  { name: 'Know Dat', album: 'THE PEAK' },
  { name: '2016LYFE', album: 'THE PEAK' },
  { name: 'Smoking Kills', album: 'THE COMEDOWN' },
  { name: 'How I Bled', album: 'THE COMEDOWN' },
  { name: 'Be My Zombie', album: 'THE COMEDOWN' },
  { name: 'Famous', album: 'THE COMEDOWN' },
  { name: 'Closing Time', album: 'THE COMEDOWN' },
  { name: 'My Chalice', album: 'THE COMEDOWN' },
]

const LINKS = [
  { label: 'SoundCloud', href: 'https://soundcloud.com/smokedope2016' },
  { label: 'Spotify', href: '#' }, // TODO: real URL
  { label: 'Bandcamp', href: '#' }, // TODO: real URL
  { label: 'Genius', href: '#' }, // TODO: real URL
  { label: 'Lyrical Lemonade', href: 'https://blog.lyricallemonade.com/p/smokedope2016-interview/' },
  { label: 'YouTube', href: '#' }, // TODO: real URL
]

// Section reveal component — whileInView for scroll-driven reveals
function FadeUp({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      style={style}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export default function SmokeDope2016Page() {
  const reduce = useReducedMotion()

  return (
    <div
      className={anton.variable}
      style={{ background: C.bg, color: C.bone, minHeight: '100vh', flexGrow: 1 }}
    >
      <style>{`
        .sd-link:focus-visible {
          outline: 2px solid ${C.amber};
          outline-offset: 3px;
        }
        .sd-track-row:hover .sd-track-name {
          color: ${C.amber};
        }
      `}</style>

      {/* SVG grain overlay — self-contained, no external asset */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 50,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.05,
        }}
      />

      {/* Radial vignette */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 49,
          background:
            'radial-gradient(ellipse at 50% 35%, transparent 25%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <header
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '5rem 2rem',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Ambient drift blob */}
        <motion.div
          aria-hidden="true"
          animate={
            reduce
              ? {}
              : { x: [0, 70, -55, 25, 0], y: [0, -55, 45, -25, 0] }
          }
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
          style={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'rgba(140,100,50,0.055)',
            filter: 'blur(110px)',
            top: '5%',
            left: '50%',
            marginLeft: -250,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Artist name */}
          <motion.h1
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            style={{
              fontFamily: 'var(--font-anton)',
              fontSize: 'clamp(3.2rem, 10.5vw, 8rem)',
              letterSpacing: '-0.02em',
              lineHeight: 0.9,
              color: C.bone,
              margin: 0,
            }}
          >
            SMOKEDOPE
            <br />
            2016
          </motion.h1>

          {/* Identity line */}
          <motion.p
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.5 }}
            style={{
              fontFamily: 'var(--font-share-tech)',
              fontSize: '0.78rem',
              letterSpacing: '0.07em',
              color: C.muted,
              marginTop: '2rem',
              marginBottom: 0,
            }}
          >
            started as a Steam username. ended up here.
          </motion.p>

          {/* Sparse metadata */}
          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 0.55 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.9 }}
            style={{
              fontFamily: 'var(--font-share-tech)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              color: C.muted,
              marginTop: '0.65rem',
            }}
          >
            VIRGINIA · ANONYMOUS · 1.1M MONTHLY
          </motion.p>
        </div>
      </header>

      {/* ── MAIN CONTENT ──────────────────────────────────────── */}
      <main style={{ maxWidth: 920, margin: '0 auto', padding: '0 1.5rem 5rem' }}>

        {/* TRILOGY */}
        <section aria-label="Trilogy" style={{ marginBottom: '5.5rem' }}>
          <FadeUp>
            <p
              style={{
                fontFamily: 'var(--font-share-tech)',
                fontSize: '0.58rem',
                letterSpacing: '0.28em',
                color: C.muted,
                marginBottom: '1.75rem',
                textTransform: 'uppercase',
              }}
            >
              The Trilogy
            </p>
          </FadeUp>

          {/* 1px gap grid creates hairline borders between cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1px',
              background: C.border,
              border: `1px solid ${C.border}`,
            }}
          >
            {TRILOGY.map((album, i) => (
              <FadeUp key={album.title} delay={i * 0.1}>
                <a
                  href={album.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sd-link"
                  style={{
                    display: 'block',
                    background: C.surface,
                    padding: '2rem 1.75rem',
                    textDecoration: 'none',
                    color: 'inherit',
                    height: '100%',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = C.surfaceHover)}
                  onMouseLeave={e => (e.currentTarget.style.background = C.surface)}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-share-tech)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.2em',
                      color: C.muted,
                      marginBottom: '0.6rem',
                    }}
                  >
                    {album.year}
                  </p>
                  <h2
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: '1.45rem',
                      color: C.amber,
                      letterSpacing: '0.03em',
                      marginBottom: '0.85rem',
                      lineHeight: 1,
                    }}
                  >
                    {album.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-oswald)',
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      color: C.bone,
                      opacity: 0.7,
                      lineHeight: 1.55,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {album.vibe}
                  </p>
                </a>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* TRACKS */}
        <section aria-label="Select tracks" style={{ marginBottom: '5.5rem' }}>
          <FadeUp>
            <p
              style={{
                fontFamily: 'var(--font-share-tech)',
                fontSize: '0.58rem',
                letterSpacing: '0.28em',
                color: C.muted,
                marginBottom: '1.75rem',
                textTransform: 'uppercase',
              }}
            >
              Select Tracks
            </p>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              columnGap: '3rem',
            }}
          >
            {TRACKS.map((track, i) => (
              <FadeUp key={track.name} delay={Math.min(i * 0.03, 0.3)}>
                <div
                  className="sd-track-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '0.6rem 0',
                    borderBottom: `1px solid ${C.border}`,
                    gap: '1rem',
                    cursor: 'default',
                  }}
                >
                  <span
                    className="sd-track-name"
                    style={{
                      fontFamily: 'var(--font-share-tech)',
                      fontSize: '0.82rem',
                      color: C.bone,
                      letterSpacing: '0.03em',
                      transition: 'color 0.15s',
                    }}
                  >
                    {track.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-share-tech)',
                      fontSize: '0.56rem',
                      color: C.amber,
                      letterSpacing: '0.14em',
                      whiteSpace: 'nowrap',
                      opacity: 0.75,
                    }}
                  >
                    {track.album}
                  </span>
                </div>
              </FadeUp>
            ))}
          </div>
        </section>

        {/* LINKS */}
        <nav aria-label="External links" style={{ marginBottom: '5.5rem' }}>
          <FadeUp>
            <p
              style={{
                fontFamily: 'var(--font-share-tech)',
                fontSize: '0.58rem',
                letterSpacing: '0.28em',
                color: C.muted,
                marginBottom: '1.75rem',
                textTransform: 'uppercase',
              }}
            >
              Find Him
            </p>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '0.5rem',
            }}
          >
            {LINKS.map((link, i) => (
              <FadeUp key={link.label} delay={i * 0.06}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sd-link"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.85rem 1rem',
                    border: `1px solid ${C.border}`,
                    background: C.surface,
                    textDecoration: 'none',
                    color: C.bone,
                    fontFamily: 'var(--font-share-tech)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.06em',
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = C.borderAmber
                    e.currentTarget.style.color = C.amber
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = C.border
                    e.currentTarget.style.color = C.bone
                  }}
                >
                  <span style={{ color: C.muted, fontSize: '0.65rem', lineHeight: 1 }}>→</span>
                  {link.label}
                </a>
              </FadeUp>
            ))}
          </div>
        </nav>

        {/* COMMUNITY PULSE */}
        <section aria-label="Community lore" style={{ marginBottom: '5.5rem' }}>
          <FadeUp>
            <div
              style={{
                borderLeft: `2px solid ${C.amber}`,
                paddingLeft: '1.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-share-tech)',
                  fontSize: '0.78rem',
                  color: C.bone,
                  lineHeight: 1.85,
                  letterSpacing: '0.04em',
                  marginBottom: '0.6rem',
                }}
              >
                Richest CSGO player. Trapper of the Millennium. No Face No Case.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-share-tech)',
                  fontSize: '0.72rem',
                  color: C.muted,
                  lineHeight: 1.8,
                  letterSpacing: '0.03em',
                }}
              >
                The sonic equivalent of a hotboxed civic parked in the shadiest corner of a 7/11
                lot on a school night. Headlined 1720 Warehouse LA. Jan 2025. Sold out.{' '}
                <span style={{ color: C.amber }}>#2016LYFE</span>
              </p>
            </div>
          </FadeUp>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer
        style={{
          textAlign: 'center',
          padding: '2.5rem 1.5rem',
          borderTop: `1px solid ${C.border}`,
        }}
      >
        <FadeUp>
          <p
            style={{
              fontFamily: 'var(--font-share-tech)',
              fontSize: '0.6rem',
              color: C.muted,
              letterSpacing: '0.2em',
              opacity: 0.55,
            }}
          >
            no face. no case. #2016LYFE
          </p>
        </FadeUp>
      </footer>
    </div>
  )
}
