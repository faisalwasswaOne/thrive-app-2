import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const cards = [
  {
    to: '/parent/summary',
    emoji: '📋',
    title: 'Summary View',
    desc: 'Quick overview of themes and books. The fastest way to orient yourself.',
  },
  {
    to: '/parent/by-age',
    emoji: '📅',
    title: 'By Age Stage',
    desc: "Navigate by your son's developmental stage — 0–6, 6–14, or 14+.",
  },
  {
    to: '/parent/by-topic',
    emoji: '🗂️',
    title: 'By Topic',
    desc: 'Browse all themes: identity, education, manhood, community, and more.',
  },
]

export default function ParentHome() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Parent Guide — Thrive'
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-brown-900 mb-2">Parent Guide</h1>
        <p className="text-gray-500 max-w-xl leading-relaxed">
          Everything from both books, organized three ways. Start wherever makes sense for you right now.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {cards.map(card => (
          <button
            key={card.to}
            onClick={() => navigate(card.to)}
            className="text-left bg-white border border-cream-200 hover:border-gold-400 hover:shadow-md rounded-xl p-6 transition-all group"
          >
            <div className="text-3xl mb-3">{card.emoji}</div>
            <h2 className="font-heading font-bold text-brown-900 text-lg mb-2 group-hover:text-brown-700">{card.title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-10 bg-brown-900 rounded-2xl p-6 text-cream-50">
        <h2 className="font-heading text-xl font-bold text-gold-400 mb-2">About the Books</h2>
        <div className="grid sm:grid-cols-2 gap-6 mt-4">
          <div>
            <div className="inline-block bg-amber-500 text-brown-950 text-xs font-bold px-2 py-0.5 rounded mb-2">Kunjufu</div>
            <p className="text-sm text-cream-200 leading-relaxed">
              <strong className="text-cream-50">Countering the Conspiracy to Destroy Black Boys</strong> — Jawanza Kunjufu names the systemic forces working against Black boys and provides community-based solutions rooted in African tradition.
            </p>
          </div>
          <div>
            <div className="inline-block bg-forest-600 text-white text-xs font-bold px-2 py-0.5 rounded mb-2">Biddulph</div>
            <p className="text-sm text-cream-200 leading-relaxed">
              <strong className="text-cream-50">Raising Boys</strong> — Steve Biddulph provides the developmental science: three stages of boyhood, testosterone cycles, the unique roles of fathers and mothers, and what community must provide.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
