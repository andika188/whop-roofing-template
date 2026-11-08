import React from 'react'
import { Check, CreditCard, Lock } from 'lucide-react'
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
    <section id="pricing" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <CreditCard className="w-3.5 h-3.5" />
            <span>Transparent Whop Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Upfront Rates. Zero Hidden Surprises.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From single inspections to 5-figure roof replacements. Pay via Whop Checkout with credit card, Apple Pay, Google Pay, or 0% APR financing installments.
          </p>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Inspection Fee */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 1 • Diagnostic</span>
                {SITE_CONFIG.plans.inspection.badge && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {SITE_CONFIG.plans.inspection.badge}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mt-3">{SITE_CONFIG.plans.inspection.name}</h3>
              <p className="text-sm text-slate-400 mt-2">{SITE_CONFIG.plans.inspection.description}</p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">{SITE_CONFIG.plans.inspection.priceFormatted}</span>
                <span className="text-sm text-slate-400 font-medium">one-time</span>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">What’s included:</p>
                {SITE_CONFIG.plans.inspection.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6">
              <button
                onClick={() => handleSelectPlan(SITE_CONFIG.plans.inspection, 'inspection')}
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition hover:border-slate-600"
              >
                {SITE_CONFIG.plans.inspection.ctaText}
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">100% refunded as credit upon project hire</p>
            </div>
          </div>

          {/* Plan 2: Project Deposit (Featured / High Ticket) */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/95 border-2 border-amber-500 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl shadow-amber-500/10 transform lg:-translate-y-2">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
              ★ {SITE_CONFIG.plans.deposit.badge}
            </div>
            <div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Step 2 • Reservation</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Card-on-File
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mt-3">{SITE_CONFIG.plans.deposit.name}</h3>
              <p className="text-sm text-slate-300 mt-2">{SITE_CONFIG.plans.deposit.description}</p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">{SITE_CONFIG.plans.deposit.priceFormatted}</span>
                <span className="text-sm text-amber-400 font-medium">project deposit</span>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
                <p className="text-xs font-semibold uppercase text-amber-400 tracking-wider">High-Ticket Protection:</p>
                {SITE_CONFIG.plans.deposit.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-200">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6">
              <button
                onClick={() => handleSelectPlan(SITE_CONFIG.plans.deposit, 'deposit')}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg shadow-amber-500/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>{SITE_CONFIG.plans.deposit.ctaText}</span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  onClick={onOpenInvoiceDemo}
                  className="text-xs text-amber-300/90 hover:text-amber-300 underline font-medium"
                >
                  See how final balance invoice works →
                </button>
              </div>
            </div>
          </div>

          {/* Plan 3: Flat-Rate Tune-Up */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Maintenance • Fast Fix</span>
                {SITE_CONFIG.plans.flatRate.badge && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {SITE_CONFIG.plans.flatRate.badge}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mt-3">{SITE_CONFIG.plans.flatRate.name}</h3>
              <p className="text-sm text-slate-400 mt-2">{SITE_CONFIG.plans.flatRate.description}</p>
              
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-black text-white">{SITE_CONFIG.plans.flatRate.priceFormatted}</span>
                <span className="text-sm text-slate-400 font-medium">flat fee</span>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
                <p className="text-xs font-semibold uppercase text-slate-400 tracking-wider">What’s included:</p>
                {SITE_CONFIG.plans.flatRate.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6">
              <button
                onClick={() => handleSelectPlan(SITE_CONFIG.plans.flatRate, 'flatRate')}
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 font-bold text-sm border border-emerald-500/30 transition hover:border-emerald-500/50"
              >
                {SITE_CONFIG.plans.flatRate.ctaText}
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">Scheduled within 48 hours of checkout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
