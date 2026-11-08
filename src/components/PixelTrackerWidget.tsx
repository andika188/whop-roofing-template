import React, { useState, useEffect } from 'react'
import { Activity, ChevronDown, ChevronUp, Terminal, CheckCircle2, Copy } from 'lucide-react'
import { subscribeToPixelEvents, eventHistory, trackWhopEvent, type TrackedPixelEvent } from '../lib/whop-tracking'

export const PixelTrackerWidget: React.FC = () => {
  const [events, setEvents] = useState<TrackedPixelEvent[]>([...eventHistory])
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = subscribeToPixelEvents((newEvent) => {
      setEvents(prev => [newEvent, ...prev.slice(0, 29)])
    })
    return () => unsubscribe()
  }, [])

  const copyPayload = (event: TrackedPixelEvent) => {
    navigator.clipboard.writeText(JSON.stringify(event.payload, null, 2))
    setCopiedId(event.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const triggerSampleEvent = (eventName: 'estimate_requested' | 'service_viewed' | 'deposit_started') => {
    if (eventName === 'estimate_requested') {
      trackWhopEvent('estimate_requested', {
        sample: true,
        customer_name: 'Test Homeowner',
        service_type: 'Full Roof Replacement',
        estimated_budget: '$15,000'
      })
    } else if (eventName === 'service_viewed') {
      trackWhopEvent('service_viewed', {
        sample: true,
        service_name: '21-Point Roof Inspection',
        price: 149,
        category: 'inspection'
      })
    } else if (eventName === 'deposit_started') {
      trackWhopEvent('deposit_started', {
        sample: true,
        plan_name: 'Roof Project Deposit',
        amount: 500,
        currency: 'USD',
        flow: 'setup_intent'
      })
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 font-sans">
      {/* Floating Pill Toggle */}
      <div className="bg-slate-900 border border-amber-500/50 shadow-2xl rounded-2xl overflow-hidden max-w-sm sm:max-w-md backdrop-blur-md">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2.5 flex items-center justify-between gap-3 bg-slate-950/90 text-white text-xs font-semibold hover:bg-slate-900 transition"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Whop Pixel Event Stream</span>
            <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono text-[10px]">
              {events.length} Fired
            </span>
          </div>
          {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Expanded Console */}
        {isExpanded && (
          <div className="p-4 bg-slate-950/95 border-t border-slate-800 text-xs space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5 text-amber-400" />
                <span>Live whop.track Logger</span>
              </span>
              <span>whop.site pixel native</span>
            </div>

            {/* Quick Test Fire Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => triggerSampleEvent('estimate_requested')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-amber-300 border border-slate-700 font-mono"
              >
                + estimate_requested
              </button>
              <button
                onClick={() => triggerSampleEvent('service_viewed')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-blue-300 border border-slate-700 font-mono"
              >
                + service_viewed
              </button>
              <button
                onClick={() => triggerSampleEvent('deposit_started')}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-emerald-300 border border-slate-700 font-mono"
              >
                + deposit_started
              </button>
            </div>

            {/* Events List */}
            <div className="max-h-56 overflow-y-auto space-y-2 pr-1 font-mono text-[11px]">
              {events.length === 0 ? (
                <div className="p-4 text-center text-slate-500 italic">
                  No custom pixel events yet. Click any button or form above to track!
                </div>
              ) : (
                events.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1 hover:border-slate-700 transition"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-emerald-400">
                        whop.track('{evt.eventName}')
                      </span>
                      <span className="text-[10px] text-slate-500">{evt.timestamp}</span>
                    </div>

                    <pre className="text-[10px] text-slate-300 bg-slate-950 p-1.5 rounded overflow-x-auto max-h-24">
                      {JSON.stringify(evt.payload, null, 2)}
                    </pre>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => copyPayload(evt)}
                        className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedId === evt.id ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied Payload</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Payload</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
