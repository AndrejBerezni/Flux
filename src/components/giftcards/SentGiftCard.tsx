export default function SentGiftCard({
  email,
  sender,
  recipient,
  message,
}: {
  email: string
  sender: string
  recipient: string
  message: string
}) {
  const items = [
    { title: 'sent to', text: email },
    { title: 'for', text: recipient },
    { title: 'from', text: sender },
  ]

  return (
    <article className="max-w-[400px] rounded-md border-2 bg-white px-4 py-6 shadow-md">
      <ul>
        {items.map((item) => (
          <li key={`${item.title}-sent-gc-details`} className="mb-2">
            <span className="mr-2 italic text-secondary">{item.title}:</span>
            <span className="text-lg font-semibold">{item.text}</span>
          </li>
        ))}
        {message && (
          <li key="message-sent-gc-details">
            <span className="mr-2 italic text-secondary">message:</span>
            <span>{message}</span>
          </li>
        )}
      </ul>
    </article>
  )
}
