'use client'

import { useCallback, useEffect, useState } from 'react'

const SITE_URL = 'https://dihdevil.me'
const TWEET_TEXT = 'I just ran this through dihdevil.me -- edge detection in your browser, no upload needed.'

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
    a.download = 'output.png'
    a.click()
  }, [transformed])

  const handleCopyImage = useCallback(async () => {
    const img = new Image()
    img.src = transformed
    await new Promise<void>((resolve) => { img.onload = () => resolve() })
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext('2d')!.drawImage(img, 0, 0)
    canvas.toBlob(async (blob) => {
      if (!blob) return
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    }, 'image/png')
  }, [transformed])

  const handleShare = useCallback(async () => {
    const res = await fetch(transformed)
    const blob = await res.blob()
    const file = new File([blob], 'dihdevil.png', { type: 'image/png' })
    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: 'Radar Vision', url: SITE_URL })
    } else {
      await navigator.clipboard.writeText(SITE_URL)
    }
  }, [transformed])

  const handleTwitter = useCallback(() => {
    const text = encodeURIComponent(TWEET_TEXT)
    const url = encodeURIComponent(SITE_URL)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }, [])

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto">
      <div className="w-full border border-crimson-dim/40 bg-black/25 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-crimson">Output</p>
        <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-bone-dim">Switch view, then export or share</p>
      </div>

      {/* Image container with bracket corners */}
      <div className="bracket relative w-full">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />

        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
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

      {/* Controls */}
      <div className="w-full border border-crimson-dim/35 bg-black/20 p-3 sm:p-4 grid gap-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <button
            onClick={handleToggle}
            className="font-mono text-xs tracking-widest uppercase px-4 py-3 border border-crimson text-crimson hover:bg-crimson/10 transition-colors"
          >
            View: {showOriginal ? 'Original' : 'Processed'}
          </button>
          <button
            onClick={handleDownload}
            className="font-mono text-xs tracking-widest uppercase px-4 py-3 bg-crimson text-void hover:bg-crimson-bright transition-colors"
          >
            Download PNG
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <button
            onClick={handleCopyImage}
            className="font-mono text-xs tracking-widest uppercase px-3 py-2 border border-crimson-dim text-bone hover:border-crimson/70 transition-colors"
          >
            Copy
          </button>
          <button
            onClick={handleShare}
            className="font-mono text-xs tracking-widest uppercase px-3 py-2 border border-crimson-dim text-bone hover:border-crimson/70 transition-colors"
          >
            Share
          </button>
          <button
            onClick={handleTwitter}
            className="font-mono text-xs tracking-widest uppercase px-3 py-2 border border-crimson-dim text-bone hover:border-crimson/70 transition-colors"
          >
            Twitter
          </button>
        </div>

        <button
          onClick={onReset}
          className="font-mono text-xs tracking-widest uppercase px-4 py-2 border border-bone-dim/30 text-bone-dim hover:border-bone-dim/60 hover:text-bone transition-colors"
        >
          Process New Photo
        </button>
      </div>
    </div>
  )
}
