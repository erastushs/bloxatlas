export interface QueueJob {
  id: string
  name: string
  payload: Record<string, unknown>
  createdAt: number
}

type JobHandler = (payload: Record<string, unknown>) => Promise<void>

const handlers = new Map<string, JobHandler>()
const queue: QueueJob[] = []
let processing = false

export function registerJobHandler(name: string, handler: JobHandler): void {
  handlers.set(name, handler)
}

export async function enqueue(name: string, payload: Record<string, unknown> = {}): Promise<void> {
  const job: QueueJob = {
    id: `${name}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    payload,
    createdAt: Date.now(),
  }

  queue.push(job)

  if (!processing) {
    processQueue()
  }
}

async function processQueue(): Promise<void> {
  processing = true

  while (queue.length > 0) {
    const job = queue.shift()
    if (!job) continue

    const handler = handlers.get(job.name)
    if (!handler) continue

    try {
      await handler(job.payload)
    } catch (err) {
      console.error(`Queue job ${job.name} (${job.id}) failed:`, err)
    }
  }

  processing = false
}

export function getQueueLength(): number {
  return queue.length
}