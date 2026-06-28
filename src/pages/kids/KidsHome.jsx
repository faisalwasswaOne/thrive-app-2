import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const groups = [
  {
    id: 'elementary',
    emoji: '⭐',
    label: 'Elementary',
    ages: '5 – 9',
    tagline: 'Stories, lessons, and fun activities about who you are and where you come from.',
    bg: 'bg-forest-700',
    hover: 'hover:bg-forest-600',
    border: 'border-forest-600',
    accentText: 'text-green-200',
    btnText: 'text-green-200 border-green-300 hover:bg-white/20',
  },
  {
    id: 'preteen',
    emoji: '🔥',
    label: 'Pre-Teen',
    ages: '9 – 13',
    tagline: 'Lessons about identity, peer pressure, history, and becoming who you are meant to be.',
    bg: 'bg-amber-600',
    hover: 'hover:bg-amber-500',
    border: 'border-amber-500',
    accentText: 'text-amber-100',
    btnText: 'text-amber-100 border-amber-200 hover:bg-white/20',
  },
  {
    id: 'teen',
    emoji: '👑',
    label: 'Teen',
    ages: '13 – 18',
    tagline: 'Deep lessons about manhood, systems, legacy, and building the life you want.',
    bg: 'bg-brown-900',
    hover: 'hover:bg-brown-800',
    border: 'border-brown-700',
    accentText: 'text-gold-300',
    btnText: 'text-gold-300 border-gold-500 hover:bg-white/20',
  },
]

export default function KidsHome() {
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Kids Section — Thrive'
  }, [])

  return (
    <div className="min-h-screen bg-brown-950 flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="font-kids font-extrabold text-4xl sm:text-5xl text-gold-400 mb-3">Which group are you?</h1>
        <p className="text-cream-200 text-base max-w-md mx-auto">
          Choose your age group for lessons, quizzes, and daily affirmations made just for you.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 w-full max-w-3xl">
        {groups.map(g => (
          <button
            key={g.id}
            onClick={() => navigate(`/kids/${g.id}/lessons`)}
            className={`group ${g.bg} ${g.hover} rounded-2xl p-6 text-left transition-colors border ${g.border}`}
          >
            <div className="text-4xl mb-3">{g.emoji}</div>
            <h2 className={`font-kids font-extrabold text-2xl text-white mb-1`}>{g.label}</h2>
            <p className={`text-sm font-semibold ${g.accentText} mb-3`}>Ages {g.ages}</p>
            <p className="text-white/80 text-sm leading-relaxed mb-4">{g.tagline}</p>
            <span className={`text-sm font-semibold border rounded-full px-3 py-1 ${g.btnText} inline-block group-hover:translate-x-1 transition-transform`}>
              Start →
            </span>
          </button>
        ))}
      </div>

      <button onClick={() => navigate('/parent')} className="mt-8 text-sm text-brown-400 hover:text-brown-200 transition-colors">
        Parents: go to Parent Guide →
      </button>
    </div>
  )
}
