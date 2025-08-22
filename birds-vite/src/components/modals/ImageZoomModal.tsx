import { useState, useRef, useEffect } from "react"
import { fetchWatermarkedImageWithCache } from '@/utils/images'
import XIcon from '@/components/icons/XIcon';
import ZoomPlusIcon from '@/components/icons/ZoomPlusIcon';
import ZoomMinusIcon from '@/components/icons/ZoomMinusIcon';

interface ImageZoomModalProps {
  imageUrl: string
  alt: string
  onClose: () => void
}

export default function ImageZoomModal({ imageUrl, alt, onClose }: ImageZoomModalProps) {
  const [scale, setScale] = useState(1)
  const [position] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    fetchWatermarkedImageWithCache(imageUrl)
      .then((blobUrl) => {
        if (isMounted) setSrc(blobUrl)
      })
      .catch(() => {
        if (isMounted) setSrc('/placeholder.svg')
      })

    return () => {
      isMounted = false
    }
  }, [imageUrl])

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/50 p-2 rounded-full z-10" onClick={onClose}>
          <XIcon className="h-6 w-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          <button className="bg-black/40 hover:bg-black/50 text-white pb-1 px-2 rounded-full flex items-center justify-center h-10 w-10" onClick={handleZoomOut}>
            <ZoomMinusIcon className="h-6 w-6" />
          </button>
          <button className="bg-black/40 hover:bg-black/50 text-white pb-1 px-2 rounded-full flex items-center justify-center h-10 w-10" onClick={handleZoomIn}>
            <ZoomPlusIcon className="h-6 w-6" />
          </button>
        </div>
        <div
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          }}
          className="transition-transform duration-100 ease-out"
        >
          <div className="relative w-[80vw] h-[80vh]">
            {src && (
              <img src={src} alt={alt} className="object-contain w-full h-full select-none" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
