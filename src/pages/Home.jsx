import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Thrive — Raising Black Boys with Purpose'
  }, [])

  return (
    <div className="min-h-screen bg-brown-950 flex flex-col">
      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6">
          <h1 className="font-heading text-gold-400 text-6xl sm:text-7xl font-bold mb-3">Thrive</h1>
          <p className="text-cream-100 text-lg sm:text-xl font-medium max-w-md mx-auto leading-relaxed">
            Raising Black boys with wisdom, confidence, and purpose.
          </p>
        </div>

        <p className="text-cream-200 text-sm mb-12 max-w-sm mx-auto leading-relaxed">
          Grounded in <em className="text-gold-300">Jawanza Kunjufu</em> and <em className="text-gold-300">Steve Biddulph</em> —
          guidance for parents and young people alike.
        </p>

        {/* Entry cards */}
        <div className="grid sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <button
            onClick={() => navigate('/parent')}
            className="group bg-brown-800 hover:bg-brown-700 border border-brown-700 hover:border-gold-500 rounded-2xl p-8 text-left transition-all"
          >
            <div className="text-4xl mb-4">👨‍👦</div>
            <h2 className="font-heading text-gold-400 text-2xl font-bold mb-2">Parent Guide</h2>
            <p className="text-cream-200 text-sm leading-relaxed mb-4">
              Chapter summaries, age-stage guidance, and actionable steps from both books. Summary and detailed views.
            </p>
            <span className="text-gold-500 font-semibold text-sm group-hover:translate-x-1 inline-block transition-transform">
              Enter Parent Guide →
            </span>
          </button>

          <button
            onClick={() => navigate('/kids')}
            className="group bg-forest-800 hover:bg-forest-700 border border-forest-700 hover:border-green-400 rounded-2xl p-8 text-left transition-all"
          >
            <div className="text-4xl mb-4">⭐</div>
            <h2 className="font-kids text-green-300 text-2xl font-extrabold mb-2">Kids Section</h2>
            <p className="text-green-100 text-sm leading-relaxed mb-4">
              Lessons, quizzes, daily affirmations, and challenges for ages 5–18 — choose your age group.
            </p>
            <span className="text-green-300 font-semibold text-sm group-hover:translate-x-1 inline-block transition-transform">
              Enter Kids Section →
            </span>
          </button>
        </div>
      </div>

      {/* Bottom attribution */}
      <div className="text-center py-6 text-xs text-brown-500">
        Based on <em>Countering the Conspiracy to Destroy Black Boys</em> by Jawanza Kunjufu
        {' '}and <em>Raising Boys</em> by Steve Biddulph
      </div>
    </div>
  )
}
