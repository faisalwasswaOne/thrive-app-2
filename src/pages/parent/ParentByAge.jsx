import { useEffect } from 'react'
import AgeStageBanner from '../../components/parent/AgeStageBanner'
import { ageStages } from '../../data/parentContent'

export default function ParentByAge() {
  useEffect(() => {
    document.title = 'By Age Stage — Parent Guide — Thrive'
  }, [])

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-brown-900 mb-2">By Age Stage</h1>
        <p className="text-gray-500 leading-relaxed max-w-xl">
          Biddulph's three developmental stages, integrated with Kunjufu's critical intervention windows.
          Select your son's current stage.
        </p>
      </div>
      <div className="space-y-4">
        {ageStages.map(stage => <AgeStageBanner key={stage.id} stage={stage} />)}
      </div>
    </div>
  )
}
