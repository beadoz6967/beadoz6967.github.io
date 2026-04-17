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
        'flex flex-col items-center justify-center gap-4',
        'w-full max-w-lg mx-auto aspect-square sm:aspect-video rounded-sm p-5 sm:p-8',
        'border-2 border-dashed',
        isDragging
          ? 'border-crimson-bright bg-[#0a0000]'
          : 'border-crimson-dim hover:border-crimson/60 bg-void-soft',
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

      {/* Inner text */}
      {isDragging ? (
        <p className="font-mono text-crimson text-sm tracking-widest uppercase">
          {dragFileName || 'Release to process'}
        </p>
      ) : (
        <>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            className="opacity-40"
            aria-hidden="true"
          >
            <rect x="8" y="14" width="32" height="24" rx="2" stroke="#cc0000" strokeWidth="1.5" />
            <circle cx="24" cy="26" r="6" stroke="#cc0000" strokeWidth="1.5" />
            <path d="M18 14l3-6h6l3 6" stroke="#cc0000" strokeWidth="1.5" />
          </svg>
          <div className="text-center">
            <p className="font-mono text-bone text-sm tracking-widest uppercase">
              Drop photo here
            </p>
            <p className="font-mono text-bone-dim text-xs mt-1 tracking-wide">
              or click to select
            </p>
          </div>
          <p className="font-mono text-bone-dim/50 text-[10px] tracking-widest uppercase">
            JPEG · PNG · WebP · max 10MB
          </p>
        </>
      )}
    </div>
  )
}
