import React from 'react'
import { Award, Star, CheckCircle, ShieldCheck } from 'lucide-react'

export const TrustBadges: React.FC = () => {
  return (
    <div className="bg-slate-900/60 border-y border-slate-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">GAF Master Elite®</div>
              <div className="text-xs text-slate-400">Top 2% US Roofers</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">BBB A+ Accredited</div>
              <div className="text-xs text-slate-400">100% Verified Trust</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">Owens Corning</div>
              <div className="text-xs text-slate-400">Platinum Contractor</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
            </div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">4.9 / 5.0 Rating</div>
              <div className="text-xs text-slate-400">540+ Google Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
