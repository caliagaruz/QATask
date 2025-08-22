type QueueItem = {
  url: string
  resolve: (val: string) => void
  reject: (err: unknown) => void
  priority: number
}

const imageCache = new Map<string, string>()
const MAX_CONCURRENT = 6
let activeCount = 0
const queue: QueueItem[] = []

async function doFetchAndWatermark(url: string): Promise<string> {
  if (imageCache.has(url)) return imageCache.get(url)!

  const res = await fetch(url)
  const buffer = await res.arrayBuffer()

  const wm = await fetch(
    'https://us-central1-copilot-take-home.cloudfunctions.net/watermark',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': buffer.byteLength.toString(),
      },
      body: buffer,
    }
  )

  if (!wm.ok) throw new Error('Watermark failed')

  const blob = new Blob([await wm.arrayBuffer()], { type: 'image/jpeg' })
  const blobUrl = URL.createObjectURL(blob)
  imageCache.set(url, blobUrl)
  return blobUrl
}

export function isImageCached(url: string) {
  return imageCache.has(url)
}

export function fetchWatermarkedImageWithCache(
  url: string,
  priority = 1
): Promise<string> {
  if (imageCache.has(url)) {
    return Promise.resolve(imageCache.get(url)!)
  }

  return new Promise((resolve, reject) => {
    const task = { url, resolve, reject, priority }
    queue.push(task)
    queue.sort((a, b) => a.priority - b.priority)
    processQueue()
  })
}

function processQueue() {
  if (activeCount >= MAX_CONCURRENT || queue.length === 0) return

  const task = queue.shift()
  if (!task) return

  activeCount++

  doFetchAndWatermark(task.url)
    .then(task.resolve)
    .catch(task.reject)
    .finally(() => {
      activeCount--
      processQueue()
    })
}
