import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { lessons } from '../../data/kidsLessons'
import { useProgress } from '../../context/ProgressContext'
import Button from '../../components/ui/Button'

export default function KidsLessonDetail() {
  const { ageGroup, lessonId } = useParams()
  const navigate = useNavigate()
  const { progress, markLessonComplete } = useProgress()
  const [showMessage, setShowMessage] = useState(false)

  const lesson = lessons.find(l => l.id === lessonId)
  const isDone = progress[ageGroup]?.completedLessons?.includes(lessonId) || false

  useEffect(() => {
    if (lesson) document.title = `${lesson.title} — Thrive`
  }, [lesson])

  if (!lesson) return <div className="text-gray-500 py-8">Lesson not found.</div>

  function handleComplete() {
    markLessonComplete(ageGroup, lessonId)
    setShowMessage(true)
  }

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => navigate(`/kids/${ageGroup}/lessons`)} className="mb-6">
        ← Back to Lessons
      </Button>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">{lesson.emoji}</div>
        <h1 className="font-kids font-extrabold text-2xl text-gray-800 mb-1 leading-tight">{lesson.title}</h1>
        <p className="font-kids text-gray-400 text-sm">{lesson.readingMinutes} min read</p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-cream-200 p-6 mb-6">
        {lesson.content.split('\n\n').map((para, i) => (
          <p key={i} className="font-kids text-gray-700 leading-loose text-base mb-4">{para}</p>
        ))}
      </div>

      {/* Complete button */}
      {!isDone && !showMessage ? (
        <Button variant="primary" size="lg" className="w-full" onClick={handleComplete}>
          ✓ Mark as Complete
        </Button>
      ) : (
        <div className="bg-forest-700 text-white rounded-2xl p-5 text-center">
          <p className="font-kids font-bold text-lg mb-2">{lesson.completionMessage}</p>
          <button
            onClick={() => navigate(`/kids/${ageGroup}/quizzes/${lessonId.replace('les', 'quiz')}`)}
            className="text-sm text-green-200 underline font-kids"
          >
            Take the quiz for this lesson →
          </button>
        </div>
      )}
    </div>
  )
}
