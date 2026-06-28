import { useState, useCallback } from 'react'

export function useChatApi() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (userText, context = 'parent') => {
    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, context }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clearHistory = () => setMessages([])

  return { messages, isLoading, error, sendMessage, clearHistory }
}
