'use client'

import styles from './smokedope.module.css'

function Win95Window({
  title,
  children,
  className,
}: {
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`${styles.window}${className ? ` ${className}` : ''}`}>
      <div className={styles.titleBar}>
        <span className={styles.titleText}>{title}</span>
        <div className={styles.titleButtons}>
          <button className={styles.titleBtn}>_</button>
          <button className={styles.titleBtn}>□</button>
          <button className={styles.titleBtn}>×</button>
        </div>
      </div>
      <div className={styles.windowBody}>{children}</div>
    </div>
  )
}

const IMG_GRAYS = [
  '#b0b0b0', '#c8c8c8', '#a8a8a8',
  '#d0d0d0', '#b8b8b8', '#909090',
  '#c0c0c0', '#a0a0a0', '#d8d8d8',
]

const LINKS = [
  'drain gang official',
  'bladee discography',
  'geocities archive',
  'winamp skins db',
  'soundcloud underground',
  'old myspace layouts',
  'mp3.com mirror',
]

const TRANSPORT = ['⏮', '⏪', '▶', '⏩', '⏭', '⏸', '■']

export default function Smokedope2016() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.siteTitle}>smokedope2016</h1>
        <p className={styles.tagline}>producer · collector · wanderer · ∆∆∆</p>
        <hr style={{ border: 'none', borderTop: '1px solid #c0c0c0', margin: '10px 0 0' }} />
      </div>

      <div className={styles.canvas}>
        {/* Bio */}
        <Win95Window title="smokedope2016.exe" className={styles.winBio}>
          <h2 className={styles.bioHeading}>SMOKEDOPE2016</h2>
          <p className={styles.bioText}>{`underground producer. no label. no features.
recordings made 2001–2008.

drain gang adjacent · beats since '03
currently: [undisclosed]
status: offline

contact: `}
            <a href="#" className={styles.link} style={{ display: 'inline' }}>
              smokedope2016@protonmail.com
            </a>
          </p>
        </Win95Window>

        {/* Winamp */}
        <Win95Window title="WINAMP v2.95" className={styles.winWinamp}>
          <div className={styles.winampPlayer}>
            <div className={styles.lcdDisplay}>
              01. smokedope2016 - tape_loop_03.mp3
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '38%' }} />
            </div>
            <div className={styles.transport}>
              {TRANSPORT.map((sym) => (
                <button key={sym} className={styles.tBtn}>{sym}</button>
              ))}
            </div>
            <div className={styles.volumeRow}>
              <span>VOL</span>
              <div className={styles.volSlider}>
                <div className={styles.volFill} style={{ width: '70%' }} />
              </div>
              <span>70%</span>
            </div>
          </div>
        </Win95Window>

        {/* Gallery */}
        <Win95Window title="gallery_01/" className={styles.winGallery}>
          <div className={styles.imgGrid}>
            {IMG_GRAYS.map((bg, i) => (
              <div key={i} className={styles.imgItem}>
                <div className={styles.imgBox} style={{ background: bg }} />
                <span className={styles.imgCaption}>img_00{i + 1}.jpg</span>
              </div>
            ))}
          </div>
        </Win95Window>

        {/* Links */}
        <Win95Window title="links.html" className={styles.winLinks}>
          <p style={{
            fontFamily: 'Times New Roman, serif',
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '8px',
            color: '#000',
          }}>
            *** MY LINKS ***
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {LINKS.map((link) => (
              <li key={link}>
                <a href="#" className={styles.link}>{link}</a>
              </li>
            ))}
          </ul>
        </Win95Window>
      </div>

      <footer style={{
        textAlign: 'center',
        padding: '24px 16px',
        borderTop: '1px solid #c0c0c0',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '10px',
        color: '#808080',
        marginTop: '32px',
      }}>
        <p style={{ margin: '0 0 6px' }}>
          smokedope2016 © 2003 — best viewed in Internet Explorer 6.0 at 800×600
        </p>
        <p style={{ margin: 0 }}>
          <a href="#" style={{ color: '#0000ee', textDecoration: 'underline' }}>guestbook</a>
          {' | '}
          <a href="#" style={{ color: '#0000ee', textDecoration: 'underline' }}>webrings</a>
          {' | '}
          <a href="#" style={{ color: '#0000ee', textDecoration: 'underline' }}>vote for this site</a>
        </p>
      </footer>
    </div>
  )
}
