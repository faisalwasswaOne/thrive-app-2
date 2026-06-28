import { useEffect } from 'react'
import ThemeTile from '../../components/parent/ThemeTile'
import BarometerGrid from '../../components/parent/BarometerGrid'
import { themes, books } from '../../data/parentContent'

export default function ParentSummary() {
  useEffect(() => {
    document.title = 'Summary — Parent Guide — Thrive'
  }, [])

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-heading text-3xl font-bold text-brown-900 mb-2">Summary View</h1>
        <p className="text-gray-500 leading-relaxed max-w-xl">
          All ten themes covered across both books. Click any theme for the full chapter breakdowns.
        </p>
      </div>

      {/* Theme grid */}
      <section>
        <h2 className="font-heading text-xl font-bold text-brown-900 mb-4">10 Core Themes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map(theme => <ThemeTile key={theme.id} theme={theme} />)}
        </div>
      </section>

      {/* Book overviews */}
      <section>
        <h2 className="font-heading text-xl font-bold text-brown-900 mb-4">The Two Books</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {Object.values(books).map(book => (
            <div key={book.id} className="bg-brown-900 rounded-xl p-6 text-cream-50">
              <div className={`inline-block text-xs font-bold px-2 py-0.5 rounded mb-3 ${
                book.id === 'kunjufu' ? 'bg-amber-500 text-brown-950' : 'bg-forest-600 text-white'
              }`}>
                {book.shortName}
              </div>
              <h3 className="font-heading font-bold text-cream-50 text-lg mb-1 leading-tight">{book.title}</h3>
              <p className="text-gold-300 text-sm mb-3">{book.author}</p>
              <p className="text-cream-200 text-sm leading-relaxed">{book.summary}</p>
              <p className="mt-3 text-gold-400 text-xs italic">{book.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Barometers */}
      <section>
        <BarometerGrid />
      </section>
    </div>
  )
}
