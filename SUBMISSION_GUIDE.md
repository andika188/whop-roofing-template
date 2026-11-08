# Apex Roofing Pro — Whop Websites Production Template Submission

## 1. Live Deployment URL
- **Production Whop Website:** [https://apexroofing-usa.whop.site](https://apexroofing-usa.whop.site)
- **Whop Business Account:** `biz_PfW57PCwvf6TLe` (Apex Roofing Pro)
- **App ID:** `app_2iZeKeMUoqecwl`
- **Source Code Archive:** `D:\whop\whop-roofing-template.zip`

---

## 2. Real Whop Plans Configured
All three plans were created live via the Whop CLI and are connected directly to the checkout flow:

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

## 3. One-Paragraph Whop Feature Summary (For Submission)
> This production-ready template for high-ticket US roofing contractors is built on Whop Websites (TanStack Start & Vite on Cloudflare Workers edge runtime) and deployed live at `https://apexroofing-usa.whop.site`. It implements the complete contractor lifecycle using native Whop Payment Elements (`PaymentElement`, `ExpressCheckoutElement` for Apple Pay & Google Pay, and the mandatory `BrandingElement`), routing transactions through Whop as Merchant of Record with dynamic Buy-Now-Pay-Later financing (Klarna, Splitit 0% APR, Afterpay, and Affirm). The "Request an Estimate" workflow captures high-intent inquiries directly into the Whop Leads API (`POST /api/v1/leads`), while the $500 job reservation checkout captures card-on-file payment methods via a setup intent to automate the final balance collection ($8,700+) through the Whop Invoices API (`POST /api/v1/invoices`). Full visitor attribution and interaction milestones are measured via custom `whop.track` pixel events (`estimate_requested`, `service_viewed`, `deposit_started`) accompanied by an on-screen live event stream debugger.

---

## 4. 3–5 Minute Screen Recording Script & Walkthrough

| Time | Scene | Action & Talking Points |
| :--- | :--- | :--- |
| **0:00 – 0:45** | **Live Site & Brand Overview** | Open `https://apexroofing-usa.whop.site`. Showcase the desktop and mobile responsive layout: high-ticket positioning, GAF & Owens Corning trust badges, 4 core services, 0% APR financing banner, service area zip code checker, and verified customer reviews. |
| **0:45 – 1:45** | **Payment Elements & Checkout** | Click "Book Inspection ($149)" or "Pay Job Deposit ($500)". Open the Whop Payment Elements modal. Highlight the `PaymentElement`, Apple Pay / Google Pay `ExpressCheckoutElement`, and required `BrandingElement`. Explain that financing options (Klarna, Splitit, Afterpay) appear automatically. Click "Complete Test Checkout" to demonstrate completion. |
| **1:45 – 2:30** | **Request an Estimate (Whop Leads API)** | Scroll to the Estimate Request form. Fill out the homeowner details (Name, Email, Phone, Address, Service). Click "Submit Lead Request". Show the instant lead confirmation card showing the generated Whop Lead ID and account attribution. |
| **2:30 – 3:30** | **Deposit → Job → Final Invoice Flow** | Click the "Invoice Demo" button in the header or deposit card. Show how the $500 deposit was credited against a $9,200 total roof replacement, leaving an $8,700 balance. Toggle "Auto-Charge Card on File" (using the setup intent stored at deposit) vs "Send Email Link". Click "Generate Final Balance Invoice" to showcase Whop Invoices API (`POST /invoices`). |
| **3:30 – 4:15** | **whop.track Custom Pixel Events** | Click the floating "Whop Pixel Event Stream" pill in the bottom-right corner. Show the chronological stream of fired pixel events: `estimate_requested`, `service_viewed`, and `deposit_started` with real-time JSON payloads. |

---

## 5. Easy Template Customization
All company details, phone numbers, service areas, and Whop plan IDs are isolated in a single config file:
- `src/config/site.ts`
Swapping company name, branding, pricing, or service zones requires editing only this file without altering any HTML or components.
