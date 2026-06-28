import { useNavigate } from 'react-router-dom'

export default function AgeStageBanner({ stage }) {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/parent/by-age/${stage.id}`)}
      className="w-full text-left bg-brown-900 hover:bg-brown-800 text-cream-50 rounded-xl p-6 transition-colors group"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-1">Ages {stage.ageRange}</div>
          <h3 className="font-heading text-xl font-bold text-cream-50 mb-1">{stage.label}</h3>
          <div className="text-gold-300 text-sm font-medium mb-2">{stage.biddulphStage}</div>
          <p className="text-cream-200 text-sm leading-relaxed">{stage.tagline}</p>
        </div>
        <div className="text-gold-400 text-2xl group-hover:translate-x-1 transition-transform">→</div>
      </div>
      <div className="mt-4 pt-4 border-t border-brown-700">
        <p className="text-xs text-cream-200 italic">{stage.kunjufulNote}</p>
      </div>
    </button>
  )
}
