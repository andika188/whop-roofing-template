import React from 'react'
import { Wrench, Home, Search, ShieldCheck, ArrowRight, Check } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { trackWhopEvent } from '../lib/whop-tracking'

interface ServicesProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenEstimate: () => void
}

export const Services: React.FC<ServicesProps> = ({ onOpenCheckout, onOpenEstimate }) => {
  const handleServiceClick = (serviceName: string, category: string, price?: number, planType?: 'inspection' | 'deposit' | 'flatRate') => {
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
    <section id="services" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Master Craftsman Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Complete Roofing Solutions Built For High-Ticket Longevity
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Whether you need a full architectural replacement, rapid hail repair, or an insurance-ready drone inspection — checkout seamlessly with Whop Payments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Service 1: Roof Replacement */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition group hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">High-Ticket Vertical</span>
              <h3 className="text-xl font-bold text-white mt-1">Full Roof Replacement</h3>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                Complete tear-off and installation of GAF Timberline HDZ architectural shingles, standing seam metal, or designer tile with 50-year warranty.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>50-Year Non-Prorated Warranty</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>$500 Whop Deposit to Lock Date</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Card-on-File Invoicing for Balance</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => handleServiceClick('Full Roof Replacement', 'replacement', 500, 'deposit')}
                className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <span>Reserve with $500 Deposit</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Service 2: Roof Repair */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition group hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Emergency & Storm</span>
              <h3 className="text-xl font-bold text-white mt-1">Storm & Leak Repairs</h3>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                Targeted structural leak isolation, chimney flashing reconstruction, pipe boot repairs, and wind damage restoration before interior damage spreads.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Same-Day Emergency Tarping</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Insurance Itemized Claim Proof</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>No-Leak Workmanship Guarantee</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => handleServiceClick('Storm & Leak Repairs', 'repair')}
                className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <span>Request Free Repair Quote</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

          {/* Service 3: Certified Inspection ($149 plan) */}
          <div className="bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-amber-500/50 rounded-2xl p-6 flex flex-col justify-between relative shadow-xl hover:shadow-amber-500/10 transition group">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider">
              {SITE_CONFIG.plans.inspection.badge}
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-5 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400">Digital Drone Analysis</span>
                <span className="text-lg font-black text-white">{SITE_CONFIG.plans.inspection.priceFormatted}</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">21-Point Roof Inspection</h3>
              <p className="text-sm text-slate-300 mt-2.5 leading-relaxed">
                4K drone aerial imagery, infrared attic leak scan, gutter assessment, and full written inspection report accepted by all major insurance adjusters.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>21-Point Digital PDF Report</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Drone Aerial Orthomosaic 4K Scan</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>100% Credited to Work If Hired</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => handleServiceClick(SITE_CONFIG.plans.inspection.name, 'inspection', 149, 'inspection')}
                className="w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 transition"
              >
                <span>Book Online ({SITE_CONFIG.plans.inspection.priceFormatted})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Service 4: Flat-Rate Tune-Up ($399 plan) */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition group hover:shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Zero Surprise Service</span>
                <span className="text-lg font-black text-white">{SITE_CONFIG.plans.flatRate.priceFormatted}</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">Roof Guard Tune-Up</h3>
              <p className="text-sm text-slate-400 mt-2.5 leading-relaxed">
                Preventative sealing and weatherproofing package. Up to 10 shingle repairs, pipe boots reinforced, flashing sealed, and gutters cleared.
              </p>
              <ul className="mt-4 space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Seals all roof vents & penetrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Up to 10 loose shingle repairs</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>1-Year Leak-Free Guarantee</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <button
                onClick={() => handleServiceClick(SITE_CONFIG.plans.flatRate.name, 'flat_rate', 399, 'flatRate')}
                className="w-full py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center gap-2 transition"
              >
                <span>Order Tune-Up ({SITE_CONFIG.plans.flatRate.priceFormatted})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
