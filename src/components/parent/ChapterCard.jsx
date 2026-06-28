import { useNavigate } from 'react-router-dom'
import Badge from '../ui/Badge'
import { books } from '../../data/parentContent'

export default function ChapterCard({ chapter }) {
  const navigate = useNavigate()
  const book = books[chapter.bookId]

  return (
    <button
      onClick={() => navigate(`/parent/books/${chapter.bookId}/chapters/${chapter.id}`)}
      className="w-full text-left bg-white rounded-xl border border-cream-200 p-5 hover:shadow-md hover:border-gold-400 transition-all group"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <Badge color={chapter.bookId === 'kunjufu' ? 'amber' : 'forest'}>
          {book?.shortName} Ch.{chapter.number}
        </Badge>
        <span className="text-gold-500 group-hover:translate-x-1 transition-transform text-lg">→</span>
      </div>
      <h3 className="font-heading font-bold text-brown-900 mb-2 leading-snug">{chapter.title}</h3>
      <p className="text-sm text-gray-600 mb-3 leading-relaxed line-clamp-2">{chapter.summary}</p>
      <ul className="space-y-1">
        {chapter.keyPoints.slice(0, 2).map((pt, i) => (
          <li key={i} className="text-xs text-gray-500 flex gap-2">
            <span className="text-gold-500 mt-0.5 flex-shrink-0">•</span>
            <span className="line-clamp-1">{pt}</span>
          </li>
        ))}
      </ul>
    </button>
  )
}
