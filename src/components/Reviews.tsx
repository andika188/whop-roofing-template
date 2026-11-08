import React from 'react'
import { Star, ShieldCheck, CheckCircle2, Quote, ThumbsUp } from 'lucide-react'

export const Reviews: React.FC = () => {
  const reviews = [
    {
      name: "Marcus Vance",
      location: "Austin, TX (Westlake Hills)",
      project: "Full Roof Replacement ($18,400)",
      review: "Apex Roofing Pro replaced our hail-damaged roof with GAF Timberline HDZ shingles. Paying the $500 reservation deposit through Whop was instantaneous, and the card-on-file final invoice made balance settlement seamless.",
      rating: 5,
      date: "October 2026",
      verified: true
    },
    {
      name: "Elena Rodriguez",
      location: "Round Rock, TX",
      project: "Emergency Hail Repair & Tune-Up ($3,200)",
      review: "After a severe storm caused ceiling leaks, their drone team was at our property within 3 hours. The $149 21-point inspection report gave our insurance company everything needed for full claim approval.",
      rating: 5,
      date: "September 2026",
      verified: true
    },
    {
      name: "David Sterling",
      location: "Georgetown, TX",
      project: "Standing Seam Metal Roof ($26,800)",
      review: "High-ticket roofing can be stressful, but Apex made the payment journey completely transparent. Split the final balance via Whop's 0% APR financing. Flawless craftsmanship and zero debris left in our yard.",
      rating: 5,
      date: "August 2026",
      verified: true
    }
  ]

  return (
    <section id="reviews" className="py-24 bg-slate-50 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
            <span>Verified Texas Homeowner Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Trusted Across 1,200+ High-Ticket Roofing Projects
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Read why Central Texas homeowners trust Apex Roofing Pro and Whop Payments for upfront pricing and guaranteed quality.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border-2 border-slate-200 hover:border-amber-400 rounded-3xl p-8 flex flex-col justify-between shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Rating & Project Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900">
                    {rev.project.split(' ')[0]} {rev.project.split(' ')[1]}
                  </span>
                </div>

                <p className="mt-5 text-sm text-slate-700 leading-relaxed font-normal italic">
                  "{rev.review}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.location}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Stat Bar */}
        <div className="mt-16 bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-lg grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-blue-950">99.4%</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Customer Satisfaction</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-600">50-Year</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Non-Prorated Warranty</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-600">$0 Down</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Financing Options</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-purple-600">&lt; 24 Hrs</div>
            <div className="text-xs font-semibold text-slate-500 mt-1">Average Dispatch Time</div>
          </div>
        </div>

      </div>
    </section>
  )
}
