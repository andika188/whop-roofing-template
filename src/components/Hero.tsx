import React from 'react'
import { Shield, ArrowRight, CheckCircle2, DollarSign, Sparkles, Star, Award, Zap, Rotate3d } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { trackWhopEvent } from '../lib/whop-tracking'

interface HeroProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenEstimate: () => void
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout, onOpenEstimate }) => {
  const handleDepositClick = () => {
    trackWhopEvent('deposit_started', {
      plan_name: SITE_CONFIG.plans.deposit.name,
      amount: SITE_CONFIG.plans.deposit.price,
      currency: 'USD',
      intent: 'high_ticket_job_lock'
    })
    onOpenCheckout('deposit')
  }

  const handleInspectionClick = () => {
    trackWhopEvent('service_viewed', {
      service_name: SITE_CONFIG.plans.inspection.name,
      price: SITE_CONFIG.plans.inspection.price,
      category: 'inspection'
    })
    onOpenCheckout('inspection')
  }

  const handleScrollToVisualizer = () => {
    const el = document.getElementById('roof-visualizer')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1E38] via-[#0D2547] to-[#12315E] text-white pt-14 pb-20 lg:pt-20 lg:pb-28">
      {/* Architectural subtle blueprint lines & vibrant ambient glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{ 
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)`, 
          backgroundSize: '32px 32px' 
        }} 
      />
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none -mr-40 -mt-40" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none -ml-40 -mb-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Prop & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Pill with live stats */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-amber-400 font-extrabold">★ 4.9/5 Rating</span>
              <span className="text-slate-300">| 1,200+ Texas Roofs Protected</span>
              <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-black text-[10px] uppercase">
                GAF Certified
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08]">
              High-Ticket Roofing Built For A{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400">
                Lifetime Of Protection.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl">
              America's modern roofing contractor. From full architectural replacements to emergency hail restorations — experience transparent Whop pricing, 0% APR financing, and online job reservation.
            </p>

            {/* Core Value Badges */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-200">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-white">50-Year Non-Prorated</span>
                  <span className="text-xs text-slate-300">Lifetime Material Guarantee</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-white">Card-On-File Security</span>
                  <span className="text-xs text-slate-300">Whop Setup Intent & Invoicing</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-white">0% APR Financing</span>
                  <span className="text-xs text-slate-300">Klarna, Splitit & Afterpay</span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold block text-white">Insurance Itemized</span>
                  <span className="text-xs text-slate-300">Full Claim Representation</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenEstimate}
                className="px-7 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleScrollToVisualizer}
                className="px-5 py-4 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/20 flex items-center gap-2 border border-blue-400/40 transition"
              >
                <Rotate3d className="w-5 h-5 text-amber-300" />
                <span>Launch 3D Visualizer</span>
              </button>

              <button
                onClick={handleDepositClick}
                className="px-5 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Pay Deposit ($500)</span>
              </button>
            </div>

            {/* Reassurance disclaimer */}
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-medium">
                Official Whop Merchant Account • PCI-DSS Level 1 Compliant • Zero Custom Card Storage
              </span>
            </div>
          </div>

          {/* Right Column: High-Ticket Journey Blueprint Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-white text-slate-900 border-4 border-amber-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-black uppercase text-amber-600 tracking-wider">High-Ticket Vertical</span>
                  <h3 className="text-xl font-black text-blue-950">The End-to-End Whop Flow</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-black">
                  Verified Active
                </div>
              </div>

              {/* 3 Step Interactive Timeline */}
              <div className="mt-6 space-y-4">
                
                {/* Step 1 */}
                <div className="flex gap-4 items-start p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-md">
                    1
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">Deposit & Card-on-File</h4>
                      <span className="text-xs font-extrabold text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">$500 USD</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Homeowner pays $500 reservation fee via Whop Payment Elements. A setup intent secures their payment method for the final project invoice.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 items-start p-3.5 rounded-2xl bg-blue-50 border-2 border-blue-200">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center shrink-0 shadow-md">
                    2
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">Job Execution & Aerial QA</h4>
                      <span className="text-xs font-extrabold text-blue-800 bg-blue-200 px-2 py-0.5 rounded-full">48-Hour</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Certified crews tear off old shingles, install synthetic underlayment and GAF Timberline HDZ / Standing Seam Metal with drone inspection.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 items-start p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center shrink-0 shadow-md">
                    3
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-black text-slate-900">Final Balance Whop Invoice</h4>
                      <span className="text-xs font-extrabold text-emerald-800 bg-emerald-200 px-2 py-0.5 rounded-full">$8,700 Due</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Final balance billed seamlessly via Whop Invoices API (`POST /invoices`). Auto-charges the stored payment method or sends a 1-click payment link.
                    </p>
                  </div>
                </div>

              </div>

              {/* Action buttons inside card */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={handleInspectionClick}
                  className="text-xs font-bold text-slate-600 hover:text-blue-900 underline"
                >
                  Diagnostic Inspection ($149)
                </button>
                <button
                  onClick={handleDepositClick}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-md transition"
                >
                  Lock Deposit ($500) →
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
