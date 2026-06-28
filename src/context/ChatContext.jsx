import { createContext, useContext, useState } from 'react'

const ChatContext = createContext(null)

export function ChatProvider({ children }) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  function enable() { setIsEnabled(true) }
  function toggleOpen() { setIsOpen(o => !o) }
  function close() { setIsOpen(false) }

  return (
    <ChatContext.Provider value={{ isEnabled, isOpen, enable, toggleOpen, close }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}
