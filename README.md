# Apex Roofing Pro — Whop Websites Production Template

A production-ready website template engineered for US roofing and home service companies, built on Whop Websites and powered by Whop Payment Elements, Leads API, Invoices API, and Pixel Tracking.

## 🚀 Live Site
- **Live URL:** [https://apexroofing-usa.whop.site](https://apexroofing-usa.whop.site)
- **Whop Account:** `biz_PfW57PCwvf6TLe`
- **App ID:** `app_2iZeKeMUoqecwl`

## 📦 Features Implemented
- **High-Ticket Deposit → Job → Final Invoice Flow:**
  - $500 Deposit plan reserves construction schedule and stores card-on-file via a setup intent.
  - Final job balance (e.g. $8,700) billed seamlessly through the Whop Invoices API (`POST /invoices`), either auto-charging the stored method or sending a 1-click invoice link.
- **Whop Payment Elements:**
  - Embedded using `@whop/elements-react` and `@whop/elements`.
  - Includes `PaymentElement`, `ExpressCheckoutElement` (Apple Pay / Google Pay), and mandatory `BrandingElement`.
  - Dynamic BNPL financing (Klarna, Splitit 0% APR, Afterpay, Affirm).
- **Three Real Whop Plans:**
  - Inspection Fee: `$149` (`plan_rQg5c6wN0kWqx`)
  - Project Deposit: `$500` (`plan_NOxmF8J4O2rEC`)
  - Flat-Rate Tune-Up: `$399` (`plan_KrEYZlow95SVq`)
- **Whop Leads API:**
  - "Request an Estimate" form wires directly to `POST /api/v1/leads`.
- **Whop Pixel Tracking:**
  - Fires `estimate_requested`, `service_viewed`, and `deposit_started` via `whop.track`.
  - Floating live event stream console widget for testing and video demonstration.
- **Modular & Reusable:**
  - Single configuration file in `src/config/site.ts`.

## 🛠️ Local Development
```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Deploy to Whop live
npx @whop/cli apps deploy
```
