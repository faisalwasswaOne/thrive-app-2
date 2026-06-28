export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-gold-500 hover:bg-gold-600 text-brown-950 focus:ring-gold-400',
    secondary: 'bg-brown-800 hover:bg-brown-700 text-cream-50 focus:ring-brown-600',
    ghost: 'bg-transparent hover:bg-cream-100 text-brown-800 border border-brown-200 focus:ring-brown-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-400',
    kids: 'bg-white hover:bg-cream-50 text-forest-800 border-2 border-forest-600 focus:ring-forest-400',
  }

  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-5 py-2.5',
    lg: 'text-lg px-7 py-3',
  }

  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`} {...props}>
      {children}
    </button>
  )
}
