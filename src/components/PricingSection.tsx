import React from 'react'
import { Check, CreditCard, Lock, Sparkles, FileText, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react'
import { SITE_CONFIG, type PlanConfig } from '../config/site'
import { trackWhopEvent } from '../lib/whop-tracking'

interface PricingSectionProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenInvoiceDemo: () => void
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenCheckout,
  onOpenInvoiceDemo
}) => {
  const handleSelectPlan = (plan: PlanConfig, planKey: 'inspection' | 'deposit' | 'flatRate') => {
    if (planKey === 'deposit') {
      trackWhopEvent('deposit_started', {
        plan_name: plan.name,
        amount: plan.price,
        currency: 'USD',
        flow: 'card_on_file_setup_intent'
      })
    } else {
      trackWhopEvent('service_viewed', {
        service_name: plan.name,
        price: plan.price,
        category: plan.type
      })
    }
    onOpenCheckout(planKey)
  }

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Whop Plans & Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Transparent Pricing. Zero Hidden Fees.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            From single inspections to 5-figure roof replacements. Checkout with credit card, Apple Pay, Google Pay, or split into 0% APR financing installments via Whop.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Plan 1: Inspection Fee ($149) */}
          <div className="bg-white border-2 border-slate-200 hover:border-blue-400 rounded-3xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-wider text-blue-600">Step 1 • Diagnostic</span>
                {SITE_CONFIG.plans.inspection.badge && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    {SITE_CONFIG.plans.inspection.badge}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-3">{SITE_CONFIG.plans.inspection.name}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{SITE_CONFIG.plans.inspection.description}</p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-black text-blue-950">{SITE_CONFIG.plans.inspection.priceFormatted}</span>
                <span className="text-sm text-slate-500 font-bold">one-time</span>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <p className="text-xs font-black uppercase text-slate-500 tracking-wider">What’s included:</p>
                {SITE_CONFIG.plans.inspection.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => handleSelectPlan(SITE_CONFIG.plans.inspection, 'inspection')}
                className="w-full py-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-sm shadow-md transition"
              >
                {SITE_CONFIG.plans.inspection.ctaText}
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">100% credited towards your roof replacement</p>
            </div>
          </div>

          {/* Plan 2: Project Deposit ($500) - Featured / High Ticket */}
          <div className="bg-gradient-to-b from-white via-amber-50/40 to-white border-3 border-amber-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl ring-4 ring-amber-500/15 transform lg:-translate-y-3">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.plans.deposit.badge}</span>
            </div>

            <div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-700">Step 2 • Job Reservation</span>
                <span className="text-[11px] font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  Card-On-File Setup Intent
                </span>
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mt-3">{SITE_CONFIG.plans.deposit.name}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{SITE_CONFIG.plans.deposit.description}</p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-black text-amber-600">{SITE_CONFIG.plans.deposit.priceFormatted}</span>
                <span className="text-sm text-slate-500 font-bold">reservation deposit</span>
              </div>

              {/* Card-on-file badge */}
              <div className="mt-4 p-3 rounded-2xl bg-amber-100/70 border border-amber-300 text-xs text-amber-950 flex items-center gap-2 font-semibold">
                <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Stores off-session card permission for final balance invoicing.</span>
              </div>

              <div className="mt-6 pt-5 border-t border-amber-200/60 space-y-3">
                <p className="text-xs font-black uppercase text-slate-500 tracking-wider">High-ticket guarantees:</p>
                {SITE_CONFIG.plans.deposit.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-800">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-amber-200/60 space-y-2.5">
              <button
                onClick={() => handleSelectPlan(SITE_CONFIG.plans.deposit, 'deposit')}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-base shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>{SITE_CONFIG.plans.deposit.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenInvoiceDemo}
                className="w-full py-2.5 text-xs font-extrabold text-blue-900 hover:text-blue-700 flex items-center justify-center gap-1.5 transition"
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>See Final Invoice Balance Simulator ($8,700) →</span>
              </button>
            </div>
          </div>

          {/* Plan 3: Flat-Rate Roof Guard ($399) */}
          <div className="bg-white border-2 border-slate-200 hover:border-purple-400 rounded-3xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-black uppercase tracking-wider text-purple-600">Flat-Rate Maintenance</span>
                {SITE_CONFIG.plans.flatRate.badge && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
                    {SITE_CONFIG.plans.flatRate.badge}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mt-3">{SITE_CONFIG.plans.flatRate.name}</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">{SITE_CONFIG.plans.flatRate.description}</p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-black text-purple-950">{SITE_CONFIG.plans.flatRate.priceFormatted}</span>
                <span className="text-sm text-slate-500 font-bold">flat-rate fee</span>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
                <p className="text-xs font-black uppercase text-slate-500 tracking-wider">What’s included:</p>
                {SITE_CONFIG.plans.flatRate.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={() => handleSelectPlan(SITE_CONFIG.plans.flatRate, 'flatRate')}
                className="w-full py-4 rounded-xl bg-purple-950 hover:bg-purple-900 text-white font-black text-sm shadow-md transition"
              >
                {SITE_CONFIG.plans.flatRate.ctaText}
              </button>
              <p className="text-[11px] text-center text-slate-500 mt-2 font-medium">Includes 1-year no-leak workmanship warranty</p>
            </div>
          </div>

        </div>

        {/* High-Ticket Invoicing Deep Dive Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-800">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono uppercase text-amber-400 tracking-widest font-bold">Whop Invoices API & Card-on-File Demo</span>
            </div>
            <h4 className="text-2xl font-black">How High-Ticket Roofing Works on Whop</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Because roofing jobs often exceed $10,000, homeowners first pay the $500 project deposit. Whop saves the payment method via a setup intent. Upon final drone inspection, the remaining balance ($8,700) is generated via Whop Invoices API with automatic charge or 1-click email link.
            </p>
          </div>

          <button
            onClick={onOpenInvoiceDemo}
            className="px-6 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center gap-2 shrink-0 transition transform hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span>Launch Interactive Invoice Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  )
}
