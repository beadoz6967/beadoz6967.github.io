'use client'

import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { transformToRadarSense } from '@/app/lib/transform'
import UploadZone from '@/components/UploadZone'
import RadarPulse from '@/components/RadarPulse'
import ResultDisplay from '@/components/ResultDisplay'

export type Stage = 'idle' | 'processing' | 'result' | 'error'

const stageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35 },
}

export default function Home() {
  const [stage, setStage] = useState<Stage>('idle')
  const [transformed, setTransformed] = useState<string | null>(null)
  const [original, setOriginal] = useState<string | null>(null)
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleFile = useCallback(async (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorMsg('Unsupported format. Use JPEG, PNG, or WebP.')
      setStage('error')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setErrorMsg('File too large. Max 10MB.')
      setStage('error')
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setStage('processing')

    const startTime = Date.now()
    try {
      const [resultDataUrl, originalDataUrl] = await Promise.all([
        transformToRadarSense(file),
        new Promise<string>((res, rej) => {
          const reader = new FileReader()
          reader.onload = () => res(reader.result as string)
          reader.onerror = rej
          reader.readAsDataURL(file)
        }),
      ])
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, 1800 - elapsed)
      setTimeout(() => {
        setOriginal(originalDataUrl)
        setTransformed(resultDataUrl)
        setStage('result')
        URL.revokeObjectURL(objectUrl)
      }, remaining)
    } catch (err) {
      URL.revokeObjectURL(objectUrl)
      setErrorMsg(err instanceof Error ? err.message : 'Unknown error')
      setStage('error')
    }
  }, [])

  const handleReset = useCallback(() => {
    setStage('idle')
    setTransformed(null)
    setOriginal(null)
    setErrorMsg('')
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center pt-20 pb-8 px-4 relative overflow-hidden">
      <div aria-hidden="true" className="hero-aurora" />
      <AnimatePresence mode="wait">
        {stage === 'idle' && (
          <motion.div
            key="idle"
            {...stageFade}
            className="w-full max-w-6xl"
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10 items-stretch">
              <div className="relative border border-crimson-dim/50 bg-void-soft/80 backdrop-blur-sm p-6 md:p-10 clip-panel flex flex-col justify-between">
                <div className="space-y-5">
                  <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-crimson/80">
                    North Star: Detect what the eye misses.
                  </p>
                  <h1 className="font-oswald text-6xl md:text-8xl uppercase leading-[0.85] max-w-2xl">
                    <span className="text-bone">dih</span>{' '}
                    <span className="text-crimson" style={{ textShadow: '0 0 20px #cc0000' }}>
                      devil
                    </span>
                  </h1>
                  <p className="font-crimson text-xl md:text-2xl italic text-bone/90 max-w-xl leading-snug">
                    Browser-only radar sense for photos. No upload. No queue. One decisive pass.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                  <div className="border border-crimson-dim/50 bg-black/30 px-3 py-3">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-bone-dim">Persona</p>
                    <p className="font-mono text-xs text-bone mt-1">Fast creator on mobile + desktop</p>
                  </div>
                  <div className="border border-crimson-dim/50 bg-black/30 px-3 py-3">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-bone-dim">Emotion</p>
                    <p className="font-mono text-xs text-bone mt-1">Tense, tactile, cinematic</p>
                  </div>
                  <div className="border border-crimson-dim/50 bg-black/30 px-3 py-3">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-bone-dim">Promise</p>
                    <p className="font-mono text-xs text-bone mt-1">Processed in seconds, entirely local</p>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.12 }}
                className="self-stretch"
              >
                <UploadZone onFile={handleFile} />
              </motion.div>
            </div>
          </motion.div>
        )}

        {stage === 'processing' && (
          <motion.div key="processing" {...stageFade} className="w-full">
            <RadarPulse />
          </motion.div>
        )}

        {stage === 'result' && transformed && original && (
          <motion.div
            key="result"
            {...stageFade}
            className="flex flex-col items-center gap-8 w-full max-w-2xl"
          >
            <ResultDisplay
              original={original}
              transformed={transformed}
              onReset={handleReset}
            />
          </motion.div>
        )}

        {stage === 'error' && (
          <motion.div
            key="error"
            {...stageFade}
            className="flex flex-col items-center gap-6 text-center"
          >
            <p className="font-oswald text-crimson text-4xl uppercase">
              Error
            </p>
            <p className="font-mono text-bone-dim text-sm max-w-sm">{errorMsg}</p>
            <button
              onClick={() => {
                setErrorMsg('')
                setStage('idle')
              }}
              className="font-mono text-xs tracking-widest uppercase px-6 py-3 border border-crimson text-crimson hover:bg-crimson/10 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
