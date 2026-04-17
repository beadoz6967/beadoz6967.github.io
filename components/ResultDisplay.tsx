'use client'

import { useCallback, useEffect, useState } from 'react'

export interface ResultDisplayProps {
  original: string
  transformed: string
  onReset: () => void
}

export default function ResultDisplay({ original, transformed, onReset }: ResultDisplayProps) {
  const [showOriginal, setShowOriginal] = useState<boolean>(false)
  const [revealed, setRevealed] = useState<boolean>(false)

  // Trigger scan-reveal animation after mount
  useEffect(() => {
    setTimeout(() => setRevealed(true), 0)
  }, [])

  const handleToggle = useCallback(() => {
    setShowOriginal((prev) => !prev)
  }, [])

  const handleDownload = useCallback(() => {
    const a = document.createElement('a')
    a.href = transformed
    a.download = 'radar-sense.png'
    a.click()
  }, [transformed])

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      {/* Image container with bracket corners */}
      <div className="bracket relative w-full">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <>
          <img
            src={transformed}
            alt="Radar sense vision"
            className={`w-full block ${revealed && !showOriginal ? 'animate-scan-reveal' : ''} ${showOriginal ? 'hidden' : ''}`}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={original}
            alt="Original photo"
            className={`w-full block ${showOriginal ? '' : 'hidden'}`}
          />
        </>
      </div>

      {/* Quote */}
      <p className="font-crimson italic text-bone-dim text-base text-center">
        &ldquo;The city screams its shapes to me.&rdquo;
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={handleToggle}
          className="font-mono text-xs tracking-widest uppercase px-4 py-2 border border-crimson text-crimson hover:bg-crimson/10 transition-colors"
        >
          {showOriginal ? 'Showing Original' : 'Showing Radar Sense'}
        </button>

        <button
          onClick={handleDownload}
          className="font-mono text-xs tracking-widest uppercase px-4 py-2 bg-crimson text-void hover:bg-crimson-bright transition-colors"
        >
          Download
        </button>

        <button
          onClick={onReset}
          className="font-mono text-xs tracking-widest uppercase px-4 py-2 border border-bone-dim/30 text-bone-dim hover:border-bone-dim/60 hover:text-bone transition-colors"
        >
          New Photo
        </button>
      </div>
    </div>
  )
}
