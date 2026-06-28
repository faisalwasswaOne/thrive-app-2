import { Link, Outlet, useLocation } from 'react-router-dom'
import ChatToggle from '../components/chat/ChatToggle'

const navLinks = [
  { to: '/parent/summary', label: 'Summary' },
  { to: '/parent/by-age', label: 'By Age' },
  { to: '/parent/by-topic', label: 'By Topic' },
]

export default function ParentLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <header className="bg-brown-900 text-cream-50 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-heading text-gold-400 text-2xl font-bold">Thrive</span>
              <span className="text-cream-200 text-sm hidden sm:block">Parent Guide</span>
            </Link>
            <nav className="flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname.startsWith(link.to)
                      ? 'bg-gold-500 text-brown-950'
                      : 'text-cream-200 hover:text-cream-50 hover:bg-brown-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/kids"
                className="ml-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gold-400 hover:text-gold-300 border border-brown-700 hover:border-gold-500 transition-colors"
              >
                Kids Section →
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-cream-200 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-sm text-gray-400">
          <p>Based on <em>Countering the Conspiracy to Destroy Black Boys</em> by Jawanza Kunjufu</p>
          <p>and <em>Raising Boys</em> by Steve Biddulph</p>
        </div>
      </footer>

      {/* Optional AI chat */}
      <ChatToggle />
    </div>
  )
}
