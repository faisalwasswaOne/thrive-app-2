import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ChapterCard from '../../components/parent/ChapterCard'
import Button from '../../components/ui/Button'
import { ageStages, chapters } from '../../data/parentContent'

export default function ParentAgeDetail() {
  const { stageId } = useParams()
  const navigate = useNavigate()
  const stage = ageStages.find(s => s.id === stageId)

  useEffect(() => {
    if (stage) document.title = `${stage.label} — Parent Guide — Thrive`
  }, [stage])

  if (!stage) return <div className="text-gray-500 py-8">Stage not found.</div>

  const stageChapters = stage.chapterIds
    .map(id => chapters.find(c => c.id === id))
    .filter(Boolean)

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => navigate('/parent/by-age')} className="mb-6">
        ← Back to Age Stages
      </Button>

      <div className="bg-brown-900 rounded-2xl p-6 text-cream-50 mb-8">
        <div className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-1">Ages {stage.ageRange}</div>
        <h1 className="font-heading text-3xl font-bold text-cream-50 mb-1">{stage.label}</h1>
        <div className="text-gold-300 font-medium mb-3">{stage.biddulphStage}</div>
        <p className="text-cream-200 text-base leading-relaxed mb-4">{stage.tagline}</p>
        <p className="text-xs text-cream-300 italic border-t border-brown-700 pt-3">{stage.kunjufulNote}</p>
      </div>

      {/* Key insights */}
      <section className="mb-8">
        <h2 className="font-heading text-xl font-bold text-brown-900 mb-4">Key Insights for This Stage</h2>
        <ul className="space-y-3">
          {stage.keyInsights.map((insight, i) => (
            <li key={i} className="flex gap-3 bg-white rounded-xl p-4 border border-cream-200">
              <span className="text-gold-500 font-bold flex-shrink-0 mt-0.5">{i + 1}.</span>
              <p className="text-gray-700 leading-relaxed">{insight}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Chapters */}
      <section>
        <h2 className="font-heading text-xl font-bold text-brown-900 mb-4">
          Relevant Chapters ({stageChapters.length})
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {stageChapters.map(ch => <ChapterCard key={ch.id} chapter={ch} />)}
        </div>
      </section>
    </div>
  )
}
