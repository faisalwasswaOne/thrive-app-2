export default function Badge({ children, color = 'gold', className = '' }) {
  const colors = {
    gold: 'bg-gold-300 text-brown-900',
    forest: 'bg-forest-700 text-white',
    amber: 'bg-amber-400 text-brown-900',
    brown: 'bg-brown-800 text-cream-50',
    gray: 'bg-gray-100 text-gray-700',
  }
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${colors[color] || colors.gold} ${className}`}>
      {children}
    </span>
  )
}
