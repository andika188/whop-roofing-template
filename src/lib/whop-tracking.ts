declare global {
  interface Window {
    whop?: {
      track: (eventName: string, data?: Record<string, any>) => void
      [key: string]: any
    }
  }
}

export interface TrackedPixelEvent {
  id: string
  eventName: 'estimate_requested' | 'service_viewed' | 'deposit_started' | string
  payload: Record<string, any>
  timestamp: string
}

type EventListener = (event: TrackedPixelEvent) => void

const listeners: Set<EventListener> = new Set()
export const eventHistory: TrackedPixelEvent[] = []

export function subscribeToPixelEvents(callback: EventListener) {
  listeners.add(callback)
  return () => {
    listeners.delete(callback)
  }
}

export function trackWhopEvent(eventName: string, payload: Record<string, any> = {}) {
  const eventItem: TrackedPixelEvent = {
    id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    eventName,
    payload,
    timestamp: new Date().toLocaleTimeString()
  }

  eventHistory.unshift(eventItem)
  if (eventHistory.length > 30) eventHistory.pop()

  // 1. Call official Whop pixel if loaded on whop.site / whop.app
  if (typeof window !== 'undefined' && window.whop && typeof window.whop.track === 'function') {
    try {
      window.whop.track(eventName, payload)
      console.log(`[Whop Pixel] Successfully fired: ${eventName}`, payload)
    } catch (err) {
      console.warn(`[Whop Pixel] Failed to track via window.whop:`, err)
    }
  } else {
    console.log(`[Whop Pixel Emulated] ${eventName}`, payload)
  }

  // 2. Notify in-app subscribers (Pixel Console)
  listeners.forEach((listener) => {
    try {
      listener(eventItem)
    } catch (e) {
      console.error(e)
    }
  })

  // 3. Dispatch DOM CustomEvent for external loggers/extensions
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('whop:pixel:event', {
        detail: eventItem
      })
    )
  }
}
