import { useState } from 'react'

export default function ChatInput({ onSend, isLoading }) {
  const [text, setText] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed || isLoading) return
    onSend(trimmed)
    setText('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-cream-200 p-3 flex gap-2">
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask a question…"
        rows={2}
        disabled={isLoading}
        className="flex-1 resize-none text-sm border border-cream-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:bg-gray-50"
      />
      <button
        type="submit"
        disabled={isLoading || !text.trim()}
        className="self-end bg-gold-500 hover:bg-gold-600 text-brown-950 font-semibold text-sm px-3 py-2 rounded-lg disabled:opacity-50 transition-colors"
      >
        Send
      </button>
    </form>
  )
}
