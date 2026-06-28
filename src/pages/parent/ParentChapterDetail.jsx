import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { chapters, books, themes, ageStages } from '../../data/parentContent'

export default function ParentChapterDetail() {
  const { bookId, chapterId } = useParams()
  const navigate = useNavigate()
  const [view, setView] = useState('summary') // 'summary' | 'detailed'

  const chapter = chapters.find(c => c.id === chapterId && c.bookId === bookId)
  const book = books[bookId]

  useEffect(() => {
    if (chapter) document.title = `${chapter.title} — Parent Guide — Thrive`
  }, [chapter])

  if (!chapter || !book) return <div className="text-gray-500 py-8">Chapter not found.</div>

  const chapterThemes = (chapter.themeIds || []).map(id => themes.find(t => t.id === id)).filter(Boolean)
  const chapterStages = (chapter.ageStageIds || []).map(id => ageStages.find(s => s.id === id)).filter(Boolean)

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-6">
        ← Back
      </Button>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge color={bookId === 'kunjufu' ? 'amber' : 'forest'}>
            {book.shortName} — Chapter {chapter.number}
          </Badge>
          {chapterStages.map(s => (
            <Badge key={s.id} color="gray">Ages {s.ageRange}</Badge>
          ))}
        </div>
        <h1 className="font-heading text-3xl font-bold text-brown-900 mb-2 leading-tight">{chapter.title}</h1>
        <p className="text-gold-600 text-sm italic">{book.title} — {book.author}</p>
      </div>

      {/* View toggle */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setView('summary')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            view === 'summary'
              ? 'bg-brown-900 text-cream-50'
              : 'bg-white border border-cream-200 text-gray-600 hover:border-gold-400'
          }`}
        >
          Summary View
        </button>
        <button
          onClick={() => setView('detailed')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            view === 'detailed'
              ? 'bg-brown-900 text-cream-50'
              : 'bg-white border border-cream-200 text-gray-600 hover:border-gold-400'
          }`}
        >
          Detailed View
        </button>
      </div>

      {view === 'summary' ? (
        <div className="space-y-6">
          {/* Overview */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <h2 className="font-heading text-lg font-bold text-brown-900 mb-3">Overview</h2>
            <p className="text-gray-700 leading-relaxed">{chapter.summary}</p>
          </div>

          {/* Key Points */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <h2 className="font-heading text-lg font-bold text-brown-900 mb-4">Key Points</h2>
            <ul className="space-y-4">
              {chapter.keyPoints.map((pt, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-gold-500 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-gray-700 leading-relaxed">{pt}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Items */}
          <div className="bg-gold-300 rounded-xl p-6">
            <h2 className="font-heading text-lg font-bold text-brown-900 mb-4">Action Steps for Parents</h2>
            <ul className="space-y-3">
              {chapter.actionItems.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-brown-700 font-bold flex-shrink-0 mt-0.5">→</span>
                  <p className="text-brown-900 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Themes */}
          {chapterThemes.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">Related Themes</h3>
              <div className="flex flex-wrap gap-2">
                {chapterThemes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => navigate(`/parent/by-topic/${t.id}`)}
                    className="flex items-center gap-1.5 bg-white border border-cream-200 hover:border-gold-400 rounded-full px-3 py-1 text-sm text-gray-600 transition-colors"
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Full content */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <h2 className="font-heading text-lg font-bold text-brown-900 mb-4">Full Chapter Analysis</h2>
            <div className="prose prose-sm max-w-none">
              {chapter.fullContent.split('\n\n').map((para, i) => (
                <p key={i} className="text-gray-700 leading-relaxed mb-4">{para}</p>
              ))}
            </div>
          </div>

          {/* Key Points (repeated for reference) */}
          <div className="bg-white rounded-xl border border-cream-200 p-6">
            <h2 className="font-heading text-lg font-bold text-brown-900 mb-4">Key Points</h2>
            <ul className="space-y-4">
              {chapter.keyPoints.map((pt, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-gold-500 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
                  <p className="text-gray-700 leading-relaxed">{pt}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Items */}
          <div className="bg-gold-300 rounded-xl p-6">
            <h2 className="font-heading text-lg font-bold text-brown-900 mb-4">Action Steps for Parents</h2>
            <ul className="space-y-3">
              {chapter.actionItems.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-brown-700 font-bold flex-shrink-0 mt-0.5">→</span>
                  <p className="text-brown-900 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
