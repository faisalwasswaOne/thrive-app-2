import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { quizzes } from '../../data/kidsQuizzes'
import { useProgress } from '../../context/ProgressContext'
import QuizQuestion from '../../components/kids/QuizQuestion'
import Button from '../../components/ui/Button'

export default function KidsQuizPage() {
  const { ageGroup, quizId } = useParams()
  const navigate = useNavigate()
  const { recordQuizResult } = useProgress()
  const quiz = quizzes.find(q => q.id === quizId)

  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState([])
  const [answered, setAnswered] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (quiz) document.title = `${quiz.title} — Thrive`
  }, [quiz])

  if (!quiz) return <div className="text-gray-500 py-8">Quiz not found.</div>

  function handleAnswer(correct) {
    setAnswers(prev => [...prev, correct])
    setAnswered(true)
  }

  function handleNext() {
    if (currentQ + 1 < quiz.questions.length) {
      setCurrentQ(q => q + 1)
      setAnswered(false)
    } else {
      const finalScore = answers.filter(Boolean).length
      recordQuizResult(ageGroup, quizId, finalScore, quiz.questions.length)
      setDone(true)
    }
  }

  if (done) {
    const finalScore = answers.filter(Boolean).length
    const finalPassed = finalScore >= quiz.passingScore
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">{finalPassed ? '🏆' : '💪'}</div>
        <h2 className="font-kids font-extrabold text-2xl text-gray-800 mb-2">
          {finalPassed ? 'You nailed it!' : 'Good try!'}
        </h2>
        <p className="font-kids text-gray-500 mb-6">
          You got {finalScore} out of {quiz.questions.length} correct.
          {!finalPassed && ' Try again — you can do this!'}
        </p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          {!finalPassed && (
            <Button variant="primary" onClick={() => {
              setCurrentQ(0)
              setAnswers([])
              setAnswered(false)
              setDone(false)
            }}>
              Try Again
            </Button>
          )}
          {finalPassed && (
            <Button variant="primary" onClick={() => navigate(`/kids/${ageGroup}/lessons/${quiz.lessonId}`)}>
              ← Back to Lesson
            </Button>
          )}
          <Button variant="ghost" onClick={() => navigate(`/kids/${ageGroup}/quizzes`)}>
            All Quizzes
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(`/kids/${ageGroup}/quizzes`)}>
          ← Quizzes
        </Button>
        <span className="font-kids text-gray-400 text-sm">
          {currentQ + 1} of {quiz.questions.length}
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="text-3xl mb-1">{quiz.emoji}</div>
        <h2 className="font-kids font-extrabold text-xl text-gray-800">{quiz.title}</h2>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center gap-2 mb-8">
        {quiz.questions.map((_, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-full ${
            i < currentQ
              ? (answers[i] ? 'bg-forest-600' : 'bg-red-400')
              : i === currentQ
              ? 'bg-gold-500'
              : 'bg-cream-200'
          }`} />
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-cream-200 p-6 mb-4">
        <QuizQuestion
          key={currentQ}
          question={quiz.questions[currentQ]}
          onAnswer={handleAnswer}
        />
      </div>

      {answered && (
        <Button variant="primary" size="lg" className="w-full" onClick={handleNext}>
          {currentQ + 1 < quiz.questions.length ? 'Next Question →' : 'See Results →'}
        </Button>
      )}
    </div>
  )
}
