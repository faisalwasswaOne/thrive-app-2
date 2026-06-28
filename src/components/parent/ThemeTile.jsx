import { useNavigate } from 'react-router-dom'
import { chapters } from '../../data/parentContent'

export default function ThemeTile({ theme }) {
  const navigate = useNavigate()
  const count = theme.chapterIds.filter(id => chapters.find(c => c.id === id)).length

  return (
    <button
      onClick={() => navigate(`/parent/by-topic/${theme.id}`)}
      className="text-left bg-white rounded-xl border border-cream-200 p-5 hover:shadow-md hover:border-gold-400 transition-all group"
    >
      <div className="text-3xl mb-3">{theme.icon}</div>
      <h3 className="font-heading font-semibold text-brown-900 mb-1 group-hover:text-brown-700">{theme.label}</h3>
      <p className="text-sm text-gray-500 mb-3 leading-relaxed">{theme.description}</p>
      <span className="text-xs font-semibold text-gold-600">{count} chapter{count !== 1 ? 's' : ''}</span>
    </button>
  )
}
