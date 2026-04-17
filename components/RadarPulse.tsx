'use client'
import { useEffect, useRef } from 'react'

type RectShape = { type: 'rect'; x: number; y: number; w: number; h: number }
type LineShape = { type: 'line'; x1: number; y1: number; x2: number; y2: number }
type Shape = RectShape | LineShape

const SHAPES: Shape[] = [
  { type: 'rect', x: -160, y: -80,  w: 60,  h: 120 },
  { type: 'rect', x:  120, y: -60,  w: 80,  h: 40  },
  { type: 'rect', x:  -40, y:  100, w: 100, h: 30  },
  { type: 'rect', x:  140, y:   40, w: 30,  h: 80  },
  { type: 'rect', x: -180, y:   60, w: 40,  h: 50  },
  { type: 'line', x1: -120, y1: -120, x2: -60,  y2: -60  },
  { type: 'line', x1:   80, y1: -100, x2:  160,  y2: -50  },
  { type: 'line', x1:  -50, y1:   60, x2:   50,  y2:  80  },
]

export default function RadarPulse() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let animId: number
    let sweepAngle = 0
    const rings: { r: number; alpha: number }[] = []

    function resize() {
      canvas!.width  = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const spawnInterval = setInterval(() => {
      rings.push({ r: 0, alpha: 0.9 })
    }, 600)
    rings.push({ r: 0, alpha: 0.9 })

    const cx = () => canvas!.width  / 2
    const cy = () => canvas!.height / 2

    function getShapeAlpha(sx: number, sy: number) {
      const angle = Math.atan2(sy - cy(), sx - cx())
      let diff = sweepAngle - angle
      while (diff < 0) diff += Math.PI * 2
      while (diff > Math.PI * 2) diff -= Math.PI * 2
      const trail = 1.2
      return diff < trail ? (1 - diff / trail) * 0.85 + 0.05 : 0.05
    }

    function drawGrid() {
      ctx.strokeStyle = 'rgba(120,0,0,0.15)'
      ctx.lineWidth = 0.5
      const step = 40
      for (let x = cx() % step; x < canvas!.width; x += step) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas!.height); ctx.stroke()
      }
      for (let y = cy() % step; y < canvas!.height; y += step) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas!.width, y); ctx.stroke()
      }
    }

    function drawSweep() {
      const r = Math.max(canvas!.width, canvas!.height)
      ctx.save()
      ctx.translate(cx(), cy())
      ctx.rotate(sweepAngle)
      const grd = ctx.createLinearGradient(0, 0, r, 0)
      grd.addColorStop(0, 'rgba(180,0,0,0.35)')
      grd.addColorStop(1, 'rgba(180,0,0,0)')
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, r, -0.4, 0)
      ctx.closePath()
      ctx.fillStyle = grd
      ctx.fill()
      ctx.strokeStyle = 'rgba(220,0,0,0.9)'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(r, 0)
      ctx.stroke()
      ctx.restore()
    }

    function drawRings() {
      const maxR = Math.sqrt(cx() * cx() + cy() * cy()) * 1.2
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i]
        ctx.beginPath()
        ctx.arc(cx(), cy(), ring.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(180,0,0,${ring.alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
        ring.r += 1.8
        ring.alpha -= 0.008
        if (ring.alpha <= 0 || ring.r > maxR) rings.splice(i, 1)
      }
    }

    function drawShapes() {
      SHAPES.forEach(s => {
        if (s.type === 'rect') {
          const corners = [
            [cx() + s.x,       cy() + s.y],
            [cx() + s.x + s.w, cy() + s.y],
            [cx() + s.x + s.w, cy() + s.y + s.h],
            [cx() + s.x,       cy() + s.y + s.h],
          ]
          const alpha = Math.max(...corners.map(([x, y]) => getShapeAlpha(x, y)))
          ctx.strokeStyle = `rgba(200,0,0,${alpha})`
          ctx.lineWidth = 1
          ctx.strokeRect(cx() + s.x, cy() + s.y, s.w, s.h)
        } else {
          const alpha = Math.max(
            getShapeAlpha(cx() + s.x1, cy() + s.y1),
            getShapeAlpha(cx() + s.x2, cy() + s.y2)
          )
          ctx.strokeStyle = `rgba(200,0,0,${alpha})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(cx() + s.x1, cy() + s.y1)
          ctx.lineTo(cx() + s.x2, cy() + s.y2)
          ctx.stroke()
        }
      })
    }

    function drawCenter() {
      ctx.beginPath()
      ctx.arc(cx(), cy(), 3, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,30,30,0.95)'
      ctx.fill()
    }

    function loop() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx.fillStyle = '#000'
      ctx.fillRect(0, 0, canvas!.width, canvas!.height)
      drawGrid()
      drawSweep()
      drawRings()
      drawShapes()
      drawCenter()
      sweepAngle += 0.022
      if (sweepAngle > Math.PI * 2) sweepAngle -= Math.PI * 2
      animId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(spawnInterval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-10">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-crimson text-xs tracking-widest uppercase animate-pulse">
        Processing Signal...
      </p>
    </div>
  )
}
