# Apex Roofing Pro — Whop Websites Production Template Submission

## 1. Live Deployment URLs & Identifiers
- **Primary Whop App URL:** [https://apexroofing-usa.whop.app](https://apexroofing-usa.whop.app)
- **Live Whop Site URL:** [https://apexroofing-usa.whop.site](https://apexroofing-usa.whop.site)
- **Whop Business Account:** `biz_PfW57PCwvf6TLe` (Apex Roofing Pro)
- **Whop App ID:** `app_2iZeKeMUoqecwl`
- **GitHub Repository:** [https://github.com/andika188/whop-roofing-template](https://github.com/andika188/whop-roofing-template)
- **Source Code Archive:** `D:\whop\whop-roofing-template.zip`

---

## 2. Real Whop Plans Configured
All three plans were created live via the Whop CLI and are wired directly to the checkout flow:

1. **Roof Inspection Fee ($149 one-time)**
   - Plan ID: `plan_rQg5c6wN0kWqx`
   - Product ID: `prod_rBXD1dEuRBgQX`
   - Direct Checkout URL: [https://whop.com/checkout/plan_rQg5c6wN0kWqx](https://whop.com/checkout/plan_rQg5c6wN0kWqx)
   - Scope: 21-point drone aerial scan, attic moisture detection, photographic report.

2. **Project Deposit ($500 project reservation with Card-on-File Setup Intent)**
   - Plan ID: `plan_NOxmF8J4O2rEC`
   - Product ID: `prod_oPdd1HFpOeWsQ`
   - Direct Checkout URL: [https://whop.com/checkout/plan_NOxmF8J4O2rEC](https://whop.com/checkout/plan_NOxmF8J4O2rEC)
   - Scope: Secures crew construction schedule, files permits, stores card on file via setup intent for subsequent final invoice.

3. **Flat-Rate Roof Guard & Tune-Up ($399 one-time)**
   - Plan ID: `plan_KrEYZlow95SVq`
   - Product ID: `prod_mL0y9W35VIvQv`
   - Direct Checkout URL: [https://whop.com/checkout/plan_KrEYZlow95SVq](https://whop.com/checkout/plan_KrEYZlow95SVq)
   - Scope: Up to 10 shingle repairs, pipe collar sealing, flashing reinforcement, gutter clean-out.

---

## 3. Creative & High-Converting Features
- **WebGL 3D Interactive Roof Visualizer & Material Studio (Three.js):** Homeowners can rotate the house 360° in real-time 3D, switch materials (GAF Timberline HDZ® Architectural Asphalt, Standing Seam Metal, Tuscan Clay Barrel Tile, Obsidian PV Solar), toggle dynamic lighting (Daylight, Sunset Golden Hour, Rain Storm), adjust square footage, and immediately lock their 3D specification with the $500 Whop deposit.
- **Vibrant Architectural Aesthetic:** Clean porcelain white, deep architectural navy blue (`#0B1E38`), sunset copper/amber, and vibrant contractor trust badges (GAF Master Elite, Owens Corning Platinum, BBB A+).

---

## 4. One-Paragraph Whop Feature Summary (For Submission Notes)
> This production-ready template for high-ticket US roofing contractors is built on Whop Websites (TanStack Start & Vite on Cloudflare Workers edge runtime) and deployed live at `https://apexroofing-usa.whop.app`. It implements the complete contractor lifecycle using native Whop Payment Elements (`PaymentElement`, `ExpressCheckoutElement` for Apple Pay & Google Pay, and the mandatory `BrandingElement`), routing transactions through Whop as Merchant of Record with dynamic Buy-Now-Pay-Later financing (Klarna, Splitit 0% APR, Afterpay, and Affirm). The template features an interactive WebGL 3D Roof Visualizer allowing homeowners to customize materials and calculate investments in real-time. The "Request an Estimate" workflow captures high-intent inquiries directly into the Whop Leads API (`POST /api/v1/leads`), while the $500 job reservation checkout captures card-on-file payment methods via a setup intent to automate the final balance collection ($8,700+) through the Whop Invoices API (`POST /api/v1/invoices`). Full visitor attribution and interaction milestones are measured via custom `whop.track` pixel events (`estimate_requested`, `service_viewed`, `deposit_started`) accompanied by an on-screen live event stream debugger.

---

## 5. 3–5 Minute Screen Recording Script & Walkthrough

| Time | Scene | Action & Talking Points |
| :--- | :--- | :--- |
| **0:00 – 0:50** | **Live Site & 3D Visualizer** | Open `https://apexroofing-usa.whop.app`. Show the colorful, modern architectural layout, trust badges (GAF, Owens Corning, BBB), and scroll to the **Interactive 3D Roof Studio**. Click and drag to orbit 360°, switch between GAF Timberline HDZ, Standing Seam Metal, and Tuscan Clay Tile, test the Golden Hour / Rain lighting, adjust square footage, and show the instant cost calculation. |
| **0:50 – 1:50** | **Payment Elements & Checkout** | Click "Book Inspection ($149)" or "Lock In 3D Spec ($500 Deposit)". In the checkout modal, highlight the Whop Payment Elements: `PaymentElement`, Apple Pay / Google Pay `ExpressCheckoutElement`, and the required `BrandingElement`. Mention BNPL financing (Klarna, Splitit 0% APR). Click "Complete Test Checkout" to demonstrate payment confirmation and setup intent card storage notice. |
| **1:50 – 2:40** | **Request an Estimate (Whop Leads API)** | Scroll down to the "Request an Estimate" form. Enter name, email, phone, Texas address, and roof preferences. Click "Submit Estimate Request via Whop API". Highlight the instant green confirmation card displaying the generated Whop Lead ID and business account attribution. |
| **2:40 – 3:30** | **Deposit → Job → Final Invoice Flow** | Click the "Invoice Demo" button in the header. Explain the high-ticket contractor lifecycle: the initial $500 deposit was credited against the $9,200 project, leaving an $8,700 balance. Show the "Auto-Charge Stored Card (Setup Intent)" vs "Email Payment Link" toggle, then click "Generate Final Balance Invoice" to demonstrate the Whop Invoices API (`POST /invoices`). |
| **3:30 – 4:00** | **whop.track Custom Pixel Events** | Click the floating "Whop Pixel Event Stream" widget in the bottom-right corner. Show the chronological stream of fired pixel events: `estimate_requested`, `service_viewed`, and `deposit_started` with real-time JSON payloads. |

---

## 6. Easy Template Customization
All company details, phone numbers, service areas, and Whop plan IDs are isolated in a single config file:
- `src/config/site.ts`
Swapping company name, branding, pricing, or service zones requires editing only this file without altering any HTML or components.
