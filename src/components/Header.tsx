import React, { useState } from 'react'
import { Phone, Shield, Menu, X, ArrowRight, FileText, CheckCircle2, Rotate3d, Sparkles } from 'lucide-react'
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

  const handleScrollToVisualizer = () => {
    const el = document.getElementById('roof-visualizer')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 text-slate-900 shadow-md transition-all">
      {/* Top Banner: Emergency Contact, Guarantee & Financing Alert */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white px-4 py-2 text-xs font-semibold tracking-wide shadow-inner">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold text-amber-300">24/7 Central Texas Emergency Response</span>
            <span className="hidden md:inline text-slate-300">• Licensed & Insured (TX-RCL #849204-B)</span>
            <span className="hidden lg:inline text-emerald-400 flex items-center gap-1 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 inline" /> 50-Year Non-Prorated Guarantee
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-amber-300 font-medium">💳 0% APR Financing via Whop</span>
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center gap-1.5 font-black text-amber-400 hover:text-amber-300 bg-white/10 px-2.5 py-1 rounded-full transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25 group-hover:scale-105 transition-transform">
            <Shield className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-2xl font-black tracking-tight flex items-center gap-1.5 text-slate-900">
              <span className="text-blue-950">APEX</span>
              <span className="text-amber-500">ROOFING</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold tracking-wider border border-blue-200">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase flex items-center gap-1">
              <span>High-Ticket Systems</span>
              <span className="text-blue-600">• Whop Verified</span>
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
          <button 
            onClick={handleScrollToVisualizer}
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200"
          >
            <Rotate3d className="w-4 h-4 text-blue-600 animate-spin" style={{ animationDuration: '8s' }} />
            <span>3D Studio</span>
          </button>
          <a href="#services" className="hover:text-blue-600 transition-colors">Services</a>
          <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing & Plans</a>
          <a href="#financing" className="hover:text-blue-600 transition-colors">0% Financing</a>
          <a href="#service-area" className="hover:text-blue-600 transition-colors">Service Area</a>
          <a href="#reviews" className="hover:text-blue-600 transition-colors">Reviews</a>
          
          <button
            onClick={onOpenInvoiceDemo}
            className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-800 px-3 py-1.5 rounded-xl border border-amber-300 font-extrabold flex items-center gap-1.5 transition shadow-sm"
            title="Demonstrate Whop Invoices API flow"
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>Invoice Demo</span>
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenCheckout('inspection')}
            className="text-xs font-bold px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition shadow-sm"
          >
            Inspection ($149)
          </button>
          
          <button
            onClick={() => onOpenCheckout('deposit')}
            className="text-xs font-bold px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition"
          >
            Deposit ($500)
          </button>

          <button
            onClick={onOpenEstimate}
            className="text-sm font-black px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white shadow-md shadow-blue-900/20 flex items-center gap-1.5 transition transform hover:-translate-y-0.5"
          >
            <span>Free Estimate</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-sm font-bold text-slate-800">
            <button
              onClick={() => {
                handleScrollToVisualizer()
                setMobileMenuOpen(false)
              }}
              className="p-3 bg-blue-50 text-blue-700 rounded-xl text-left border border-blue-200 flex items-center gap-2"
            >
              <Rotate3d className="w-4 h-4" />
              <span>3D Roof Studio</span>
            </button>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100"
            >
              Services
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100"
            >
              Pricing & Plans
            </a>
            <a
              href="#financing"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100"
            >
              0% Financing
            </a>
            <a
              href="#service-area"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100"
            >
              Service Area
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100"
            >
              Customer Reviews
            </a>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenInvoiceDemo()
                setMobileMenuOpen(false)
              }}
              className="w-full py-2.5 bg-amber-50 text-amber-900 border border-amber-300 font-extrabold rounded-xl flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Simulate Final Whop Invoice Flow</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onOpenCheckout('inspection')
                  setMobileMenuOpen(false)
                }}
                className="py-3 bg-slate-100 text-slate-800 font-bold rounded-xl text-center border border-slate-300 text-xs"
              >
                Inspection ($149)
              </button>
              <button
                onClick={() => {
                  onOpenCheckout('deposit')
                  setMobileMenuOpen(false)
                }}
                className="py-3 bg-amber-500 text-slate-950 font-bold rounded-xl text-center text-xs shadow-md"
              >
                Deposit ($500)
              </button>
            </div>

            <button
              onClick={() => {
                onOpenEstimate()
                setMobileMenuOpen(false)
              }}
              className="w-full py-3.5 bg-blue-950 text-white font-black rounded-xl text-center shadow-lg text-sm"
            >
              Request Free On-Site Estimate
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
