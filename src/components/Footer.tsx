import React from 'react'
import { Shield, Phone, Mail, MapPin, ArrowRight, Heart, FileText, CheckCircle2, Rotate3d } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

interface FooterProps {
  onOpenCheckout: (planType: 'inspection' | 'deposit' | 'flatRate') => void
  onOpenEstimate: () => void
  onOpenInvoiceDemo: () => void
}

export const Footer: React.FC<FooterProps> = ({
  onOpenCheckout,
  onOpenEstimate,
  onOpenInvoiceDemo
}) => {
  const handleScrollToVisualizer = () => {
    const el = document.getElementById('roof-visualizer')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0B1E38] text-slate-300 border-t border-slate-800">
      {/* Upper Footer CTA Strip */}
      <div className="border-b border-slate-800/80 bg-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">Ready for a Lifetime Roof?</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">Get Your On-Site Drone Inspection Today</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleScrollToVisualizer}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition"
            >
              <Rotate3d className="w-4 h-4 text-amber-300" />
              <span>Launch 3D Studio</span>
            </button>
            <button
              onClick={() => onOpenCheckout('inspection')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
            >
              Book Inspection ($149)
            </button>
            <button
              onClick={() => onOpenCheckout('deposit')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition"
            >
              Lock Deposit ($500)
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-md">
                <Shield className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div className="text-xl font-black text-white tracking-tight">
                <span>APEX</span>
                <span className="text-amber-400">ROOFING</span>
                <span className="text-[10px] ml-1.5 px-1.5 py-0.5 rounded bg-blue-900 border border-blue-700 text-blue-200 font-mono">
                  PRO
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              America's high-ticket roofing template built exclusively on Whop Websites. Delivering end-to-end payment transparency, setup intent deposits, and final balance invoices for residential & commercial properties.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </div>
            </div>

            <div className="text-[11px] text-amber-400/90 font-mono pt-1">
              {SITE_CONFIG.licenseNumber}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">Roofing Systems</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-amber-400 transition">Architectural Shingles</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition">Standing Seam Metal</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition">Spanish Barrel Tile</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition">Integrated Solar PV</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition">Emergency Storm Repair</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition">Commercial TPO & Flat</a></li>
            </ul>
          </div>

          {/* Col 3: Whop Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">Whop Integration</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onOpenCheckout('inspection')} className="hover:text-amber-400 transition text-left">
                  Inspection Plan ($149)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCheckout('deposit')} className="hover:text-amber-400 transition text-left">
                  Project Deposit ($500)
                </button>
              </li>
              <li>
                <button onClick={() => onOpenCheckout('flatRate')} className="hover:text-amber-400 transition text-left">
                  Flat-Rate Tune-Up ($399)
                </button>
              </li>
              <li>
                <button onClick={onOpenInvoiceDemo} className="hover:text-amber-400 transition text-left text-amber-300 font-semibold flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  <span>Whop Invoices API Demo</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenEstimate} className="hover:text-amber-400 transition text-left">
                  Whop Leads API Form
                </button>
              </li>
              <li>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" /> whop.track Events Active
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Service Areas */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase text-white tracking-wider">Texas Coverage</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#service-area" className="hover:text-amber-400 transition">Austin & Westlake Hills</a></li>
              <li><a href="#service-area" className="hover:text-amber-400 transition">Round Rock & Pflugerville</a></li>
              <li><a href="#service-area" className="hover:text-amber-400 transition">Georgetown & Cedar Park</a></li>
              <li><a href="#service-area" className="hover:text-amber-400 transition">Lakeway & Lake Travis</a></li>
              <li><a href="#service-area" className="hover:text-amber-400 transition">Buda & Kyle</a></li>
              <li><a href="#service-area" className="hover:text-amber-400 transition">San Marcos & New Braunfels</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="mt-14 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Apex Roofing Specialists LLC. Built for Whop Websites Workforce Bounty.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Whop Business: <code className="text-amber-400 font-mono">{SITE_CONFIG.whopAccountId}</code></span>
            <span>•</span>
            <span>App: <code className="text-amber-400 font-mono">{SITE_CONFIG.appId}</code></span>
            <span>•</span>
            <a href="https://whop.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white underline">
              Powered by Whop Payments
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
