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

// Group tracks by project for setlist rendering, preserving album order.
const TRACK_SETS = TRILOGY.map((album) => ({
  numeral: album.numeral,
  project: album.title,
  year: album.year,
  tracks: TRACKS.filter((t) => t.project === album.title),
}))

export default function Smokedope2016() {
  return (
    <div className={styles.page}>
      <div className={styles.orb} aria-hidden="true" />
      <div className={styles.orb2} aria-hidden="true" />

      {/* Hero */}
      <section className={`${styles.hero} ${styles.delay0}`}>
        <div className={styles.heroInner}>
          <div className={styles.tapeStrip} aria-hidden="true">
            <span>VIRGINIA</span>
            <span className={styles.tapeDot}>●</span>
            <span>ANONYMOUS</span>
            <span className={styles.tapeDot}>●</span>
            <span>1.1M MONTHLY</span>
            <span className={styles.tapeDot}>●</span>
            <span>NO FACE NO CASE</span>
          </div>

          <h1 className={styles.heroName}>
            <span className={styles.heroWord}>SMOKE</span>
            <span className={`${styles.heroWord} ${styles.heroWordOffset}`}>DOPE</span>
            <span className={styles.heroYear}>2016</span>
          </h1>

          <div className={styles.heroSide}>
            <p className={styles.heroIdent}>
              &ldquo;started as a Steam username. ended up here.&rdquo;
            </p>
            <div className={styles.heroRule} aria-hidden="true" />
            <p className={styles.heroMeta}>
              <span className={styles.heroMetaLabel}>FILED UNDER</span>
              <span className={styles.heroMetaValue}>
                cloud rap · house · post-party ambient
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Trilogy arc */}
      <section className={`${styles.section} ${styles.delay1}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>/ 01</span>
          <h2 className={styles.sectionLabel}>The Trilogy</h2>
          <span className={styles.sectionSpan}>3 ACTS · 2024 — 2026</span>
        </div>

        <div className={styles.trilogyGrid}>
          {TRILOGY.map((album, i) => (
            <article
              key={album.title}
              className={`${styles.albumCard} ${styles['card' + i]}`}
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
            </article>
          ))}
        </div>
      </section>

      {/* Setlist */}
      <section className={`${styles.section} ${styles.delay2}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>/ 02</span>
          <h2 className={styles.sectionLabel}>Setlist</h2>
          <span className={styles.sectionSpan}>15 CUTS · SELECTED</span>
        </div>

        <div className={styles.setlist}>
          {TRACK_SETS.map((set, setIndex) => {
            const startIndex = TRACK_SETS
              .slice(0, setIndex)
              .reduce((count, item) => count + item.tracks.length, 0)

            return (
              <div key={set.project} className={styles.setGroup}>
              <header className={styles.setHeader}>
                <span className={styles.setNumeral}>{set.numeral}</span>
                <span className={styles.setTitle}>{set.project}</span>
                <span className={styles.setYear}>{set.year}</span>
              </header>
              <ol className={styles.setTracks} start={startIndex + 1}>
                {set.tracks.map((track, trackIndex) => {
                  const n = String(startIndex + trackIndex + 1).padStart(2, '0')
                  return (
                    <li key={track.title} className={styles.trackRow}>
                      <span className={styles.trackNum}>{n}</span>
                      <span className={styles.trackName}>{track.title}</span>
                      <span className={styles.trackDots} aria-hidden="true" />
                    </li>
                  )
                })}
              </ol>
              </div>
            )
          })}
        </div>
      </section>

      {/* Links */}
      <section className={`${styles.section} ${styles.delay3}`}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionIndex}>/ 03</span>
          <h2 className={styles.sectionLabel}>Find Him</h2>
          <span className={styles.sectionSpan}>EXTERNAL</span>
        </div>

        <ul className={styles.linkList}>
          {LINKS.map((link) => (
            <li key={link.label} className={styles.linkItem}>
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
            </li>
          ))}
        </ul>
      </section>

      {/* Community pulse */}
      <section className={`${styles.section} ${styles.delay4}`}>
        <blockquote className={styles.pulse}>
          <span className={styles.pulseMark} aria-hidden="true">&ldquo;</span>
          <p className={styles.pulseText}>
            Richest CSGO player in North America. Trapper of the Millennium. No Face No Case.
            Sold out 1720 LA. 1.1M monthly. The lore writes itself.
          </p>
          <p className={styles.pulseTag}>#2016LYFE</p>
        </blockquote>
      </section>

      {/* Footer */}
      <footer className={`${styles.footer} ${styles.delay5}`}>
        <span className={styles.footerRule} aria-hidden="true" />
        <p className={styles.footerText}>no face. no case.</p>
        <span className={styles.footerMark}>— sd2016 —</span>
      </footer>
    </div>
  )
}
