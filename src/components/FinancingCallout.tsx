import React from 'react'
import { Percent, ArrowRight, ShieldCheck } from 'lucide-react'

interface FinancingCalloutProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenEstimate: () => void
}

export const FinancingCallout: React.FC<FinancingCalloutProps> = ({
  onOpenCheckout,
  onOpenEstimate
}) => {
  return (
    <section id="financing" className="py-20 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border-y border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-amber-500/10 border border-amber-500/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
                <Percent className="w-4 h-4" />
                <span>Whop Payments Buy-Now-Pay-Later Integration</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Don’t Postpone Your Roof Replacement. <br />
                <span className="text-amber-400">Finance Starting At 0% APR.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Roofing is an essential high-ticket investment. Because our checkout runs natively on Whop Payments, flexible installment options surface automatically at checkout for approved homeowners.
              </p>

              {/* Supported Options Grid */}
              <div className="grid sm:grid-cols-2 gap-3.5 pt-2 text-sm">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-xs">
                    K
                  </div>
                  <div>
                    <span className="font-bold text-white">Klarna</span>
                    <span className="text-xs text-slate-400 block">Pay in 4 or 6-24 mo installments</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-xs">
                    S
                  </div>
                  <div>
                    <span className="font-bold text-white">Splitit</span>
                    <span className="text-xs text-slate-400 block">Use existing cards with 0% interest</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center text-xs">
                    A
                  </div>
                  <div>
                    <span className="font-bold text-white">Afterpay & Affirm</span>
                    <span className="text-xs text-slate-400 block">Fast instant checkout approval</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">
                    ✓
                  </div>
                  <div>
                    <span className="font-bold text-white">Soft Credit Check</span>
                    <span className="text-xs text-slate-400 block">No impact on your credit score</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => onOpenCheckout('deposit')}
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 transition flex items-center gap-2"
                >
                  <span>Test Deposit Financing ($500)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenEstimate}
                  className="px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition"
                >
                  Get Financing Estimate
                </button>
              </div>
            </div>

            {/* Right Badge / Stats */}
            <div className="lg:col-span-4 bg-slate-950/80 rounded-2xl border border-slate-800 p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Whop Merchant of Record</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Whop handles merchant compliance, PCI-DSS Level 1 tokenization, automated financing routing, and fraud protection.
              </p>
              <div className="pt-2 border-t border-slate-800 text-left space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Card-on-File:</span>
                  <span className="text-amber-400 font-semibold">Enabled (Setup Intent)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Final Balance:</span>
                  <span className="text-emerald-400 font-semibold">Whop Invoices API</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Financing Approval:</span>
                  <span className="text-white font-semibold">Instant (&lt; 60 seconds)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
