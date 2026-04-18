 'use client'

import { motion, useReducedMotion } from 'framer-motion'
import styles from './smokedope.module.css'

const TRILOGY = [
  {
    numeral: 'Ⅰ',
    title: 'THE COMEUP',
    year: '2024',
    vibe: '"playing CoD high in a dusty bedroom" — cloud rap ascending, Clams Casino worship, Yung Lean energy.',
    spotify: 'https://open.spotify.com/search/smokedope2016%20the%20comeup',
  },
  {
    numeral: 'Ⅱ',
    title: 'THE PEAK',
    year: '2025',
    vibe: 'The height of the party. House-forward, kinetic. Debuted 9th on Spotify US album debuts.',
    spotify: 'https://open.spotify.com/search/smokedope2016%20the%20peak',
  },
  {
    numeral: 'Ⅲ',
    title: 'THE COMEDOWN',
    year: '2026',
    vibe: 'No features. 13 songs. 35 minutes. The party ended. Post-party stillness. Most vulnerable.',
    spotify: 'https://open.spotify.com/search/smokedope2016%20the%20comedown',
  },
]

const TRACKS = [
  { title: 'White Owls', project: 'THE COMEUP' },
  { title: 'Drank', project: 'THE COMEUP' },
  { title: 'Frat', project: 'THE COMEUP' },
  { title: 'Khalifa', project: 'THE COMEUP' },
  { title: 'Too Gone', project: 'THE COMEUP' },
  { title: 'In Da Party', project: 'THE PEAK' },
  { title: 'Damian Lillard', project: 'THE PEAK' },
  { title: 'Know Dat', project: 'THE PEAK' },
  { title: '2016LYFE', project: 'THE PEAK' },
  { title: 'Smoking Kills', project: 'THE COMEDOWN' },
  { title: 'How I Bled', project: 'THE COMEDOWN' },
  { title: 'Be My Zombie', project: 'THE COMEDOWN' },
  { title: 'Famous', project: 'THE COMEDOWN' },
  { title: 'Closing Time', project: 'THE COMEDOWN' },
  { title: 'My Chalice', project: 'THE COMEDOWN' },
]

const LINKS = [
  { label: 'SoundCloud', href: 'https://soundcloud.com/smokedope2016' },
  { label: 'Spotify', href: 'https://open.spotify.com/search/smokedope2016' },
  { label: 'Bandcamp', href: 'https://smokedope2016.bandcamp.com' },
  { label: 'Genius', href: 'https://genius.com/artists/Smokedope2016' },
  { label: 'Lyrical Lemonade', href: 'https://blog.lyricallemonade.com/p/smokedope2016-interview/' },
  { label: 'YouTube', href: 'https://www.youtube.com/@smokedope2016' },
]

const SITE_BRIEF = [
  { label: 'North Star', value: 'Build lore, not a generic artist template.' },
  { label: 'Persona', value: 'Listeners digging narrative and deep cuts.' },
  { label: 'Emotion', value: 'Afterparty heat fading into stillness.' },
]

// Group tracks by project for setlist rendering, preserving album order.
const TRACK_SETS = TRILOGY.map((album) => ({
  numeral: album.numeral,
  project: album.title,
  year: album.year,
  tracks: TRACKS.filter((t) => t.project === album.title),
}))

