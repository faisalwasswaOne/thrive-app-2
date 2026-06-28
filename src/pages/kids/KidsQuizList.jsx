import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { quizzes } from '../../data/kidsQuizzes'
import { useProgress } from '../../context/ProgressContext'

export default function KidsQuizList() {
  const { ageGroup } = useParams()
  const navigate = useNavigate()
  const { progress } = useProgress()
  const completedQuizzes = progress[ageGroup]?.completedQuizzes || {}

  const groupQuizzes = quizzes.filter(q => q.ageGroupId === ageGroup)

  useEffect(() => {
    document.title = `Quizzes — Kids — Thrive`
  }, [])

  return (
    <div>
      <h2 className="font-kids font-extrabold text-2xl text-gray-800 mb-1">Quizzes</h2>
      <p className="font-kids text-gray-400 text-sm mb-6">
        {Object.keys(completedQuizzes).length}/{groupQuizzes.length} completed
      </p>

      <div className="space-y-3">
        {groupQuizzes.map(quiz => {
          const result = completedQuizzes[quiz.id]
          return (
            <button
              key={quiz.id}
              onClick={() => navigate(quiz.id)}
              className="w-full text-left bg-white rounded-2xl border-2 border-cream-200 hover:border-gold-400 p-4 transition-all group flex items-center gap-4"
            >
              <div className="text-3xl flex-shrink-0">{quiz.emoji}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-kids font-bold text-gray-800">{quiz.title}</span>
                  {result && (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      result.passed
                        ? 'bg-forest-100 text-forest-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {result.passed ? `✓ ${result.score}/${result.total}` : `↺ ${result.score}/${result.total}`}
                    </span>
                  )}
                </div>
                <span className="font-kids text-xs text-gray-400">{quiz.questions.length} questions</span>
              </div>
              <span className="text-gray-300 group-hover:text-gold-500 group-hover:translate-x-1 transition-all">→</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
