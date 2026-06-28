import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDailyContent } from '../../hooks/useDailyContent'
import { getDayOfYear } from '../../utils/dateHelpers'
import AffirmationCard from '../../components/kids/AffirmationCard'
import ChallengeCard from '../../components/kids/ChallengeCard'
import { affirmations } from '../../data/kidsAffirmations'

export default function KidsAffirmations() {
  const { ageGroup } = useParams()
  const { todayAffirmation, todayChallenge } = useDailyContent(ageGroup)

  useEffect(() => {
    document.title = `Daily — Kids — Thrive`
  }, [])

  const day = getDayOfYear()
  const groupAffirmations = affirmations[ageGroup] || []

  const recent = [-2, -1].map(offset => {
    const idx = ((day + offset) % groupAffirmations.length + groupAffirmations.length) % groupAffirmations.length
    return groupAffirmations[idx]
  }).filter(Boolean)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-kids font-extrabold text-2xl text-gray-800 mb-1">Today's Affirmation</h2>
        <p className="font-kids text-gray-400 text-sm mb-4">A truth worth carrying into today.</p>
        <AffirmationCard affirmation={todayAffirmation} ageGroup={ageGroup} />
      </div>

      <div>
        <h2 className="font-kids font-extrabold text-xl text-gray-800 mb-1">Today's Challenge</h2>
        <p className="font-kids text-gray-400 text-sm mb-4">One thing you can do today to grow.</p>
        <ChallengeCard challenge={todayChallenge} ageGroup={ageGroup} />
      </div>

      {recent.length > 0 && (
        <div>
          <h3 className="font-kids font-bold text-gray-500 text-sm mb-3">Recent Affirmations</h3>
          <div className="space-y-3">
            {recent.map((a, i) => (
              <div key={i} className="bg-white rounded-xl border border-cream-200 p-4 flex items-center gap-3">
                <span className="text-2xl">{a.emoji}</span>
                <p className="font-kids text-gray-600 text-sm italic">"{a.text}"</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