export default function Smokedope2016() {
  const reduceMotion = useReducedMotion()

  const sectionMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] as const },
      }

  const staggerMotion = reduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.18 },
        variants: {
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.11,
              delayChildren: 0.04,
            },
          },
        },
      }

  const itemMotion = reduceMotion
    ? {}
    : {
        variants: {
          hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
          visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { duration: 0.55, ease: [0.2, 0.8, 0.2, 1] as const },
          },
        },
      }

  return (
    <div className={styles.page}>
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      {/* Hero */}
      <motion.section className={styles.hero} {...sectionMotion}>
        <motion.div className={styles.heroInner} {...staggerMotion}>
          <motion.div className={styles.briefPanel} {...itemMotion}>
            {SITE_BRIEF.map((item) => (
              <motion.div key={item.label} className={styles.briefCell} {...itemMotion}>
                <p className={styles.briefLabel}>{item.label}</p>
                <p className={styles.briefValue}>{item.value}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className={styles.tapeStrip} aria-hidden="true" {...itemMotion}>
            <span>VIRGINIA</span>
            <span className={styles.tapeDot}>●</span>
            <span>ANONYMOUS</span>
            <span className={styles.tapeDot}>●</span>
            <span>1.1M MONTHLY</span>
            <span className={styles.tapeDot}>●</span>
            <span>NO FACE NO CASE</span>
          </motion.div>

          <motion.h1 className={styles.heroName} {...itemMotion}>
            <motion.span className={styles.heroWord} {...itemMotion}>SMOKE</motion.span>
            <motion.span className={`${styles.heroWord} ${styles.heroWordOffset}`} {...itemMotion}>DOPE</motion.span>
            <motion.span className={styles.heroYear} {...itemMotion}>2016</motion.span>
          </motion.h1>

          <motion.div className={styles.heroSide} {...itemMotion}>
            <motion.p className={styles.heroIdent} {...itemMotion}>
              &ldquo;started as a Steam username. ended up here.&rdquo;
            </motion.p>
            <motion.div className={styles.heroRule} aria-hidden="true" {...itemMotion} />
            <motion.p className={styles.heroMeta} {...itemMotion}>
              <span className={styles.heroMetaLabel}>FILED UNDER</span>
              <span className={styles.heroMetaValue}>
                cloud rap · house · post-party ambient
              </span>
            </motion.p>
            <motion.p className={styles.heroMeta} {...itemMotion}>
              <span className={styles.heroMetaLabel}>INTERFACE MODE</span>
              <span className={styles.heroMetaValue}>
                archive timeline · staggered narrative
              </span>
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Trilogy arc */}
      <motion.section className={styles.section} {...sectionMotion}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>/ 01</span>
          <h2 className={styles.sectionLabel}>The Trilogy</h2>
          <span className={styles.sectionSpan}>3 ACTS · 2024 — 2026</span>
        </div>

        <motion.div className={styles.trilogyGrid} {...staggerMotion}>
          {TRILOGY.map((album, i) => (
            <motion.article
              key={album.title}
              className={`${styles.albumCard} ${styles['card' + i]}`}
              {...itemMotion}
            >
              <span className={styles.albumNumeral} aria-hidden="true">
                {album.numeral}
              </span>
              <div className={styles.albumInner}>
                <span className={styles.albumYear}>{album.year}</span>
                <h3 className={styles.albumTitle}>{album.title}</h3>
                <p className={styles.albumVibe}>{album.vibe}</p>
                <a
                  href={album.spotify}
                  className={styles.albumLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>STREAM</span>
                  <span className={styles.arrow}>→</span>
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      {/* Setlist */}
      <motion.section className={styles.section} {...sectionMotion}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>/ 02</span>
          <h2 className={styles.sectionLabel}>Setlist</h2>
          <span className={styles.sectionSpan}>15 CUTS · SELECTED</span>
        </div>

        <motion.div className={styles.setlist} {...staggerMotion}>
          {TRACK_SETS.map((set, setIndex) => {
            const startIndex = TRACK_SETS
              .slice(0, setIndex)
              .reduce((count, item) => count + item.tracks.length, 0)

            return (
              <motion.div key={set.project} className={styles.setGroup} {...itemMotion}>
                <header className={styles.setHeader}>
                  <span className={styles.setNumeral}>{set.numeral}</span>
                  <span className={styles.setTitle}>{set.project}</span>
                  <span className={styles.setYear}>{set.year}</span>
                </header>
                <motion.ol className={styles.setTracks} start={startIndex + 1} {...staggerMotion}>
                  {set.tracks.map((track, trackIndex) => {
                    const n = String(startIndex + trackIndex + 1).padStart(2, '0')
                    return (
                      <motion.li key={track.title} className={styles.trackRow} {...itemMotion}>
                        <span className={styles.trackNum}>{n}</span>
                        <span className={styles.trackName}>{track.title}</span>
                        <span className={styles.trackDots} aria-hidden="true" />
                      </motion.li>
                    )
                  })}
                </motion.ol>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.section>

      {/* Links */}
      <motion.section className={styles.section} {...sectionMotion}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>/ 03</span>
          <h2 className={styles.sectionLabel}>Find Him</h2>
          <span className={styles.sectionSpan}>EXTERNAL</span>
        </div>

        <motion.ul className={styles.linkList} {...staggerMotion}>
          {LINKS.map((link) => (
            <motion.li key={link.label} className={styles.linkItem} {...itemMotion}>
              <a
                href={link.href}
                className={styles.extLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className={styles.extBracket}>[</span>
                <span className={styles.extLabel}>{link.label}</span>
                <span className={styles.extBracket}>]</span>
                <span className={styles.extArrow}>↗</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* Community pulse */}
      <motion.section className={styles.section} {...sectionMotion}>
        <motion.blockquote className={styles.pulse} {...itemMotion}>
          <span className={styles.pulseMark} aria-hidden="true">&ldquo;</span>
          <p className={styles.pulseText}>
            Richest CSGO player in North America. Trapper of the Millennium. No Face No Case.
            Sold out 1720 LA. 1.1M monthly. The lore writes itself.
          </p>
          <p className={styles.pulseTag}>#2016LYFE</p>
        </motion.blockquote>
      </motion.section>

      {/* Footer */}
      <motion.footer className={styles.footer} {...sectionMotion}>
        <span className={styles.footerRule} aria-hidden="true" />
        <p className={styles.footerText}>no face. no case.</p>
        <span className={styles.footerMark}>— sd2016 —</span>
      </motion.footer>
    </div>
  )
}
