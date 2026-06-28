export default function ProgressBar({ value, max, label, color = 'gold' }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  const colors = {
    gold: 'bg-gold-500',
    forest: 'bg-forest-600',
    amber: 'bg-amber-500',
  }
  return (
    <div>
      {label && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label}</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className="w-full bg-cream-200 rounded-full h-2.5">
        <div
          className={`${colors[color] || colors.gold} h-2.5 rounded-full transition-all`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
}
