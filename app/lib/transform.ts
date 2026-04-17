'use client'

function gaussianBlur(
  luma: Float32Array,
  width: number,
  height: number,
  radius: number
): Float32Array {
  const kernel: number[] = []
  let sum = 0
  const sigma = radius / 2

  for (let i = -radius; i <= radius; i++) {
    const val = Math.exp(-(i * i) / (2 * sigma * sigma))
    kernel.push(val)
    sum += val
  }
  kernel.forEach((v, i) => (kernel[i] = v / sum))

  const blurred = new Float32Array(luma.length)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let acc = 0
      for (let i = -radius; i <= radius; i++) {
        const nx = Math.max(0, Math.min(width - 1, x + i))
        acc += luma[y * width + nx] * kernel[i + radius]
      }
      blurred[y * width + x] = acc
    }
  }

  const final = new Float32Array(luma.length)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let acc = 0
      for (let i = -radius; i <= radius; i++) {
        const ny = Math.max(0, Math.min(height - 1, y + i))
        acc += blurred[ny * width + x] * kernel[i + radius]
      }
      final[y * width + x] = acc
    }
  }

  return final
}

function applySobel(
  luma: Float32Array,
  width: number,
  height: number,
  data: Uint8ClampedArray
): void {
  const Gx = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]]
  const Gy = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]]

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0
      let gy = 0

      for (let ky = 0; ky < 3; ky++) {
        for (let kx = 0; kx < 3; kx++) {
          const nx = x + kx - 1
          const ny = y + ky - 1
          const luminance = luma[ny * width + nx]
          gx += luminance * Gx[ky][kx]
          gy += luminance * Gy[ky][kx]
        }
      }

      const magnitude = Math.sqrt(gx * gx + gy * gy)
      if (magnitude > 90) {
        const i = (y * width + x) * 4
        const strength = Math.min(magnitude / 200, 1)
        data[i]     = Math.round(200 + 55 * strength)
        data[i + 1] = Math.round(15  * (1 - strength))
        data[i + 2] = Math.round(15  * (1 - strength))
        data[i + 3] = Math.round(200 + 55 * strength)
      }
    }
  }
}

function drawRadarRings(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const cx = width / 2
  const cy = height / 2
  const maxR = Math.sqrt(cx * cx + cy * cy) * 1.2
  const ringSpacing = maxR / 5

  ctx.strokeStyle = 'rgba(200,0,0,0.4)'
  ctx.lineWidth = 1.2

  for (let r = ringSpacing; r < maxR; r += ringSpacing) {
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Center sweep line at fixed angle (0 rad)
  ctx.strokeStyle = 'rgba(220,0,0,0.6)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + maxR, cy)
  ctx.stroke()
}

function addVignette(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const gradient = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, Math.max(width, height))
  gradient.addColorStop(0, 'rgba(0,0,0,0)')
  gradient.addColorStop(0.7, 'rgba(0,0,0,0.2)')
  gradient.addColorStop(1, 'rgba(150,0,0,0.4)')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)
}

export async function transformToRadarSense(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      const img = new Image()

      img.onerror = () => reject(new Error('Transform failed: could not load image'))

      img.onload = () => {
        try {
          const maxWidth = 800
          const targetWidth = img.width <= maxWidth ? img.width : maxWidth
          const targetHeight = Math.round((img.height / img.width) * targetWidth)

          const canvas = document.createElement('canvas')
          canvas.width = targetWidth
          canvas.height = targetHeight

          const ctx = canvas.getContext('2d')
          if (!ctx) throw new Error('Could not get 2D context')

          ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

          const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight)
          const { data } = imageData

          // Compute luminance
          const luma = new Float32Array(targetWidth * targetHeight)
          for (let i = 0; i < data.length; i += 4) {
            luma[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
          }

          // Blur to reduce noise
          const blurred = gaussianBlur(luma, targetWidth, targetHeight, 3)

          // Fill black
          for (let i = 0; i < data.length; i += 4) {
            data[i] = 0
            data[i + 1] = 0
            data[i + 2] = 0
            data[i + 3] = 255
          }

          // Sobel on blurred luminance
          applySobel(blurred, targetWidth, targetHeight, data)
          ctx.putImageData(imageData, 0, 0)

          // Contrast pass
          const resultCanvas = document.createElement('canvas')
          resultCanvas.width = targetWidth
          resultCanvas.height = targetHeight
          const resultCtx = resultCanvas.getContext('2d')
          if (!resultCtx) throw new Error('Could not get result context')
          resultCtx.filter = 'contrast(1.4) brightness(1.15)'
          resultCtx.drawImage(canvas, 0, 0)

          // Draw radar rings overlay
          drawRadarRings(resultCtx, targetWidth, targetHeight)

          // Add vignette
          addVignette(resultCtx, targetWidth, targetHeight)

          resolve(resultCanvas.toDataURL('image/png'))
        } catch (err) {
          reject(new Error('Transform failed: ' + (err instanceof Error ? err.message : String(err))))
        }
      }

      img.src = URL.createObjectURL(file)
    } catch (err) {
      reject(new Error('Transform failed: ' + (err instanceof Error ? err.message : String(err))))
    }
  })
}
