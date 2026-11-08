import React from 'react'
import { Wrench, Home, Search, ShieldCheck, ArrowRight, Check, Sparkles, Layers, DollarSign } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { trackWhopEvent } from '../lib/whop-tracking'

interface ServicesProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenEstimate: () => void
}

export const Services: React.FC<ServicesProps> = ({ onOpenCheckout, onOpenEstimate }) => {
  const handleServiceClick = (
    serviceName: string, 
    category: string, 
    price?: number, 
    planType?: 'inspection' | 'deposit' | 'flatRate'
  ) => {
    trackWhopEvent('service_viewed', {
      service_name: serviceName,
      category,
      price: price || 'custom_quote',
      currency: 'USD'
    })

    if (planType) {
      onOpenCheckout(planType)
    } else {
      onOpenEstimate()
    }
  }

  return (
    <section id="services" className="py-24 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>Master Craftsman Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Engineered Roofing Services For High-Ticket Longevity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether you need a lifetime architectural replacement, rapid storm restoration, or an insurance-ready drone diagnostic — book and checkout securely with Whop Payments.
          </p>
        </div>

        {/* 4 Core Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Service 1: Roof Replacement */}
          <div className="bg-white border-2 border-slate-200 hover:border-blue-500 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 mb-5 group-hover:scale-110 transition-transform shadow-md">
                <Home className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">High-Ticket System</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Full Roof Replacement</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Complete tear-off and installation of GAF Timberline HDZ®, standing seam steel, or designer tile with non-prorated 50-year warranty.
              </p>
              
              <ul className="mt-5 space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>50-Year Non-Prorated Warranty</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>$500 Whop Deposit to Lock Slot</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Card-on-File Invoicing for Balance</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleServiceClick('Full Roof Replacement', 'replacement', 500, 'deposit')}
                className="w-full py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>Reserve with $500 Deposit</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Service 2: Storm & Leak Repairs */}
          <div className="bg-white border-2 border-slate-200 hover:border-amber-500 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 mb-5 group-hover:scale-110 transition-transform shadow-md">
                <Wrench className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Emergency & Hail</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Storm & Leak Repairs</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Emergency tarping within 2 hours, flashing reconstruction, pipe boot repairs, and wind damage restoration before interior rot occurs.
              </p>
              
              <ul className="mt-5 space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Rapid 2-Hour Emergency Dispatch</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Insurance Itemized Claim Proof</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>No-Leak Workmanship Guarantee</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleServiceClick('Storm & Leak Repairs', 'repair')}
                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>Request Rapid Repair Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 3: 21-Point Inspection */}
          <div className="bg-white border-2 border-emerald-300 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1 relative ring-2 ring-emerald-500/20">
            <div className="absolute -top-3 right-5 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
              Real Whop Plan • $149
            </div>
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mb-5 group-hover:scale-110 transition-transform shadow-md">
                <Search className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Diagnostic Baseline</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">21-Point Drone Inspection</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                4K aerial drone scanning, attic moisture meter diagnostics, pipe seal verification, and an official PDF claim report for your insurer.
              </p>
              
              <ul className="mt-5 space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Aerial 4K Drone High-Res Imagery</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Attic Thermal Moisture Scanning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>100% Credited If You Hire Us</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleServiceClick('21-Point Drone Inspection', 'inspection', 149, 'inspection')}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>Book Now for $149 (Whop)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 4: Flat-Rate Seasonal Tune-Up */}
          <div className="bg-white border-2 border-slate-200 hover:border-purple-500 rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 group hover:shadow-2xl hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 mb-5 group-hover:scale-110 transition-transform shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">Flat-Rate • $399</span>
              <h3 className="text-xl font-black text-slate-900 mt-1">Roof Guard Tune-Up</h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                Replace up to 10 damaged shingles, re-seal all chimney flashing with commercial silicone, service pipe boots, and clear primary gutters.
              </p>
              
              <ul className="mt-5 space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Up to 10 Shingle Replacements</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>Complete Flashing Re-Sealing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" />
                  <span>1-Year No-Leak Warranty</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleServiceClick('Flat-Rate Roof Guard', 'flat_rate', 399, 'flatRate')}
                className="w-full py-3 rounded-xl bg-purple-900 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition shadow-md"
              >
                <span>Book Tune-Up for $399</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
