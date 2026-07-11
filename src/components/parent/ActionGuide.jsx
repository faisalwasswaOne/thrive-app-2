function DialogueSection({ items }) {
  return (
    <div className="space-y-2">
      {items.map((line, j) => {
        const isYou = line.speaker.toLowerCase() === 'you'
        return (
          <div key={j} className={`flex ${isYou ? 'justify-start' : 'justify-end'}`}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                isYou ? 'bg-brown-800 text-cream-50' : 'bg-cream-200 text-brown-900'
              }`}
            >
              <span className="block text-xs font-semibold opacity-70 mb-0.5">{line.speaker}</span>
              {line.line}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function ActionGuide({ guide }) {
  if (!guide) return null

  return (
    <div className="mt-3 bg-cream-50 border border-cream-200 rounded-lg p-4 space-y-4">
      {guide.intro && (
        <p className="text-sm text-gray-700 leading-relaxed">{guide.intro}</p>
      )}
      {guide.sections.map((section, i) => (
        <div key={i}>
          <h4 className="font-heading font-bold text-brown-900 text-sm mb-1">{section.heading}</h4>
          {section.note && (
            <p className="text-xs text-gold-600 italic mb-2">{section.note}</p>
          )}
          {section.type === 'dialogue' ? (
            <DialogueSection items={section.items} />
          ) : (
            <ul className="space-y-2">
              {section.items.map((item, j) => (
                <li key={j} className="text-sm">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-brown-900 underline hover:text-brown-700"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <span className="font-semibold text-brown-900">{item.title}</span>
                  )}
                  <span className="text-gray-700 leading-relaxed">{item.body ? `: ${item.body}` : ''}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
