export default function AffirmationCard({ affirmation, ageGroup }) {
  if (!affirmation) return null

  const gradients = {
    elementary: 'from-forest-800 to-forest-600',
    preteen: 'from-amber-600 to-amber-400',
    teen: 'from-brown-900 to-brown-700',
  }

  function handleShare() {
    navigator.clipboard?.writeText(affirmation.text).then(() => {
      alert('Copied to clipboard!')
    }).catch(() => {})
  }

  return (
    <div className={`bg-gradient-to-br ${gradients[ageGroup] || gradients.teen} rounded-2xl p-8 text-center text-white`}>
      <div className="text-5xl mb-4">{affirmation.emoji}</div>
      <blockquote className="font-kids font-bold text-xl leading-relaxed mb-6">
        "{affirmation.text}"
      </blockquote>
      <button
        onClick={handleShare}
        className="text-xs bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-colors"
      >
        Share this affirmation
      </button>
    </div>
  )
}
