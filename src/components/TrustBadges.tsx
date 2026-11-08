import React from 'react'
import { Award, Star, CheckCircle2, ShieldCheck, Zap, HeartHandshake } from 'lucide-react'

export const TrustBadges: React.FC = () => {
  return (
    <div className="bg-white border-b border-slate-200 py-8 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
          
          {/* Badge 1: GAF Master Elite */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-600 shrink-0">
              <Award className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black text-slate-900">GAF Master Elite®</div>
              <div className="text-[11px] font-semibold text-amber-700">Top 2% US Roofers</div>
            </div>
          </div>

          {/* Badge 2: BBB A+ Torch */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-600 shrink-0">
              <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black text-slate-900">BBB A+ Accredited</div>
              <div className="text-[11px] font-semibold text-blue-700">100% Verified Trust</div>
            </div>
          </div>

          {/* Badge 3: Owens Corning Platinum */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-pink-300 transition shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-600 shrink-0">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black text-slate-900">Owens Corning</div>
              <div className="text-[11px] font-semibold text-pink-700">Platinum Contractor</div>
            </div>
          </div>

          {/* Badge 4: Google Reviews */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-yellow-300 transition shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/15 border border-yellow-500/30 flex items-center justify-center text-yellow-600 shrink-0">
              <div className="flex text-amber-500">
                <Star className="w-5 h-5 fill-amber-400 stroke-amber-500" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-sm font-black text-slate-900">4.9 / 5.0 Star Rating</div>
              <div className="text-[11px] font-semibold text-amber-700">650+ Verified Reviews</div>
            </div>
          </div>

          {/* Badge 5: Whop Certified Merchant */}
          <div className="hidden lg:flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-left">
              <div className="text-sm font-black text-blue-950">Whop Payments</div>
              <div className="text-[11px] font-bold text-blue-700">0% APR Financing</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
