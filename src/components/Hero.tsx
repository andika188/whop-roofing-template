import React from 'react'
import { Shield, ArrowRight, CheckCircle2, DollarSign, Sparkles } from 'lucide-react'
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

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Background Glows & Architectural Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-40 right-10 w-96 h-96 rounded-full bg-amber-500/30 blur-3xl" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-blue-600/30 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>America’s Premier High-Ticket Roofing Contractor</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              Engineered Roofs Built For A <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">Lifetime Of Protection.</span>
            </h1>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              From full storm restorations to lifetime architectural shingle & standing seam metal replacements. Experience seamless, high-ticket roofing with upfront Whop pricing, 0% APR financing, and online job reservation.
            </p>

            {/* Core Value Bullets */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>50-Year Non-Prorated Warranty</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Card-on-File Whop Invoicing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>0% APR Klarna & Splitit Financing</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Insurance Claim Specialists</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenEstimate}
                className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base shadow-xl shadow-amber-500/25 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleInspectionClick}
                className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base border border-slate-700 transition"
              >
                Book Inspection ($149)
              </button>

              <button
                onClick={handleDepositClick}
                className="px-5 py-3.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-semibold text-base border border-amber-500/40 transition flex items-center gap-1.5"
              >
                <DollarSign className="w-4 h-4" />
                <span>Pay Job Deposit ($500)</span>
              </button>
            </div>

            {/* Micro reassurance */}
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Whop Verified Merchant • Encrypted Payment Elements • No Card Storage On Our Servers</span>
            </p>
          </div>

          {/* Right Column: Hero Visual Card with High-Ticket Flow Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl" />

              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono uppercase text-amber-400 tracking-wider">Commercial & Residential</span>
                  <h3 className="text-xl font-bold text-white">The High-Ticket Roof Journey</h3>
                </div>
                <div className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  Whop Enabled
                </div>
              </div>

              {/* 3 Step Interactive Timeline */}
              <div className="mt-6 space-y-5">
                <div className="flex gap-4 items-start p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Step 1: Deposit & Card-On-File</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Client puts down $500 project deposit via Whop Payment Elements. A setup intent secures their payment method for the final balance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Step 2: Expert Construction</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Our certified crews replace or repair the roof using GAF / Owens Corning materials with drone aerial QA inspections.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-3 rounded-xl bg-slate-800/40 border border-slate-800">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Step 3: Final Whop Invoice</h4>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Automated balance invoice (e.g. $7,500) billed via Whop Invoices API. Auto-charges the saved card or sends 1-click payment link.
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant Callout footer inside card */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
                <span>Fast 24h Turnaround</span>
                <span className="text-amber-400 font-semibold cursor-pointer hover:underline" onClick={handleDepositClick}>
                  Reserve Schedule Now →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
