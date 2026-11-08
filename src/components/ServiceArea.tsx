import React, { useState } from 'react'
import { MapPin, CheckCircle, AlertCircle, Search, Clock, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

interface ServiceAreaProps {
  onOpenEstimate: () => void
}

export const ServiceArea: React.FC<ServiceAreaProps> = ({ onOpenEstimate }) => {
  const [zipInput, setZipInput] = useState('')
  const [checkResult, setCheckResult] = useState<{ checked: boolean; covered: boolean; areaName?: string }>({
    checked: false,
    covered: false
  })

  const allZips = SITE_CONFIG.serviceAreas.flatMap(a => a.zipCodes)

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault()
    const cleaned = zipInput.trim()
    if (!cleaned) return

    const matchedArea = SITE_CONFIG.serviceAreas.find(a => a.zipCodes.includes(cleaned))
    if (matchedArea) {
      setCheckResult({ checked: true, covered: true, areaName: matchedArea.name })
    } else {
      // If it starts with 78 (Central TX area), consider it covered as extended service!
      if (cleaned.startsWith('78') && cleaned.length === 5) {
        setCheckResult({ checked: true, covered: true, areaName: 'Extended Central Texas Service Zone' })
      } else {
        setCheckResult({ checked: true, covered: false })
      }
    }
  }

  return (
    <section id="service-area" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left: Info & Zip Lookup */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Dedicated Texas Coverage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Proudly Protecting Homes Across Central Texas
            </h2>

            <p className="text-base sm:text-lg text-slate-300">
              We deploy certified master roofers and licensed drone inspectors across the greater Austin metropolitan corridor with prompt 24-hour response times.
            </p>

            {/* Interactive Zip Code Checker */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-sm font-bold text-white mb-2">Check If We Service Your Home:</h3>
              <form onSubmit={handleCheckZip} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={zipInput}
                    onChange={(e) => setZipInput(e.target.value)}
                    placeholder="Enter your 5-digit zip code (e.g. 78701)"
                    maxLength={5}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm transition shrink-0 flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4" />
                  <span>Check</span>
                </button>
              </form>

              {checkResult.checked && (
                <div className="mt-4 p-3.5 rounded-xl border transition animate-fadeIn">
                  {checkResult.covered ? (
                    <div className="flex items-start gap-3 text-emerald-400 bg-emerald-500/10 border-emerald-500/30">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-sm block">Great news! You are in our service zone.</span>
                        <span className="text-xs text-slate-300">
                          {checkResult.areaName} is fully covered for same-day drone inspections and high-ticket roof replacements.
                        </span>
                        <button
                          onClick={onOpenEstimate}
                          className="mt-2 text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                        >
                          <span>Request estimate for this zip</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 text-amber-400 bg-amber-500/10 border-amber-500/30">
                      <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-sm block">Outside Standard Corridor</span>
                        <span className="text-xs text-slate-300">
                          We often handle high-ticket estate roof replacements beyond our standard radius. Request a custom quote to confirm availability.
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Quick Service Highlights */}
            <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>2-Hour Rapid Storm Damage Tarping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Dedicated Local Travis & Williamson County Crews</span>
              </div>
            </div>
          </div>

          {/* Right: Grid of Cities & Coverage Cards */}
          <div className="lg:col-span-5">
            <div className="grid sm:grid-cols-2 gap-3.5">
              {SITE_CONFIG.serviceAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">{area.name}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-400 font-mono">
                      {area.state}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    Zip codes: {area.zipCodes.slice(0, 3).join(', ')}{area.zipCodes.length > 3 ? '...' : ''}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Crews Active Now</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
