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
    <main className="min-h-screen flex flex-col items-center justify-center pt-20 pb-8 px-4">
      <AnimatePresence mode="wait">
        {stage === 'idle' && (
          <motion.div
            key="idle"
            {...stageFade}
            className="flex flex-col items-center gap-8 w-full max-w-2xl"
          >
            {/* Hero text */}
            <div className="text-center space-y-3">
              <h1 className="font-oswald text-6xl md:text-8xl uppercase leading-none">
                <span className="text-bone">dih</span>
                <span
                  className="text-crimson"
                  style={{ textShadow: '0 0 20px #cc0000' }}
                >
                  devil
                </span>
              </h1>
              <p className="font-mono text-bone-dim text-sm tracking-wide">
                Edge detection for any image.
              </p>
            </div>

            <UploadZone onFile={handleFile} />
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
