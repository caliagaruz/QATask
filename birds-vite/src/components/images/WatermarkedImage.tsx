import { useEffect, useState } from 'react';
import {
  isImageCached,
  fetchWatermarkedImageWithCache,
} from '@/utils/images';
import BirdPlaceholder from '@/assets/images/BirdPlaceholder';
import { useInView } from '@/hooks/useInView';

type Props = {
  url: string
  alt: string
  className?: string
  priority?: number // 0 = high, 1 = default, 2 = low
}

const WatermarkedImage = ({
  url,
  alt,
  className = '',
  priority = 1,
}: Props) => {
  const [src, setSrc] = useState<string | null>(() =>
    isImageCached(url) ? url : null
  )
  const [loaded, setLoaded] = useState(() => isImageCached(url))
  const [hasFetched, setHasFetched] = useState(() => isImageCached(url))

  const [ref, isInView] = useInView({ threshold: 0.1 }) // when at least 10% of the element is visible

  useEffect(() => {
    let isMounted = true

    if (isInView && !hasFetched) {
      fetchWatermarkedImageWithCache(url, priority)
        .then((blobUrl) => {
          if (isMounted) setSrc(blobUrl)
        })
        .catch(() => {
          if (isMounted) setSrc(null)
        })
        .finally(() => {
          if (isMounted) {
            setLoaded(true)
            setHasFetched(true)
          }
        })
    }

    return () => {
      isMounted = false
    }
  }, [isInView, hasFetched, url, priority])

  return (
    <div ref={ref} className={`w-full h-full ${className}`}>
      {loaded ? (
        src ? (
          <img
            src={src}
            alt={alt}
            className="object-cover w-full h-full rounded-lg transition-opacity duration-700 opacity-100"
          />
        ) : (
          <BirdPlaceholder className="w-full h-full rounded-lg" />
        )
      ) : (
        <div className="w-full h-full bg-blue-mist-100 animate-pulse rounded-lg" />
      )}
    </div>
  )
}

export default WatermarkedImage
