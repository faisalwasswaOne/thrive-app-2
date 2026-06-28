import { useRef, useEffect, useState } from 'react'
import { useChatApi } from '../../hooks/useChatApi'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

export default function ChatDrawer() {
  const { messages, isLoading, error, sendMessage, clearHistory } = useChatApi()
  const [context, setContext] = useState('parent')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-cream-200 flex flex-col overflow-hidden" style={{ maxHeight: '70vh' }}>
      {/* Header */}
      <div className="bg-brown-900 px-4 py-3 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-cream-50 font-semibold text-sm">AI Guide</h3>
          <p className="text-cream-200 text-xs">Based on Kunjufu & Biddulph</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={context}
            onChange={e => setContext(e.target.value)}
            className="text-xs bg-brown-800 text-cream-50 border border-brown-700 rounded-lg px-2 py-1"
          >
            <option value="parent">Parent</option>
            <option value="child-elementary">Child (5-9)</option>
            <option value="child-preteen">Child (9-13)</option>
            <option value="child-teen">Teen (13-18)</option>
          </select>
          {messages.length > 0 && (
            <button onClick={clearHistory} className="text-xs text-cream-300 hover:text-cream-50" title="Clear history">↺</button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {messages.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4 leading-relaxed">
            Ask anything about raising Black boys — the AI Guide will answer from the wisdom of both books.
          </p>
        )}
        {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <div className="flex gap-1">
              <span className="animate-bounce delay-0">•</span>
              <span className="animate-bounce delay-75">•</span>
              <span className="animate-bounce delay-150">•</span>
            </div>
            <span>Thinking...</span>
          </div>
        )}
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={(text) => sendMessage(text, context)} isLoading={isLoading} />
    </div>
  )
}
