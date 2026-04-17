import { useState, useEffect, useRef } from 'react'
import './NameConfirmPopup.css'

export default function NameConfirmPopup({ guest, onConfirm, onCancel }) {
  const [input, setInput]   = useState('')
  const [error, setError]   = useState(false)
  const inputRef            = useRef(null)

  // Focus input on open
  useEffect(() => { inputRef.current?.focus() }, [])

  // Escape to cancel
  useEffect(() => {
    function handleKey(e) { if (e.key === 'Escape') onCancel() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onCancel])

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onCancel()
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (input.trim().toLowerCase() === guest.password.toLowerCase()) {
      onConfirm(guest)
    } else {
      setError(true)
    }
  }

  return (
    <div className="nc-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true">
      <div className="nc-box">
        <button className="nc-close" onClick={onCancel} aria-label="Close">&#x2715;</button>

        <div className="nc-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;</div>
        <h2 className="nc-title">Confirm Your Identity</h2>
        <div className="nc-ornament" aria-hidden="true">&#x2500;&#x2500;&#x2500; &#x2736; &#x2500;&#x2500;&#x2500;</div>

        <p className="nc-prompt">
          This dossier belongs to<br />
          <span className="nc-character-name">{guest.characterName}</span>
        </p>
        <p className="nc-instruction">Enter your password to proceed.</p>

        <form className="nc-form" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className={`nc-input${error ? ' nc-input--error' : ''}`}
            type="password"
            value={input}
            placeholder="Password"
            onChange={e => { setInput(e.target.value); setError(false) }}
            autoComplete="off"
          />
          {error && (
            <p className="nc-error">Incorrect password.</p>
          )}
          <button className="nc-submit" type="submit">Proceed</button>
        </form>
      </div>
    </div>
  )
}
