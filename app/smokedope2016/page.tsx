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

export default function Smokedope2016() {
  return (
    <div className={styles.page}>
      <div className={styles.orb} aria-hidden="true" />

      {/* Hero */}
      <section className={`${styles.section} ${styles.hero} ${styles.delay0}`}>
        <h1 className={styles.heroName}>SMOKEDOPE2016</h1>
        <p className={styles.heroIdent}>
          &ldquo;started as a Steam username. ended up here.&rdquo;
        </p>
        <p className={styles.heroMeta}>Virginia · anonymous · 1.1M monthly Spotify listeners</p>
      </section>

      {/* Trilogy arc */}
      <section className={`${styles.section} ${styles.delay1}`}>
        <h2 className={styles.sectionLabel}>The Trilogy</h2>
        <div className={styles.trilogyGrid}>
          {TRILOGY.map((album) => (
            <article key={album.title} className={styles.albumCard}>
              <span className={styles.albumNumeral}>{album.numeral}</span>
              <h3 className={styles.albumTitle}>{album.title}</h3>
              <span className={styles.albumYear}>{album.year}</span>
              <p className={styles.albumVibe}>{album.vibe}</p>
              <a
                href={album.spotify}
                className={styles.albumLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Spotify ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Select tracks */}
      <section className={`${styles.section} ${styles.delay2}`}>
        <h2 className={styles.sectionLabel}>Select Tracks</h2>
        <ul className={styles.trackList}>
          {TRACKS.map((track) => (
            <li key={track.title} className={styles.trackRow}>
              <span className={styles.trackName}>{track.title}</span>
              <span className={styles.trackProject}>{track.project}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Links */}
      <section className={`${styles.section} ${styles.delay3}`}>
        <h2 className={styles.sectionLabel}>Find Him</h2>
        <ul className={styles.linkList}>
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.extLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Community pulse */}
      <section className={`${styles.section} ${styles.delay4}`}>
        <p className={styles.communityPulse}>
          Richest CSGO player in North America. Trapper of the Millennium. No Face No Case.
          Sold out 1720 LA. 1.1M monthly. The lore writes itself.
        </p>
        <p className={styles.communityTag}>#2016LYFE</p>
      </section>

      {/* Footer */}
      <footer className={`${styles.footer} ${styles.delay5}`}>
        <p className={styles.footerText}>no face. no case.</p>
      </footer>
    </div>
  )
}
