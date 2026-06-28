import { barometers } from '../../data/parentContent'

export default function BarometerGrid() {
  return (
    <div>
      <h2 className="font-heading text-xl font-bold text-brown-900 mb-1">The Seven Barometers</h2>
      <p className="text-sm text-gray-500 mb-4">
        Kunjufu's framework for monitoring your son's whole development — not just grades.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {barometers.map(b => (
          <div key={b.id} className="bg-cream-50 border border-cream-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{b.emoji}</span>
              <h3 className="font-semibold text-brown-900 text-sm">{b.label}</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{b.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
