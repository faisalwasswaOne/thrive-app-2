export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
        isUser
          ? 'bg-brown-900 text-cream-50 rounded-br-sm'
          : 'bg-cream-100 text-gray-800 rounded-bl-sm'
      }`}>
        {message.content}
      </div>
    </div>
  )
}
