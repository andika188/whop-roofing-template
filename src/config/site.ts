export interface PlanConfig {
  id: string
  name: string
  price: number
  priceFormatted: string
  badge?: string
  description: string
  features: string[]
  ctaText: string
  type: 'inspection' | 'deposit' | 'flat_rate'
  checkoutUrl: string
}

export interface SiteConfig {
  companyName: string
  legalName: string
  tagline: string
  phone: string
  email: string
  address: string
  licenseNumber: string
  whopAccountId: string
  appId: string
  liveUrl: string
  plans: {
    inspection: PlanConfig
    deposit: PlanConfig
    flatRate: PlanConfig
  }
  serviceAreas: {
    name: string
    state: string
    zipCodes: string[]
  }[]
  financingOptions: string[]
}

export const SITE_CONFIG: SiteConfig = {
  companyName: "Apex Roofing Pro",
  legalName: "Apex Roofing Specialists LLC",
  tagline: "Premier High-Ticket Roofing & Restoration Across Central Texas",
  phone: "(888) 555-ROOF",
  email: "estimates@apexroofing-usa.whop.site",
  address: "1200 Congress Ave, Suite 400, Austin, TX 78701",
  licenseNumber: "TX-RCL #849204-B (Fully Licensed & Insured)",
  whopAccountId: "biz_PfW57PCwvf6TLe",
  appId: "app_2iZeKeMUoqecwl",
  liveUrl: "https://apexroofing-usa.whop.app",
  plans: {
    inspection: {
      id: "plan_rQg5c6wN0kWqx",
      name: "21-Point Roof & Attic Inspection",
      price: 149,
      priceFormatted: "$149",
      badge: "Popular First Step",
      description: "Comprehensive physical and drone roof assessment, moisture scan, gutter inspection, and photographic condition report.",
      features: [
        "Certified Drone Aerial 4K Photography",
        "21-Point Comprehensive Structural Checklist",
        "Attic Moisture & Thermal Leak Scanning",
        "Official Insurance Claim Documentation",
        "Credited 100% towards any repair or replacement"
      ],
      ctaText: "Book Inspection ($149)",
      type: "inspection",
      checkoutUrl: "https://whop.com/checkout/plan_rQg5c6wN0kWqx"
    },
    deposit: {
      id: "plan_NOxmF8J4O2rEC",
      name: "Roof Project Reservation & Deposit",
      price: 500,
      priceFormatted: "$500",
      badge: "High-Ticket Job Lock-In",
      description: "Locks in your construction date, allocates roofing materials, and securely stores card on file for final job invoice.",
      features: [
        "Secures Prime Construction Date Slot",
        "Permit Filing & City Plan Submission",
        "Dedicated Master Project Manager",
        "Card-on-File via Setup Intent for Remaining Balance",
        "Protected by Whop Buyer & Merchant Security"
      ],
      ctaText: "Pay Project Deposit ($500)",
      type: "deposit",
      checkoutUrl: "https://whop.com/checkout/plan_NOxmF8J4O2rEC"
    },
    flatRate: {
      id: "plan_KrEYZlow95SVq",
      name: "Flat-Rate Roof Guard & Tune-Up",
      price: 399,
      priceFormatted: "$399",
      badge: "Zero-Surprise Flat Rate",
      description: "Complete seasonal preventative maintenance to protect your home from sudden storm leaks.",
      features: [
        "Up to 10 Damaged/Missing Shingle Replacements",
        "Complete Silicone Flashing & Chimney Re-Sealing",
        "Pipe Boot Collar Reinforcement & Gasket Sealing",
        "Gutter Valley Clean-Out & Flow Inspection",
        "1-Year No-Leak Workmanship Guarantee"
      ],
      ctaText: "Get Flat-Rate Tune-Up ($399)",
      type: "flat_rate",
      checkoutUrl: "https://whop.com/checkout/plan_KrEYZlow95SVq"
    }
  },
  serviceAreas: [
    { name: "Austin Metro", state: "TX", zipCodes: ["78701", "78702", "78703", "78704", "78745", "78749"] },
    { name: "Round Rock", state: "TX", zipCodes: ["78664", "78665", "78681"] },
    { name: "Georgetown", state: "TX", zipCodes: ["78626", "78628", "78633"] },
    { name: "Cedar Park & Leander", state: "TX", zipCodes: ["78613", "78641", "78645"] },
    { name: "Pflugerville & Hutto", state: "TX", zipCodes: ["78660", "78634"] },
    { name: "Lakeway & Westlake", state: "TX", zipCodes: ["78734", "78738", "78746"] }
  ],
  financingOptions: [
    "Klarna (Pay in 4 or 0-24 mo installments)",
    "Splitit (Pay over time on your existing credit card with 0% interest)",
    "Afterpay & Affirm (Flexible monthly plans)",
    "Instant Pre-Qualification (No credit hit to check options)"
  ]
}
