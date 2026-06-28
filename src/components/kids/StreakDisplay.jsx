export default function StreakDisplay({ streak, ageGroup }) {
  const colors = {
    elementary: 'text-forest-700',
    preteen: 'text-amber-700',
    teen: 'text-gold-600',
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl">🔥</span>
      <div>
        <span className={`font-kids font-extrabold text-2xl ${colors[ageGroup] || colors.teen}`}>
          {streak}
        </span>
        <span className="text-gray-500 text-sm ml-1">day streak</span>
      </div>
    </div>
  )
}
