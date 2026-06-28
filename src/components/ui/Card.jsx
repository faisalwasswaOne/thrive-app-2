export default function Card({ children, className = '', onClick, hoverable = false }) {
  const base = 'bg-white rounded-xl shadow-sm border border-cream-200'
  const hover = hoverable ? 'hover:shadow-md hover:border-gold-300 transition-all cursor-pointer' : ''
  return (
    <div className={`${base} ${hover} ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
