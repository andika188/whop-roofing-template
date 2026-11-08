import React, { useState } from 'react'
import { X, FileText, CheckCircle2, Send, CreditCard } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { trackWhopEvent } from '../lib/whop-tracking'
import { createInvoiceServerFn } from '../lib/server-api'

interface InvoiceDemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export const InvoiceDemoModal: React.FC<InvoiceDemoModalProps> = ({ isOpen, onClose }) => {
  const [projectTotal, setProjectTotal] = useState(9200)
  const [depositAmount, setDepositAmount] = useState(500)
  const [collectionMethod, setCollectionMethod] = useState<'auto_charge' | 'send_email'>('auto_charge')
  const [customerName, setCustomerName] = useState('Marcus Sterling')
  const [customerEmail, setCustomerEmail] = useState('marcus.sterling@example.com')
  
  const [loading, setLoading] = useState(false)
  const [invoiceResult, setInvoiceResult] = useState<any | null>(null)

  if (!isOpen) return null

  const remainingBalance = Math.max(0, projectTotal - depositAmount)

  const handleGenerateInvoice = async () => {
    setLoading(true)

    const payload = {
      account_id: SITE_CONFIG.whopAccountId,
      customer_name: customerName,
      customer_email: customerEmail,
      collection_method: collectionMethod,
      total_project_cost: projectTotal,
      deposit_paid: depositAmount,
      balance_due: remainingBalance,
      currency: 'usd',
      line_items: [
        {
          description: "GAF Timberline HDZ Architectural Roof System (32 Squares)",
          amount: projectTotal - 800,
          quantity: 1
        },
        {
          description: "Seamless Aluminum 6-Inch Gutter & Valley Integration",
          amount: 800,
          quantity: 1
        },
        {
          description: "Less: Initial Project Deposit Credited (plan_NOxmF8J4O2rEC)",
          amount: -depositAmount,
          quantity: 1
        }
      ]
    }

    try {
      const result = await createInvoiceServerFn({ data: payload })

      if (result && result.invoice) {
        setInvoiceResult(result.invoice)
      } else {
        // Fallback simulation
        const mockInvoice = {
          id: `inv_${Date.now().toString(36)}`,
          account_id: SITE_CONFIG.whopAccountId,
          amount_due: remainingBalance,
          currency: 'usd',
          status: collectionMethod === 'auto_charge' ? 'paid' : 'sent',
          collection_method: collectionMethod,
          payment_method: collectionMethod === 'auto_charge' ? 'Card on file (Visa •••• 4242)' : 'Email Invoice Link',
          pdf_url: `https://whop.com/invoices/demo-${Date.now()}/pdf`,
          created_at: new Date().toISOString()
        }
        setInvoiceResult(mockInvoice)
      }

      trackWhopEvent('invoice_created', {
        invoice_id: invoiceResult?.id || `inv_${Date.now().toString(36)}`,
        balance_due: remainingBalance,
        collection_method: collectionMethod,
        customer_email: customerEmail
      })
    } catch (err) {
      const mockInvoice = {
        id: `inv_${Date.now().toString(36)}`,
        account_id: SITE_CONFIG.whopAccountId,
        amount_due: remainingBalance,
        currency: 'usd',
        status: collectionMethod === 'auto_charge' ? 'paid' : 'sent',
        collection_method: collectionMethod,
        payment_method: collectionMethod === 'auto_charge' ? 'Card on file (Visa •••• 4242)' : 'Email Invoice Link',
        pdf_url: `https://whop.com/invoices/demo-${Date.now()}/pdf`,
        created_at: new Date().toISOString()
      }
      setInvoiceResult(mockInvoice)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>Whop Invoices API • Final Job Balance</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  v1.2026
                </span>
              </h3>
              <p className="text-xs text-slate-400">High-Ticket Roof Deposit → Job → Final Invoice Flow</p>
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
        <div className="p-6 overflow-y-auto space-y-6 text-white text-sm">
          {invoiceResult ? (
            <div className="space-y-5 animate-fadeIn">
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-white">Whop Invoice Successfully Generated!</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Target Account: <span className="font-mono text-amber-400">{SITE_CONFIG.whopAccountId}</span>
                </p>
              </div>

              {/* Invoice Breakdown Card */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[11px] text-slate-500 uppercase block font-mono">Invoice Reference</span>
                    <span className="text-sm font-mono font-bold text-amber-400">{invoiceResult.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500 uppercase block font-mono">Status</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase font-mono ${
                      invoiceResult.status === 'paid'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {invoiceResult.status === 'paid' ? 'PAID (AUTO-CHARGED)' : 'SENT VIA EMAIL'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Homeowner:</span>
                    <span className="text-white font-medium">{customerName} ({customerEmail})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Contract Value:</span>
                    <span className="text-white font-medium">${projectTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Initial Deposit Deducted:</span>
                    <span className="text-emerald-400 font-medium">-${depositAmount.toLocaleString()} (Paid)</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-800 text-sm font-bold">
                    <span className="text-amber-400">Final Balance Billed:</span>
                    <span className="text-white text-base font-black">${remainingBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-1 text-[11px]">
                    <span className="text-slate-400">Collection Channel:</span>
                    <span className="text-slate-300 font-mono">{invoiceResult.payment_method}</span>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                <span>Whop Invoices API Version: 2026-10-24</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Webhook invoice.created dispatches</span>
                </span>
              </div>

              <div className="pt-2 flex justify-between gap-3">
                <button
                  onClick={() => setInvoiceResult(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Configure Another Invoice
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold"
                >
                  Close Demo
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs text-slate-400 leading-relaxed">
                Demonstrates how a roofing contractor bills the remaining project balance after completing the roof installation using the stored card on file or automated invoice link.
              </p>

              {/* Form Controls */}
              <div className="space-y-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Customer Name</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Customer Email</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Total Project Cost ($)</label>
                    <input
                      type="number"
                      value={projectTotal}
                      onChange={(e) => setProjectTotal(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Deposit Already Paid ($)</label>
                    <input
                      type="number"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">Collection Method</label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCollectionMethod('auto_charge')}
                      className={`p-3 rounded-xl border text-left transition ${
                        collectionMethod === 'auto_charge'
                          ? 'bg-amber-500/15 border-amber-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs text-white">
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <span>Auto-Charge Card on File</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Charges saved payment method token from deposit setup intent.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCollectionMethod('send_email')}
                      className={`p-3 rounded-xl border text-left transition ${
                        collectionMethod === 'send_email'
                          ? 'bg-amber-500/15 border-amber-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-xs text-white">
                        <Send className="w-4 h-4 text-emerald-400" />
                        <span>Send 1-Click Invoice Link</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Dispatches email invoice with Whop checkout & financing options.
                      </p>
                    </button>
                  </div>
                </div>

                {/* Calculation Summary */}
                <div className="pt-3 border-t border-slate-800 flex justify-between items-center font-mono text-xs">
                  <span className="text-slate-400">Remaining Balance Due:</span>
                  <span className="text-xl font-black text-amber-400">${remainingBalance.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleGenerateInvoice}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-slate-950 font-black text-sm shadow-xl transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Executing POST /invoices...</span>
                  </span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Generate Final Balance Invoice (${remainingBalance.toLocaleString()})</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
