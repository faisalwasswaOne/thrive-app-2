import { useEffect } from 'react'
import ThemeTile from '../../components/parent/ThemeTile'
import { themes } from '../../data/parentContent'

export default function ParentByTopic() {
  useEffect(() => {
    document.title = 'By Topic — Parent Guide — Thrive'
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-brown-900 mb-2">By Topic</h1>
        <p className="text-gray-500 leading-relaxed max-w-xl">
          Ten themes drawn from both books. Each theme pulls together the most relevant chapters from Kunjufu and Biddulph.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map(theme => <ThemeTile key={theme.id} theme={theme} />)}
      </div>
    </div>
  )
}
