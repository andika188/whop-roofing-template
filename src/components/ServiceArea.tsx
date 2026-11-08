import React, { useState } from 'react'
import { MapPin, CheckCircle2, Search, AlertCircle, ArrowRight, Phone } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

interface ServiceAreaProps {
  onOpenEstimate: () => void
}

export const ServiceArea: React.FC<ServiceAreaProps> = ({ onOpenEstimate }) => {
  const [zipInput, setZipInput] = useState('')
  const [zipResult, setZipResult] = useState<{
    searched: boolean
    covered: boolean
    areaName?: string
  } | null>(null)

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = zipInput.trim()
    if (!trimmed) return

    let matchedArea = null
    for (const area of SITE_CONFIG.serviceAreas) {
      if (area.zipCodes.includes(trimmed)) {
        matchedArea = area
        break
      }
    }

    if (matchedArea) {
      setZipResult({
        searched: true,
        covered: true,
        areaName: `${matchedArea.name}, ${matchedArea.state}`
      })
    } else {
      setZipResult({
        searched: true,
        covered: false
      })
    }
  }

  return (
    <section id="service-area" className="py-24 bg-white text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Central Texas Coverage Zone</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Serving Austin, Travis, Williamson & Hays Counties
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            With over 12 fully equipped dispatch trucks and drone inspection crews stationed across Greater Austin, we guarantee rapid estimates within 24 hours.
          </p>
        </div>

        {/* Coverage Grid & Zip Code Checker */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Covered Cities Chips */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Primary Service Hubs (24/7 Rapid Response):</span>
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              {SITE_CONFIG.serviceAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 hover:border-blue-400 transition shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-base">{area.name}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Active
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 font-mono">
                    Sample Zips: {area.zipCodes.slice(0, 3).join(', ')}...
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 pt-2 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Live emergency leak response within 2 hours across all listed territories.</span>
            </p>
          </div>

          {/* Right Column: Interactive Zip Code Validator Card */}
          <div className="lg:col-span-5">
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-slate-800 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Instant Check</span>
                <h3 className="text-2xl font-black mt-1">Check Your Address Eligibility</h3>
                <p className="text-xs text-slate-300 mt-2">
                  Enter your Texas postal code to confirm instant Whop booking and drone inspection availability.
                </p>
              </div>

              <form onSubmit={handleCheckZip} className="space-y-3">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="e.g. 78701 or 78664"
                      value={zipInput}
                      onChange={(e) => setZipInput(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm font-mono focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-md transition"
                  >
                    Check
                  </button>
                </div>
              </form>

              {/* Result State */}
              {zipResult && (
                <div className="animate-fadeIn">
                  {zipResult.covered ? (
                    <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Coverage Confirmed!</span>
                      </div>
                      <p className="text-slate-200">
                        We actively service {zipResult.areaName}. You can schedule an inspection ($149) or lock your job deposit ($500) online via Whop right now.
                      </p>
                      <button
                        onClick={onOpenEstimate}
                        className="mt-2 text-xs font-bold text-amber-300 hover:underline flex items-center gap-1"
                      >
                        <span>Schedule Free On-Site Inspection →</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                      <div className="flex items-center gap-2 font-bold text-amber-400">
                        <AlertCircle className="w-4 h-4" />
                        <span>Extended Region Verification</span>
                      </div>
                      <p className="text-slate-300">
                        While '{zipInput}' may be outside our automated fast-dispatch boundary, we regularly handle high-ticket estate projects across all of Central Texas.
                      </p>
                      <a
                        href={`tel:${SITE_CONFIG.phone}`}
                        className="mt-2 text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Dispatch: {SITE_CONFIG.phone}</span>
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800 flex justify-between items-center">
                <span>Free Drone Assessment</span>
                <span className="text-amber-400 font-semibold">Zero-Obligation Estimate</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
