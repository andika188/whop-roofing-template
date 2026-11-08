import React from 'react'
import { Star, ShieldCheck } from 'lucide-react'

export const Reviews: React.FC = () => {
  const testimonials = [
    {
      name: "Marcus Sterling",
      location: "Westlake Hills, Austin, TX",
      project: "Full Standing Seam Metal Roof ($28,500)",
      review: "After the spring hail storm destroyed our concrete tile roof, Apex was on-site with their 4K drone within 4 hours. Booking the $500 deposit on Whop was effortless and locked in our timeline. The final invoice billed our card on file once the city inspector signed off. Flawless execution.",
      rating: 5,
      date: "October 2026",
      verified: true
    },
    {
      name: "Elena Rostova",
      location: "Georgetown, TX",
      project: "GAF Timberline HDZ Architectural Replacement ($16,200)",
      review: "We used the Klarna 0% financing option through their Whop checkout. Approved in literally 30 seconds without paperwork. The crew replaced 3,400 sq ft in two days and left the yard spotless. You get what you pay for in high-ticket roofing.",
      rating: 5,
      date: "September 2026",
      verified: true
    },
    {
      name: "David & Sarah Chen",
      location: "Round Rock, TX",
      project: "Flat-Rate Roof Tune-Up & Flashing Seal ($399)",
      review: "Ordered their $399 tune-up package online via Apple Pay. Tech arrived the next morning, replaced 8 damaged shingles from high winds, resealed all vent stacks, and gave us a full photographic report. Best $399 preventative maintenance ever.",
      rating: 5,
      date: "November 2026",
      verified: true
    }
  ]

  return (
    <section id="reviews" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>500+ Verified Homeowners</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
            Trusted For Central Texas’ Highest-Stakes Roofing Projects
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Read real feedback from estate owners, builders, and families who rely on our craftsmanship and transparent Whop billing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-700 transition relative"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.rating)].map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  {t.verified && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Whop Buyer</span>
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-800">
                <div className="font-bold text-white text-sm">{t.name}</div>
                <div className="text-xs text-slate-400">{t.location}</div>
                <div className="mt-2 text-xs text-amber-400/90 font-medium bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  {t.project}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
