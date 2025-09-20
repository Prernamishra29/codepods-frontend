'use client'

import { useState } from 'react'
import Button from './Button'

export default function ChatPanel() {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([])
  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input) return
    setMessages([...messages, { user: 'You', text: input }])
    setInput('')
  }

  return (
    <div className="bg-gray-800 rounded-xl p-4 space-y-4">
      <h3 className="text-lg font-bold text-white">Discussion</h3>
      <div className="max-h-64 overflow-y-auto space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col">
            <span className="text-sm text-indigo-400">{msg.user}</span>
            <span className="text-gray-300">{msg.text}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}
