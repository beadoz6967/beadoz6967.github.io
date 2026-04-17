// This file runs client-side only. No Node APIs.
'use client'

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
      if (magnitude > 40) {
        const i = (y * width + x) * 4
        // Additive edge highlight — only upgrades pixels on strong edges
        data[i] = 255
        data[i + 1] = 26
        data[i + 2] = 26
        data[i + 3] = 255
      }
    }
  }
}

export async function transformToRadarSense(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      const img = new Image()

      img.onerror = () => reject(new Error('Transform failed: could not load image'))

      img.onload = () => {
        try {
          // Step 1 — Resize to max 800px, preserve aspect ratio
          const maxWidth = 800
          const targetWidth = img.width <= maxWidth ? img.width : maxWidth
          const targetHeight = Math.round((img.height / img.width) * targetWidth)

          const offscreenCanvas = document.createElement('canvas')
          offscreenCanvas.width = targetWidth
          offscreenCanvas.height = targetHeight

          const ctx = offscreenCanvas.getContext('2d')
          if (!ctx) throw new Error('Could not get 2D context')

          ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

          const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight)
          const { data } = imageData

          // Store luminance values BEFORE threshold pass (needed for Sobel)
          const luma = new Float32Array(targetWidth * targetHeight)
          for (let i = 0; i < data.length; i += 4) {
            luma[i / 4] = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]
          }

          // Step 2 — Luminance threshold pass
          for (let i = 0; i < data.length; i += 4) {
            const L = luma[i / 4]
            if (L > 30) {
              data[i] = 204      // #cc0000
              data[i + 1] = 0
              data[i + 2] = 0
              data[i + 3] = 255
            } else {
              data[i] = 0        // #000000
              data[i + 1] = 0
              data[i + 2] = 0
              data[i + 3] = 255
            }
          }

          ctx.putImageData(imageData, 0, 0)

          // Step 3 — Sobel edge detection on original luminance, applied additively
          const edgeData = ctx.getImageData(0, 0, targetWidth, targetHeight)
          applySobel(luma, targetWidth, targetHeight, edgeData.data)
          ctx.putImageData(edgeData, 0, 0)

          // Step 4 — CSS filter pass for contrast/brightness
          const resultCanvas = document.createElement('canvas')
          resultCanvas.width = targetWidth
          resultCanvas.height = targetHeight

          const resultCtx = resultCanvas.getContext('2d')
          if (!resultCtx) throw new Error('Could not get result 2D context')

          resultCtx.filter = 'contrast(1.4) brightness(0.9)'
          resultCtx.drawImage(offscreenCanvas, 0, 0)

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
