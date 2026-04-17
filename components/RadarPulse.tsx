'use client'

export interface RadarPulseProps {}

const RING_DELAYS = ['0s', '0.6s', '1.2s', '1.8s']

export default function RadarPulse(_props: RadarPulseProps) {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-10">
      {/* Rings + sweep container */}
      <div className="relative w-48 h-48">
        {/* Sweep line */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              'conic-gradient(from 0deg, rgba(204,0,0,0.25) 0deg, transparent 60deg, transparent 360deg)',
            animation: 'radar-sweep 2s linear infinite',
          }}
        />

        {/* Radar rings */}
        {RING_DELAYS.map((delay, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border border-crimson"
            style={{
              animation: `radar-ring 3s ease-out ${delay} infinite`,
            }}
          />
        ))}

        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-crimson glow-crimson" />
        </div>
      </div>

      {/* Status text */}
      <p className="font-mono text-crimson text-xs tracking-widest uppercase animate-pulse mt-8">
        Processing Signal...
      </p>
    </div>
  )
}
