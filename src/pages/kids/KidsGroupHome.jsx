import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useProgress } from '../../context/ProgressContext'
import { useDailyContent } from '../../hooks/useDailyContent'
import { lessons } from '../../data/kidsLessons'

export default function KidsGroupHome() {
  const { ageGroup } = useParams()
  const navigate = useNavigate()
  const { progress } = useProgress()
  const { todayAffirmation, todayChallenge } = useDailyContent(ageGroup)
  const grp = progress[ageGroup] || {}

  const groupLessons = lessons.filter(l => l.ageGroupId === ageGroup)
  const completedCount = grp.completedLessons?.length || 0

  useEffect(() => {
    document.title = `${ageGroup} — Kids Section — Thrive`
  }, [ageGroup])

  const tiles = [
    { to: `lessons`, emoji: '📚', label: 'Lessons', sub: `${completedCount}/${groupLessons.length} complete` },
    { to: `quizzes`, emoji: '❓', label: 'Quizzes', sub: `Test what you know` },
    { to: `affirmations`, emoji: '⭐', label: "Today's Affirmation", sub: todayAffirmation?.text?.slice(0, 40) + '…' || 'Daily wisdom' },
    { to: `progress`, emoji: '🏆', label: 'My Progress', sub: `${grp.currentStreak || 0} day streak 🔥` },
  ]

  return (
    <div>
      {todayChallenge && (
        <div className="bg-white rounded-2xl border-2 border-cream-200 p-5 mb-6">
          <p className="font-kids font-bold text-gray-400 text-xs uppercase tracking-wide mb-2">Today's Challenge {todayChallenge.emoji}</p>
          <p className="font-kids text-gray-800 leading-relaxed">{todayChallenge.text}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {tiles.map(tile => (
          <button
            key={tile.to}
            onClick={() => navigate(tile.to)}
            className="text-left bg-white rounded-2xl border border-cream-200 hover:border-gold-400 hover:shadow-md p-5 transition-all group"
          >
            <div className="text-3xl mb-2">{tile.emoji}</div>
            <h3 className="font-kids font-bold text-gray-800 mb-1">{tile.label}</h3>
            <p className="font-kids text-xs text-gray-400 leading-relaxed">{tile.sub}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
