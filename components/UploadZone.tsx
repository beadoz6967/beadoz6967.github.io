'use client'

import { useCallback, useRef, useState } from 'react'

export interface UploadZoneProps {
  onFile: (file: File) => void
}

export default function UploadZone({ onFile }: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragFileName, setDragFileName] = useState<string>('')

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
    const file = e.dataTransfer.items?.[0]
    if (file) setDragFileName(file.kind === 'file' ? (e.dataTransfer.files?.[0]?.name ?? '') : '')
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    setDragFileName('')
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      setDragFileName('')
      const file = e.dataTransfer.files?.[0]
      if (file) onFile(file)
    },
    [onFile]
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) onFile(file)
    },
    [onFile]
  )

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  return (
    <div
      className={[
        'bracket relative cursor-pointer select-none transition-colors duration-200',
        'w-full h-full min-h-[420px] p-4 sm:p-5 lg:p-6',
        'border border-solid',
        isDragging
          ? 'border-crimson-bright bg-[#0a0000]'
          : 'border-crimson-dim hover:border-crimson/70 bg-void-soft/90',
      ].join(' ')}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick() }}
      aria-label="Upload photo drop zone"
    >
      {/* Corner brackets */}
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleInputChange}
      />

      <div className="grid h-full grid-rows-[auto_1fr_auto] gap-5">
        <div className="flex items-center justify-between border-b border-crimson-dim/40 pb-3">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-crimson">Input</p>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-bone-dim">JPEG · PNG · WebP</p>
        </div>

        <div className="grid place-items-center border border-crimson-dim/30 bg-black/25 px-4 py-8 text-center">
          {isDragging ? (
            <div className="space-y-3">
              <p className="font-oswald text-4xl uppercase text-crimson leading-none">Lock Signal</p>
              <p className="font-mono text-xs tracking-[0.12em] uppercase text-bone">
                {dragFileName || 'Release to process'}
              </p>
            </div>
          ) : (
            <>
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                className="opacity-70"
                aria-hidden="true"
              >
                <rect x="9" y="18" width="54" height="40" rx="2" stroke="#cc0000" strokeWidth="1.5" />
                <circle cx="36" cy="38" r="10" stroke="#cc0000" strokeWidth="1.5" />
                <path d="M27 18l5-8h8l5 8" stroke="#cc0000" strokeWidth="1.5" />
                <path d="M36 24v28M22 38h28" stroke="#660000" strokeWidth="1" />
              </svg>
              <div className="mt-5 space-y-2">
                <p className="font-oswald text-4xl uppercase text-bone leading-none">Drop The Photo</p>
                <p className="font-mono text-[11px] tracking-[0.14em] uppercase text-bone-dim">
                  or click anywhere in this panel
                </p>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="border border-crimson-dim/35 px-3 py-2 bg-black/20">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-bone-dim">Max Size</p>
            <p className="font-mono text-xs text-bone mt-1">10MB</p>
          </div>
          <div className="border border-crimson-dim/35 px-3 py-2 bg-black/20">
            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-bone-dim">Privacy</p>
            <p className="font-mono text-xs text-bone mt-1">Local only</p>
          </div>
        </div>
      </div>
    </div>
  )
}
