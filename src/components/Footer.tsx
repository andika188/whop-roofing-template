import React from 'react'
import { Shield, Phone, Mail, MapPin, ExternalLink, Lock } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

interface FooterProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenEstimate: () => void
  onOpenInvoiceDemo: () => void
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCheckout,
  onOpenInvoiceDemo
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-xl font-black text-white">
                APEX <span className="text-amber-400">ROOFING</span> PRO
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              America’s premier high-ticket roofing and storm restoration contractor. Powered end-to-end by Whop Websites, Whop Payment Elements, and automated invoicing.
            </p>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-amber-400 font-semibold">
                  {SITE_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-amber-400">
                  {SITE_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Roofing Services</h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#services" className="hover:text-amber-400">Full Roof Replacement</a></li>
              <li><a href="#services" className="hover:text-amber-400">Standing Seam Metal Systems</a></li>
              <li><a href="#services" className="hover:text-amber-400">Emergency Storm Damage Repair</a></li>
              <li><a href="#services" className="hover:text-amber-400">Commercial TPO & Flat Roofs</a></li>
              <li><a href="#services" className="hover:text-amber-400">Insurance Claim Assistance</a></li>
            </ul>
          </div>

          {/* Whop Plans & Flow */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Whop Plans & Checkout</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onOpenCheckout('inspection')}
                  className="hover:text-amber-400 text-left"
                >
                  21-Point Inspection ($149)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCheckout('deposit')}
                  className="hover:text-amber-400 text-left font-semibold text-amber-400/90"
                >
                  Project Deposit ($500)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenCheckout('flatRate')}
                  className="hover:text-amber-400 text-left"
                >
                  Flat-Rate Tune-Up ($399)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenInvoiceDemo}
                  className="hover:text-emerald-400 text-left flex items-center gap-1 font-mono text-[11px]"
                >
                  <span>Whop Invoices API Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Whop Compliance</h4>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Whop Merchant of Record</span>
              </div>
              <p className="text-slate-400 leading-normal">
                Payments processed securely via Whop Elements. PCI-DSS compliant with 0% APR financing from Klarna & Splitit.
              </p>
              <div className="pt-1 text-[10px] font-mono text-slate-500">
                Account: {SITE_CONFIG.whopAccountId}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved. {SITE_CONFIG.licenseNumber}.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Whop Verification</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
