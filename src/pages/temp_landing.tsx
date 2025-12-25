import { useState } from 'react'

function TempLanding() {
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    
    await fetch('https://formspree.io/f/mbdrvbqp', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    
    setSubmitted(true)
    form.reset()
    setName('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center p-8"> 
      <div className="flex-1 flex items-center">
        <p className="animate-float">Hey! You're a little early. Come back later 👽</p>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="text-sm text-zinc-400 text-center mb-25"
      >
        <input type="hidden" name="_subject" value={name ? `Website Feedback from ${name}` : 'Website Feedback'} />
        <p className="mb-2">{submitted ? 'Thanks for the feedback!' : 'Have any suggestions?'}</p>
        <input 
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-64 p-1.5 mb-2 rounded bg-zinc-800 border border-zinc-700 text-sm" 
          type="text" 
          placeholder="Name (optional)" 
        />
        <textarea 
          name="message"
          className="w-64 p-1.5 mb-2 rounded bg-zinc-800 border border-zinc-700 text-sm resize-none block" 
          rows={3}
          placeholder="Message" 
        />
        <button className="px-3 py-1 text-xs bg-zinc-700 hover:bg-zinc-600 rounded-full" type="submit">
          Send
        </button>
      </form>
    </div>
  )
}

export default TempLanding