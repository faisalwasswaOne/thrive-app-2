import { useState } from 'react'
import { useProgress } from '../../context/ProgressContext'
import { getTodayString } from '../../utils/dateHelpers'

export default function ChallengeCard({ challenge, ageGroup }) {
  const { progress, markChallengeComplete } = useProgress()
  const [justCompleted, setJustCompleted] = useState(false)

  if (!challenge) return null

  const today = getTodayString()
  const isCompleted = progress[ageGroup]?.completedChallenges?.includes(today) || justCompleted

  function handleComplete() {
    if (isCompleted) return
    markChallengeComplete(ageGroup)
    setJustCompleted(true)
  }

  return (
    <div className={`rounded-2xl border-2 p-6 transition-all ${isCompleted ? 'border-forest-600 bg-forest-50' : 'border-cream-200 bg-white'}`}>
      <div className="flex items-start gap-4">
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
            isCompleted
              ? 'bg-forest-600 border-forest-600 text-white'
              : 'border-gray-300 hover:border-forest-500'
          }`}
          aria-label={isCompleted ? 'Challenge completed' : 'Mark challenge complete'}
        >
          {isCompleted && '✓'}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{challenge.emoji}</span>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{challenge.category}</span>
          </div>
          <p className="font-kids text-gray-800 leading-relaxed">{challenge.text}</p>
          {isCompleted && (
            <p className="mt-3 text-forest-700 font-semibold text-sm">
              🎉 Challenge complete! Great work today!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
