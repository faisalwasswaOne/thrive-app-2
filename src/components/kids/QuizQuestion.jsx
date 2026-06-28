import { useState } from 'react'

export default function QuizQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null)

  function choose(i) {
    if (selected !== null) return
    setSelected(i)
    onAnswer(i === question.correctIndex)
  }

  return (
    <div>
      <p className="font-kids font-bold text-gray-800 text-lg mb-6 leading-relaxed">{question.text}</p>
      <div className="space-y-3 mb-6">
        {question.options.map((opt, i) => {
          let cls = 'w-full text-left px-4 py-3 rounded-xl border-2 font-kids transition-all '
          if (selected === null) {
            cls += 'border-cream-200 bg-white hover:border-gold-400 hover:bg-cream-50'
          } else if (i === question.correctIndex) {
            cls += 'border-forest-600 bg-forest-50 text-forest-800'
          } else if (i === selected) {
            cls += 'border-red-400 bg-red-50 text-red-700'
          } else {
            cls += 'border-cream-200 bg-white opacity-50'
          }
          return (
            <button key={i} className={cls} onClick={() => choose(i)}>
              <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
              {opt}
            </button>
          )
        })}
      </div>
      {selected !== null && (
        <div className={`rounded-xl p-4 ${selected === question.correctIndex ? 'bg-forest-50 border border-forest-200' : 'bg-amber-50 border border-amber-200'}`}>
          <p className={`font-kids text-sm font-semibold mb-1 ${selected === question.correctIndex ? 'text-forest-800' : 'text-amber-800'}`}>
            {selected === question.correctIndex ? '✓ Correct!' : '✗ Not quite'}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}
