import React, { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { TrustBadges } from '../components/TrustBadges'
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
      whop_payments: 'enabled'
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
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950" style={{ fontFamily: "'Inter Display', ui-sans-serif, system-ui, sans-serif" }}>
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

      {/* 3. Trust & Contractor Credentials Badges */}
      <TrustBadges />

      {/* 4. Roofing Services */}
      <Services
        onOpenCheckout={handleOpenCheckout}
        onOpenEstimate={handleScrollToEstimate}
      />

      {/* 5. Upfront Plans & Deposit Lock Section */}
      <PricingSection
        onOpenCheckout={handleOpenCheckout}
        onOpenInvoiceDemo={() => setInvoiceModalOpen(true)}
      />

      {/* 6. Financing Callout (Klarna, Splitit, Afterpay via Whop) */}
      <FinancingCallout
        onOpenCheckout={handleOpenCheckout}
        onOpenEstimate={handleScrollToEstimate}
      />

      {/* 7. Central Texas Service Area & Zip Code Checker */}
      <ServiceArea
        onOpenEstimate={handleScrollToEstimate}
      />

      {/* 8. Verified Homeowner Reviews */}
      <Reviews />

      {/* 9. Estimate Request Form (Wired to Whop Leads API) */}
      <section className="py-20 bg-slate-950 relative border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <EstimateForm />
        </div>
      </section>

      {/* 10. Footer */}
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
