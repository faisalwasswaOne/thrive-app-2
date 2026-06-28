import { useState } from 'react'
import { useChat } from '../../context/ChatContext'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import ChatDrawer from './ChatDrawer'

export default function ChatToggle() {
  const { isEnabled, isOpen, enable, toggleOpen } = useChat()
  const [showIntro, setShowIntro] = useState(false)

  function handleClick() {
    if (!isEnabled) {
      setShowIntro(true)
    } else {
      toggleOpen()
    }
  }

  function handleEnable() {
    enable()
    setShowIntro(false)
    toggleOpen()
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl transition-colors ${
          isEnabled && isOpen
            ? 'bg-brown-900 text-gold-400'
            : 'bg-gold-500 hover:bg-gold-600 text-brown-950'
        }`}
        aria-label="AI Guide chat"
        title="AI Guide"
      >
        {isEnabled && isOpen ? '✕' : '💬'}
      </button>

      <Modal isOpen={showIntro} onClose={() => setShowIntro(false)} title="AI Guide — Optional">
        <p className="text-gray-700 leading-relaxed mb-4">
          The AI Guide lets you ask questions and get answers grounded in the wisdom of
          Jawanza Kunjufu's <em>Countering the Conspiracy to Destroy Black Boys</em> and
          Steve Biddulph's <em>Raising Boys</em>.
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">
          It is here to help, not to replace professional support. For medical, legal, or
          mental health concerns, please consult a qualified professional.
        </p>
        <div className="flex gap-3">
          <Button variant="primary" onClick={handleEnable}>Enable AI Guide</Button>
          <Button variant="ghost" onClick={() => setShowIntro(false)}>Maybe later</Button>
        </div>
      </Modal>

      {isEnabled && isOpen && <ChatDrawer />}
    </>
  )
}
