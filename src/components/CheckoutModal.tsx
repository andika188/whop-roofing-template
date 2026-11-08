import React, { useState, useEffect, useMemo } from 'react'
import { X, Shield, Lock, CreditCard, Sparkles, CheckCircle2, ExternalLink } from 'lucide-react'
import { 
  WhopElements, 
  Payments, 
  PaymentElement, 
  EmailElement, 
  BrandingElement, 
  Checkout, 
  CheckoutElement, 
  ExpressCheckoutElement 
} from '@whop/elements-react'
import { loadWhop } from '@whop/elements'
import { SITE_CONFIG, type PlanConfig } from '../config/site'
import { trackWhopEvent } from '../lib/whop-tracking'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  initialPlanType?: 'inspection' | 'deposit' | 'flatRate'
  onOpenInvoiceDemo?: () => void
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialPlanType = 'deposit',
  onOpenInvoiceDemo
}) => {
  const [selectedPlanKey, setSelectedPlanKey] = useState<'inspection' | 'deposit' | 'flatRate'>(initialPlanType)
  const [checkoutMode, setCheckoutMode] = useState<'full_checkout' | 'payment_element'>('payment_element')
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [testCardInfo, setTestCardInfo] = useState({
    name: 'Sarah Connor',
    email: 'sarah.connor@example.com'
  })

  useEffect(() => {
    if (initialPlanType) {
      setSelectedPlanKey(initialPlanType)
    }
  }, [initialPlanType])

  const plan: PlanConfig = SITE_CONFIG.plans[selectedPlanKey]

  const whopElementsInstance = useMemo(() => {
    if (typeof window !== 'undefined') {
      try {
        return loadWhop()
      } catch (e) {
        console.warn('loadWhop error:', e)
        return null
      }
    }
    return null
  }, [])

  if (!isOpen) return null

  const handleSimulateSuccess = () => {
    setPaymentSuccess(true)
    trackWhopEvent('payment_completed', {
      plan_name: plan.name,
      amount: plan.price,
      currency: 'USD',
      plan_id: plan.id,
      card_saved: selectedPlanKey === 'deposit'
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>Whop Secure Checkout</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                  PCI-DSS Level 1
                </span>
              </h3>
              <p className="text-xs text-slate-400">Merchant of Record: Whop Payments • No Custom Card Forms</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {paymentSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-2xl font-black text-white">Payment Confirmed!</h4>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Successfully processed via Whop Payment Elements for <span className="font-bold text-white">{plan.name}</span> ({plan.priceFormatted}).
              </p>

              {selectedPlanKey === 'deposit' && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 text-left max-w-md mx-auto text-xs space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>Card-On-File Stored (Setup Intent)</span>
                  </div>
                  <p className="text-slate-300">
                    The payment method was stored with off-session usage permission. When the roofing job completes, the final balance can be billed via Whop Invoices API.
                  </p>
                  {onOpenInvoiceDemo && (
                    <button
                      onClick={() => {
                        onClose()
                        onOpenInvoiceDemo()
                      }}
                      className="mt-2 text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                    >
                      <span>Simulate Final Balance Invoice Now →</span>
                    </button>
                  )}
                </div>
              )}

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setPaymentSuccess(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Reset Checkout Test
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Plan Switcher */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Select Product / Plan
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['inspection', 'deposit', 'flatRate'] as const).map((key) => {
                    const p = SITE_CONFIG.plans[key]
                    const isSelected = selectedPlanKey === key
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedPlanKey(key)}
                        className={`p-3 rounded-xl border text-left transition ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[11px] font-semibold text-amber-400 truncate">{p.name}</div>
                        <div className="text-lg font-black text-white mt-1">{p.priceFormatted}</div>
                        <div className="text-[10px] text-slate-500 uppercase">{p.type}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* High-Ticket Deposit Card-on-File Notice */}
              {selectedPlanKey === 'deposit' && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start gap-3">
                  <CreditCard className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Card-On-File Setup Intent Active</span>
                    <span className="text-slate-300">
                      This deposit reserves your construction slot. Your payment method is tokenized for automatic or manual invoice collection upon job completion.
                    </span>
                  </div>
                </div>
              )}

              {/* Whop Elements Integration Display */}
              <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase">Whop Elements Container</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">Plan ID:</span>
                    <span className="text-[11px] font-mono text-amber-400">{plan.id}</span>
                  </div>
                </div>

                {/* Embedded Whop Elements React Framework */}
                {whopElementsInstance ? (
                  <WhopElements elements={whopElementsInstance}>
                    <div className="space-y-4">
                      {checkoutMode === 'payment_element' ? (
                        <Payments
                          accountId={SITE_CONFIG.whopAccountId}
                          currency="usd"
                          amount={plan.price * 100}
                          fallback={
                            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 text-center">
                              Loading Whop Hosted Elements...
                            </div>
                          }
                        >
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Buyer Email</label>
                              <EmailElement className="w-full" />
                            </div>

                            <div>
                              <label className="block text-xs font-semibold text-slate-400 mb-1">Payment Method & Financing</label>
                              <PaymentElement className="w-full" />
                            </div>

                            {/* Required Whop Branding Element */}
                            <div className="pt-2">
                              <BrandingElement className="w-full" />
                            </div>
                          </div>
                        </Payments>
                      ) : (
                        <Checkout
                          plan={plan.id}
                          fallback={
                            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 text-center">
                              Loading Whop Checkout...
                            </div>
                          }
                        >
                          <div className="space-y-3">
                            <ExpressCheckoutElement className="w-full" />
                            <CheckoutElement className="w-full" />
                          </div>
                        </Checkout>
                      )}
                    </div>
                  </WhopElements>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2 text-center">
                    <p>Whop Elements Loader Initialized</p>
                    <p className="text-[11px] text-slate-400">
                      Plan: <span className="text-white font-bold">{plan.name}</span> ({plan.priceFormatted})
                    </p>
                  </div>
                )}

                {/* Test Checkout Helper & Direct Whop Link */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <button
                    onClick={handleSimulateSuccess}
                    className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Complete Test Checkout ({plan.priceFormatted})</span>
                  </button>

                  <a
                    href={plan.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:underline flex items-center gap-1 text-xs"
                  >
                    <span>Open Hosted Whop Checkout</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-bit TLS Encrypted Checkout</span>
          </div>
          <span className="font-mono text-slate-500">{SITE_CONFIG.legalName}</span>
        </div>
      </div>
    </div>
  )
}
