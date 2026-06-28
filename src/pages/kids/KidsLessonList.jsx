import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { lessons } from '../../data/kidsLessons'
import { useProgress } from '../../context/ProgressContext'

export default function KidsLessonList() {
  const { ageGroup } = useParams()
  const navigate = useNavigate()
  const { progress } = useProgress()
  const completedLessons = progress[ageGroup]?.completedLessons || []

  const groupLessons = lessons
    .filter(l => l.ageGroupId === ageGroup)
    .sort((a, b) => a.order - b.order)

  useEffect(() => {
    document.title = `Lessons — Kids — Thrive`
  }, [])

  return (
    <div>
      <h2 className="font-kids font-extrabold text-2xl text-gray-800 mb-1">Lessons</h2>
      <p className="font-kids text-gray-400 text-sm mb-6">{completedLessons.length}/{groupLessons.length} complete</p>

      <div className="space-y-3">
        {groupLessons.map(lesson => {
          const done = completedLessons.includes(lesson.id)
          return (
            <button
              key={lesson.id}
              onClick={() => navigate(lesson.id)}
              className="w-full text-left bg-white rounded-2xl border-2 border-cream-200 hover:border-gold-400 p-4 transition-all group flex items-center gap-4"
            >
              <div className="text-3xl flex-shrink-0">{lesson.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-kids font-bold text-gray-800">{lesson.title}</span>
                  {done && <span className="text-xs bg-forest-100 text-forest-700 font-semibold px-2 py-0.5 rounded-full">✓ Done</span>}
                </div>
                <span className="font-kids text-xs text-gray-400">{lesson.readingMinutes} min read</span>
              </div>
              <span className="text-gray-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all">→</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
