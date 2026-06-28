import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useProgress } from '../../context/ProgressContext'
import ProgressBar from '../../components/ui/ProgressBar'
import StreakDisplay from '../../components/kids/StreakDisplay'
import { lessons } from '../../data/kidsLessons'
import { quizzes } from '../../data/kidsQuizzes'

const BADGE_INFO = {
  'first-lesson': { emoji: '📚', label: 'First Lesson', desc: 'Completed your first lesson!' },
  'first-quiz': { emoji: '❓', label: 'Quiz Star', desc: 'Passed your first quiz!' },
  '3-day-streak': { emoji: '🔥', label: '3-Day Streak', desc: 'Completed challenges 3 days in a row!' },
  '7-day-streak': { emoji: '🏆', label: 'Weekly Champion', desc: 'Completed challenges 7 days in a row!' },
}

export default function KidsProgress() {
  const { ageGroup } = useParams()
  const { progress } = useProgress()
  const grp = progress[ageGroup] || {}

  const totalLessons = lessons.filter(l => l.ageGroupId === ageGroup).length
  const completedLessons = grp.completedLessons?.length || 0

  const totalQuizzes = quizzes.filter(q => q.ageGroupId === ageGroup).length
  const completedQuizzes = Object.keys(grp.completedQuizzes || {}).length
  const passedQuizzes = Object.values(grp.completedQuizzes || {}).filter(r => r.passed).length

  const streak = grp.currentStreak || 0
  const longestStreak = grp.longestStreak || 0
  const badges = grp.badges || []

  useEffect(() => {
    document.title = `My Progress — Kids — Thrive`
  }, [])

  return (
    <div className="space-y-8">
      <h2 className="font-kids font-extrabold text-2xl text-gray-800">My Progress</h2>

      {/* Streak */}
      <div className="bg-white rounded-2xl border border-cream-200 p-6">
        <h3 className="font-kids font-bold text-gray-500 text-sm mb-4 uppercase tracking-wide">Daily Streak</h3>
        <StreakDisplay streak={streak} ageGroup={ageGroup} />
        {longestStreak > 0 && (
          <p className="font-kids text-xs text-gray-400 mt-2">Longest streak: {longestStreak} days</p>
        )}
      </div>

      {/* Lessons */}
      <div className="bg-white rounded-2xl border border-cream-200 p-6 space-y-4">
        <h3 className="font-kids font-bold text-gray-500 text-sm uppercase tracking-wide">Lessons</h3>
        <ProgressBar value={completedLessons} max={totalLessons} label="Lessons completed" color="forest" />
      </div>

      {/* Quizzes */}
      <div className="bg-white rounded-2xl border border-cream-200 p-6 space-y-4">
        <h3 className="font-kids font-bold text-gray-500 text-sm uppercase tracking-wide">Quizzes</h3>
        <ProgressBar value={completedQuizzes} max={totalQuizzes} label="Quizzes attempted" color="amber" />
        {completedQuizzes > 0 && (
          <p className="font-kids text-xs text-gray-400">{passedQuizzes} of {completedQuizzes} passed</p>
        )}
      </div>

      {/* Badges */}
      <div className="bg-white rounded-2xl border border-cream-200 p-6">
        <h3 className="font-kids font-bold text-gray-500 text-sm uppercase tracking-wide mb-4">Badges</h3>
        {badges.length === 0 ? (
          <p className="font-kids text-gray-400 text-sm">Complete lessons and challenges to earn badges!</p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {badges.map(badgeId => {
              const info = BADGE_INFO[badgeId]
              if (!info) return null
              return (
                <div key={badgeId} className="bg-cream-50 rounded-xl p-3 text-center">
                  <div className="text-3xl mb-1">{info.emoji}</div>
                  <p className="font-kids font-bold text-gray-800 text-sm">{info.label}</p>
                  <p className="font-kids text-xs text-gray-400 mt-0.5">{info.desc}</p>
                </div>
              )
            })}
          </div>
        )}

        {/* Locked badges preview */}
        {badges.length < Object.keys(BADGE_INFO).length && (
          <div className="mt-4 pt-4 border-t border-cream-200">
            <p className="font-kids text-xs text-gray-400 mb-2">More to unlock:</p>
            <div className="flex gap-2">
              {Object.entries(BADGE_INFO)
                .filter(([id]) => !badges.includes(id))
                .map(([id, info]) => (
                  <div key={id} className="w-10 h-10 rounded-full bg-cream-200 flex items-center justify-center text-xl grayscale opacity-40" title={info.label}>
                    {info.emoji}
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
