import React, { useState } from 'react'
import { Phone, Shield, Menu, X, ArrowRight, FileText } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

interface HeaderProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenEstimate: () => void
  onOpenInvoiceDemo: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCheckout,
  onOpenEstimate,
  onOpenInvoiceDemo
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top Banner: Emergency Contact & Financing Alert */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-1.5 text-xs font-semibold tracking-wide flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping" />
          <span>⚡ 24/7 Central Texas Emergency Leak Response</span>
          <span className="hidden md:inline">| Licensed & Insured (TX-RCL #849204-B)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">💳 0% APR Financing Available via Whop</span>
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="flex items-center gap-1.5 font-bold hover:underline"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{SITE_CONFIG.phone}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xl font-black tracking-tight flex items-center gap-1">
              <span>APEX</span>
              <span className="text-amber-400">ROOFING</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-amber-300 font-mono">PRO</span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">High-Ticket Roof Systems</p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
          <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing & Plans</a>
          <a href="#service-area" className="hover:text-amber-400 transition-colors">Service Area</a>
          <a href="#financing" className="hover:text-amber-400 transition-colors">Financing</a>
          <a href="#reviews" className="hover:text-amber-400 transition-colors">Reviews</a>
          <button
            onClick={onOpenInvoiceDemo}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded-md border border-amber-500/30 flex items-center gap-1 transition"
            title="Demonstrate Whop Invoices API flow"
          >
            <FileText className="w-3 h-3" />
            <span>Invoice Demo</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenCheckout('inspection')}
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            Inspection ($149)
          </button>
          <button
            onClick={() => onOpenCheckout('deposit')}
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 transition"
          >
            Deposit ($500)
          </button>
          <button
            onClick={onOpenEstimate}
            className="text-sm font-bold px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition transform hover:-translate-y-0.5"
          >
            <span>Request Estimate</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-amber-400 font-medium"
          >
            Services
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-amber-400 font-medium"
          >
            Pricing & Plans
          </a>
          <a
            href="#service-area"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-amber-400 font-medium"
          >
            Service Area
          </a>
          <a
            href="#financing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-amber-400 font-medium"
          >
            Financing
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-300 hover:text-amber-400 font-medium"
          >
            Reviews
          </a>
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenCheckout('inspection')
              }}
              className="w-full text-center py-2.5 rounded-lg bg-slate-800 text-slate-200 text-sm font-semibold"
            >
              Book Inspection ($149)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenCheckout('deposit')
              }}
              className="w-full text-center py-2.5 rounded-lg bg-slate-800 text-amber-400 border border-amber-500/40 text-sm font-semibold"
            >
              Project Deposit ($500)
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenEstimate()
              }}
              className="w-full text-center py-2.5 rounded-lg bg-amber-500 text-slate-950 text-sm font-bold shadow-md shadow-amber-500/20"
            >
              Request Free Estimate
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
