import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import ChapterCard from '../../components/parent/ChapterCard'
import Button from '../../components/ui/Button'
import { themes, chapters } from '../../data/parentContent'

export default function ParentTopicDetail() {
  const { themeId } = useParams()
  const navigate = useNavigate()
  const theme = themes.find(t => t.id === themeId)

  useEffect(() => {
    if (theme) document.title = `${theme.label} — Parent Guide — Thrive`
  }, [theme])

  if (!theme) return <div className="text-gray-500 py-8">Topic not found.</div>

  const themeChapters = theme.chapterIds
    .map(id => chapters.find(c => c.id === id))
    .filter(Boolean)

  return (
    <div>
      <Button variant="ghost" size="sm" onClick={() => navigate('/parent/by-topic')} className="mb-6">
        ← Back to Topics
      </Button>

      <div className="mb-8">
        <div className="text-4xl mb-3">{theme.icon}</div>
        <h1 className="font-heading text-3xl font-bold text-brown-900 mb-2">{theme.label}</h1>
        <p className="text-gray-600 leading-relaxed max-w-xl">{theme.description}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {themeChapters.map(ch => <ChapterCard key={ch.id} chapter={ch} />)}
      </div>
    </div>
  )
}
