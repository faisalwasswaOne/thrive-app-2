import { Link, NavLink, Outlet, useParams } from 'react-router-dom'

const AGE_CONFIG = {
  elementary: {
    label: 'Elementary',
    ages: '5–9',
    headerBg: 'bg-forest-700',
    accentColor: 'text-green-200',
    activePill: 'bg-white text-forest-800',
  },
  preteen: {
    label: 'Pre-Teen',
    ages: '9–13',
    headerBg: 'bg-amber-600',
    accentColor: 'text-amber-100',
    activePill: 'bg-white text-amber-700',
  },
  teen: {
    label: 'Teen',
    ages: '13–18',
    headerBg: 'bg-brown-900',
    accentColor: 'text-gold-300',
    activePill: 'bg-gold-400 text-brown-950',
  },
}

export default function KidsLayout() {
  const { ageGroup } = useParams()
  const cfg = AGE_CONFIG[ageGroup] || AGE_CONFIG.teen
  const base = `/kids/${ageGroup}`

  const tabs = [
    { to: `${base}/lessons`, label: '📚 Lessons' },
    { to: `${base}/quizzes`, label: '❓ Quizzes' },
    { to: `${base}/affirmations`, label: '⭐ Daily' },
    { to: `${base}/progress`, label: '🏆 Progress' },
  ]

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className={`${cfg.headerBg} text-white sticky top-0 z-30`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <Link to="/kids" className="flex items-center gap-2">
              <span className="font-kids font-extrabold text-xl">Thrive</span>
              <span className={`text-sm font-semibold ${cfg.accentColor}`}>{cfg.label} ({cfg.ages})</span>
            </Link>
            <Link to="/parent" className={`text-xs ${cfg.accentColor} hover:text-white`}>Parent Guide →</Link>
          </div>
          {/* Tabs */}
          <div className="flex gap-1 pb-3 overflow-x-auto">
            {tabs.map(tab => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors font-kids ${
                    isActive ? cfg.activePill : 'text-white/80 hover:text-white hover:bg-white/20'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
