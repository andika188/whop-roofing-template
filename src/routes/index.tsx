import React, { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { TrustBadges } from '../components/TrustBadges'
import { RoofVisualizer3D } from '../components/RoofVisualizer3D'
import { Services } from '../components/Services'
import { PricingSection } from '../components/PricingSection'
import { FinancingCallout } from '../components/FinancingCallout'
import { ServiceArea } from '../components/ServiceArea'
import { Reviews } from '../components/Reviews'
import { EstimateForm } from '../components/EstimateForm'
import { Footer } from '../components/Footer'
import { CheckoutModal } from '../components/CheckoutModal'
import { InvoiceDemoModal } from '../components/InvoiceDemoModal'
import { PixelTrackerWidget } from '../components/PixelTrackerWidget'
import { trackWhopEvent } from '../lib/whop-tracking'

export const Route = createFileRoute('/')({ component: RoofingWebsite })

const FONT_FACES = [400, 500, 600, 700, 800, 900]
  .map(
    (weight) =>
      `@font-face{font-family:'Inter Display';font-weight:${weight};font-display:swap;src:url(https://content.whop.com/fonts/inter-display-${{ 400: 'regular', 500: 'medium', 600: 'semi-bold', 700: 'bold', 800: 'bold', 900: 'bold' }[weight]}.ttf) format('truetype')}`,
  )
  .join('')

function RoofingWebsite() {
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false)
  const [selectedPlanType, setSelectedPlanType] = useState<'inspection' | 'deposit' | 'flatRate'>('deposit')
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)

  // Track initial page view event
  useEffect(() => {
    trackWhopEvent('page_viewed', {
      page: 'home',
      vertical: 'high_ticket_roofing',
      whop_payments: 'enabled',
      features: ['3d_webgl_visualizer', 'leads_api', 'setup_intent', 'invoices_api']
    })
  }, [])

  const handleOpenCheckout = (planType: 'inspection' | 'deposit' | 'flatRate') => {
    setSelectedPlanType(planType)
    setCheckoutModalOpen(true)
  }

  const handleScrollToEstimate = () => {
    const el = document.getElementById('estimate-form')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div 
      className="min-h-screen bg-white text-slate-900 selection:bg-amber-500 selection:text-slate-950 font-sans" 
      style={{ fontFamily: "'Inter Display', ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <style>{FONT_FACES}</style>

      {/* 1. Header Navigation */}
      <Header
        onOpenCheckout={handleOpenCheckout}
        onOpenEstimate={handleScrollToEstimate}
        onOpenInvoiceDemo={() => setInvoiceModalOpen(true)}
      />

      {/* 2. Hero Section */}
      <Hero
        onOpenCheckout={handleOpenCheckout}
        onOpenEstimate={handleScrollToEstimate}
      />

      {/* 3. Authoritative Trust & Contractor Credentials Badges */}
      <TrustBadges />

      {/* 4. Interactive WebGL 3D Roof Visualizer & Material Configurator */}
      <RoofVisualizer3D
        onOpenCheckout={handleOpenCheckout}
        onOpenEstimate={handleScrollToEstimate}
      />

      {/* 5. Roofing Services Grid */}
      <Services
        onOpenCheckout={handleOpenCheckout}
        onOpenEstimate={handleScrollToEstimate}
      />

      {/* 6. Upfront Plans & Deposit Lock Section */}
      <PricingSection
        onOpenCheckout={handleOpenCheckout}
        onOpenInvoiceDemo={() => setInvoiceModalOpen(true)}
      />

      {/* 7. Financing Callout (0% APR, Klarna, Splitit, Afterpay via Whop) */}
      <FinancingCallout
        onOpenCheckout={handleOpenCheckout}
        onOpenEstimate={handleScrollToEstimate}
      />

      {/* 8. Central Texas Service Area & Zip Code Checker */}
      <ServiceArea
        onOpenEstimate={handleScrollToEstimate}
      />

      {/* 9. Verified Homeowner Reviews */}
      <Reviews />

      {/* 10. Estimate Request Form (Wired to Whop Leads API) */}
      <section className="py-24 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 relative border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EstimateForm />
        </div>
      </section>

      {/* 11. Footer */}
      <Footer
        onOpenCheckout={handleOpenCheckout}
        onOpenEstimate={handleScrollToEstimate}
        onOpenInvoiceDemo={() => setInvoiceModalOpen(true)}
      />

      {/* Interactive Whop Checkout Modal with Payment Elements */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        initialPlanType={selectedPlanType}
        onOpenInvoiceDemo={() => setInvoiceModalOpen(true)}
      />

      {/* Interactive Whop Invoices API Balance Demo Modal */}
      <InvoiceDemoModal
        isOpen={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
      />

      {/* Floating Whop Pixel Event Console & Debugger */}
      <PixelTrackerWidget />
    </div>
  )
}
