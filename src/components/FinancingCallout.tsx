import React from 'react'
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, CreditCard } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { trackWhopEvent } from '../lib/whop-tracking'

interface FinancingCalloutProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenEstimate: () => void
}

export const FinancingCallout: React.FC<FinancingCalloutProps> = ({
  onOpenCheckout,
  onOpenEstimate
}) => {
  const handleFinancingClick = () => {
    trackWhopEvent('service_viewed', {
      service_name: 'Whop 0% APR Financing Inquiry',
      category: 'financing_bnpl',
      partners: 'Klarna, Splitit, Afterpay, Affirm'
    })
    onOpenCheckout('deposit')
  }

  return (
    <section id="financing" className="py-20 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white relative overflow-hidden shadow-2xl">
      {/* Decorative background glow & mesh */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headline & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Whop Flexible Payments • 0% APR Available</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              A Brand-New Roof Now.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                Low Monthly Payments.
              </span>
            </h2>

            <p className="text-base sm:text-lg text-blue-100 leading-relaxed">
              Don’t let upfront costs delay critical storm repairs. With Whop Payments, approved homeowners automatically access modern installment options right at checkout — with zero impact on your credit score.
            </p>

            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
                <span>Plans starting at $129/month</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
                <span>0% APR promotional windows</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
                <span>Instant 30-second pre-approval</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
                <span>No prepayment penalties</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                onClick={handleFinancingClick}
                className="px-6 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <span>Check Your Financing Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onOpenEstimate}
                className="px-5 py-4 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm border border-white/20 transition"
              >
                Request Custom Quote
              </button>
            </div>
          </div>

          {/* Right Column: Whop Payment Methods Badge Showcase */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-white/30 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-700" />
                  <span className="font-black text-slate-900 text-sm">Supported at Whop Checkout</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Instant Access
                </span>
              </div>

              {/* Supported Provider Pills */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 font-black text-xs flex items-center justify-center">
                    Kl.
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Klarna</span>
                    <span className="text-[10px] text-slate-500">Pay in 4 or 36 mos</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-black text-xs flex items-center justify-center">
                    Sp.
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Splitit</span>
                    <span className="text-[10px] text-slate-500">Existing credit card</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-black text-xs flex items-center justify-center">
                    Af.
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Afterpay</span>
                    <span className="text-[10px] text-slate-500">0% interest options</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 font-black text-xs flex items-center justify-center">
                    Am.
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Affirm</span>
                    <span className="text-[10px] text-slate-500">Fixed terms up to 60m</span>
                  </div>
                </div>
              </div>

              {/* Digital Wallets */}
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-950 block">Express Digital Wallets</span>
                  <span className="text-[10px] text-blue-700">Apple Pay & Google Pay supported</span>
                </div>
                <div className="flex gap-1.5">
                  <span className="px-2 py-1 rounded bg-black text-white text-[10px] font-bold"> Pay</span>
                  <span className="px-2 py-1 rounded bg-white text-slate-800 text-[10px] font-bold border border-slate-200">GPay</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Whop Payments Merchant of Record • Safe 256-Bit SSL</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
